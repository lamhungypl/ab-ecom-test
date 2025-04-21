import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
// app/api/ab-tests/generate-variants/route.ts
import { z } from 'zod';

import { testCreationSchema } from '@/features/ab-testing/test-creation/utils';

const generateCampaignRequestSchema = z.object({
  target: z.string(),
  pathname: z.string(),
});

const generateCampaignResult = z.array(testCreationSchema);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parseResult = generateCampaignRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { target, pathname } = parseResult.data;

  const prompt = `
You're a UX assistant helping generate structured A/B test variants.

Target element: "${target}"
Pathname: "${pathname}"

Generate 3 options. Format strictly as JSON with this structure:

{
    "id": "uuid-v4",
    "test_name": "Test Name",
    "description": "string description",
    "test_type": "content",
    "selected_element": "$target",
    "pathname": "$pathname",
    "variant_a": "Content of the Control Variant",
    "variant_b": "Content of the Test Variant",
    "pricing_strategy": "Value of the pricing strategy",
    "discount_percentage": number,
    "fixed_price": number
}

Use UUIDs for the "id" field.
"test_type" field accept value of  'content' or 'pricing', only can be 'pricing' if the $target includes 'price'.
when test_type === 'content':
    - Don't need to generate 'pricing_strategy', 'discount_percentage', 'fixed_price' 
when test_type === 'pricing':
    - Don't need to generate 'variant_b'
    - 'pricing_strategy' field accept value of  'percentage' or 'fixed' or 'free_shipping'
    - When pricing_strategy === 'percentage' don't need generate 'fixed_price'
    - When pricing_strategy === 'fixed' don't need generate 'discount_percentage'

Only return JSON — no explanation.
`;

  // Call OpenAI to generate variants
  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.7,
    messages: [
      { role: 'system', content: 'You are a helpful UX assistant.' },
      { role: 'user', content: prompt },
    ],
  });

  const rawMessage = chat.choices[0]?.message?.content?.trim();

  if (!rawMessage) {
    return NextResponse.json({ error: 'No response from LLM' }, { status: 500 });
  }

  try {
    const parsedJSON = JSON.parse(rawMessage);
    const variantValidation = generateCampaignResult.safeParse(parsedJSON);

    if (!variantValidation.success) {
      return NextResponse.json(
        {
          error: 'Invalid variant structure from LLM',
          issues: variantValidation.error,
        },
        { status: 422 }
      );
    }

    const uuidVariants = variantValidation.data.map((option) => ({
      ...option,
      id: uuidv4(), // Use normal UUIDs here
    }));

    return NextResponse.json(uuidVariants);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to parse LLM response', details: err },
      { status: 500 }
    );
  }
}
