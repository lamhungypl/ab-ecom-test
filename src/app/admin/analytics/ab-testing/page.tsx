'use client';
import { Badge, BarChart3, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useId, useState } from 'react';

import { ActiveTestsList } from '@/features/ab-testing/components/active-tests-list';
import { TestHistoryList } from '@/features/ab-testing/components/test-history-list';
import TestOverview from '@/features/ab-testing/components/test-overview';
import TestCreationWithPreviewForm from '@/features/ab-testing/test-creation/components/test-creation-with-preview-form';
import { Button } from '@/features/base/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/base/components/ui/tabs';
import { getPath } from '@/features/common/utils/routers';

const tabs = ['overview', 'active-tests', 'create-test', 'history'] as const;

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

type AbTestingDashboardTab = (typeof tabs)[number];

const ABTestingDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [activeTab, setActiveTab] = useState('overview');
  const createTestFormId = useId();

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'active-tests', 'create-test', 'history'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Create, manage, and analyze A/B tests for your e-commerce site
          </p>
        </div>
        <Link href={`${getPath('abTesting')}?tab=create-test`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Test
          </Button>
        </Link>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(nexTab) => {
          setActiveTab(nexTab);
          router.push(pathname + '?' + createQueryString('tab', nexTab));
        }}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active-tests">Active Tests</TabsTrigger>
          <TabsTrigger value="create-test">Create Test</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <TestOverview />
        </TabsContent>

        <TabsContent value="active-tests">
          <ActiveTestsList tests={mockActiveTests} />
        </TabsContent>

        <TabsContent value="create-test">
          <TestCreationWithPreviewForm formId={createTestFormId} />
        </TabsContent>

        <TabsContent value="history">
          <TestHistoryList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ABTestingPage = () => {
  return (
    <Suspense>
      <ABTestingDashboard />
    </Suspense>
  );
};

export default ABTestingPage;
