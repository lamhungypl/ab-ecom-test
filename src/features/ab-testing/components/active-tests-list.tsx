'use client';

import { BarChart3, Edit, MoreHorizontal, Pause, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useTestCampaignListAllQuery } from '@/features/ab-testing/active-tests/api/active-tests.query';
import { TestResults } from '@/features/ab-testing/components/test-results';
import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/base/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/features/base/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/features/base/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/base/components/ui/table';
import { toast } from '@/features/base/hooks/use-toast';
import { getPath } from '@/features/common/utils/routers';

interface ActiveTestsListProps {
  tests: any[];
}

export function ActiveTestsList({ tests }: ActiveTestsListProps) {
  const { data: activeTests = [] } = useTestCampaignListAllQuery();
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

  const handlePauseTest = (testId: string) => {
    toast({
      description: `Test paused successfully`,
    });
  };

  const handleDeleteTest = (testId: string) => {
    toast({
      description: 'Test deleted successfully',
    });
  };

  if (activeTests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-medium">No Active Tests</h3>
        <p className="mb-6 max-w-md text-muted-foreground">
          You don't have any active A/B tests. Create a new test to start optimizing your e-commerce
          store.
        </p>

        <Link href={`${getPath('abTesting')}?tab=create-test`}>
          <Button>Create Your First Test</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {selectedTest && (
        <Sheet open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
          <SheetContent className="max-w-[500px] overflow-y-auto sm:max-w-[640px]">
            <SheetHeader>
              <SheetTitle>Test Details: {selectedTest.name}</SheetTitle>
              <SheetDescription>Started on {selectedTest.startDate}</SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <TestResults test={selectedTest} />
            </div>
          </SheetContent>
        </Sheet>
      )}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Tests</CardTitle>
              <CardDescription>Currently running</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeTests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Visitors</CardTitle>
              <CardDescription>In active tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{100}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Avg. Improvement</CardTitle>
              <CardDescription>Across all tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">20%</div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Visitors</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTests.map((test) => (
              <TableRow
                key={test.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedTest(test)}
              >
                <TableCell className="font-medium">{test.test_name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {test.test_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                  >
                    Running
                  </Badge>
                </TableCell>
                <TableCell>01/01/2025 12:01:00</TableCell>
                <TableCell>100</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePauseTest(test.id);
                      }}
                    >
                      {/* {test.status === 'running' ? ( */}
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTest(test);
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Test
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTest(test.id);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Test
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
