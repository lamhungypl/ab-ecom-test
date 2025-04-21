import { BarChart3 } from 'lucide-react';
import React from 'react';

import { Badge } from '@/features/base/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/base/components/ui/card';

const mockActiveTests = [
  {
    id: 'test-1',
    name: 'Product Pricing Test',
    status: 'running',
    type: 'pricing',
    startDate: '2025-04-10',
    visitors: 1245,
    conversionA: 3.2,
    conversionB: 4.1,
    elements: ['product-price', 'add-to-cart-button'],
    variations: {
      A: 'Original pricing',
      B: '10% discount on all products',
    },
  },
  {
    id: 'test-2',
    name: 'Call-to-Action Button Test',
    status: 'running',
    type: 'content',
    startDate: '2025-04-12',
    visitors: 876,
    conversionA: 2.8,
    conversionB: 2.9,
    elements: ['cta-button'],
    variations: {
      A: 'Shop Now',
      B: 'Browse Fresh Products',
    },
  },
];
type Props = {};

const TestOverview = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Tests</CardTitle>
            <CardDescription>Currently running A/B tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockActiveTests.length}</div>
            <p className="text-sm text-muted-foreground">2 pricing tests, 1 content test</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>Visitors included in tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,121</div>
            <p className="text-sm text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Conversion Lift</CardTitle>
            <CardDescription>Average improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+18.2%</div>
            <p className="text-sm text-muted-foreground">Across all active tests</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Performance</CardTitle>
              <CardDescription>Conversion rates for active tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Performance chart will appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Performing Test</CardTitle>
              <CardDescription>Highest conversion improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Product Pricing Test</h3>
                  <p className="text-sm text-muted-foreground">10% discount on all products</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Variation A</span>
                    <span>3.2%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '32%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Variation B</span>
                    <span className="text-green-600">4.1%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '41%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    +28.1% improvement
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TestOverview;
