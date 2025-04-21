'use client';

import { ArrowDownRight, ArrowUpRight, BarChart3, Copy } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/base/components/ui/table';
import { toast } from '@/features/base/hooks/use-toast';

export function TestHistoryList() {
  // Mock data for completed tests
  const [completedTests] = useState([
    {
      id: 'test-101',
      name: 'Homepage Hero Test',
      type: 'content',
      status: 'completed',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      visitors: 2450,
      conversionA: 2.8,
      conversionB: 3.5,
      winner: 'B',
      improvement: 25.0,
    },
    {
      id: 'test-102',
      name: 'Product Description Length',
      type: 'content',
      status: 'completed',
      startDate: '2025-03-05',
      endDate: '2025-03-19',
      visitors: 1875,
      conversionA: 4.2,
      conversionB: 3.9,
      winner: 'A',
      improvement: -7.1,
    },
    {
      id: 'test-103',
      name: 'Free Shipping Threshold',
      type: 'pricing',
      status: 'completed',
      startDate: '2025-03-10',
      endDate: '2025-03-24',
      visitors: 3120,
      conversionA: 3.1,
      conversionB: 4.3,
      winner: 'B',
      improvement: 38.7,
    },
  ]);

  const handleDuplicateTest = (testId: string) => {
    toast({
      description: `Test duplicated and ready to edit`,
    });
  };

  if (completedTests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-medium">No Test History</h3>
        <p className="mb-6 max-w-md text-muted-foreground">
          You haven't completed any A/B tests yet. Completed tests will appear here for reference.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Visitors</TableHead>
            <TableHead>Winner</TableHead>
            <TableHead>Improvement</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {test.type}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {test.startDate} - {test.endDate}
                </span>
              </TableCell>
              <TableCell>{test.visitors.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {test.winner === 'B' ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Variation B
                    </Badge>
                  ) : (
                    <Badge variant="outline">Variation A</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {test.improvement > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">+{test.improvement.toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{test.improvement.toFixed(1)}%</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleDuplicateTest(test.id)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
