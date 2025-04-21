'use client';

import {
  ArrowDownRight,
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/base/components/ui/card';
import { Progress } from '@/features/base/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/base/components/ui/tabs';

interface TestResultsProps {
  test: any;
}

export function TestResults({ test }: TestResultsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate test metrics
  const conversionDiff = test.conversionB - test.conversionA;
  const improvementPercent = ((conversionDiff / test.conversionA) * 100).toFixed(1);
  const isPositive = conversionDiff > 0;

  // Mock data for charts
  const dailyData = [
    { date: 'Apr 10', variantA: 2.8, variantB: 3.2 },
    { date: 'Apr 11', variantA: 3.1, variantB: 3.5 },
    { date: 'Apr 12', variantA: 2.9, variantB: 3.8 },
    { date: 'Apr 13', variantA: 3.3, variantB: 4.0 },
    { date: 'Apr 14', variantA: 3.0, variantB: 4.2 },
    { date: 'Apr 15', variantA: 3.4, variantB: 4.3 },
    { date: 'Apr 16', variantA: 3.2, variantB: 4.5 },
  ];

  // Calculate statistical significance
  const sampleSizeNeeded = 1000;
  const currentSampleSize = test.visitors;
  const confidenceLevel = Math.min((currentSampleSize / sampleSizeNeeded) * 100, 99.9);
  const hasSignificance = confidenceLevel >= 95;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant={test.status === 'running' ? 'default' : 'secondary'} className="mb-2">
            {test.status === 'running' ? 'Running' : 'Paused'}
          </Badge>
          <h2 className="text-2xl font-bold">{test.name}</h2>
          <p className="text-sm text-muted-foreground">Started on {test.startDate}</p>
        </div>
        <Button variant="outline" size="sm">
          {test.status === 'running' ? 'Pause Test' : 'Resume Test'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="variations">Variations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {isPositive ? (
                        <span className="text-green-600">+{improvementPercent}%</span>
                      ) : (
                        <span className="text-red-600">{improvementPercent}%</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isPositive ? 'Improvement' : 'Decrease'} with Variation B
                    </p>
                  </div>
                  <div className={`rounded-full p-2 ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isPositive ? (
                      <TrendingUp
                        className={`h-5 w-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                      />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Statistical Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {hasSignificance ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                      <span className="font-medium">
                        {hasSignificance ? 'Statistically Significant' : 'Collecting Data'}
                      </span>
                    </div>
                    <span className="font-bold">{confidenceLevel.toFixed(1)}%</span>
                  </div>
                  <Progress value={confidenceLevel} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {hasSignificance
                      ? 'Results are statistically significant'
                      : `Need more data (${currentSampleSize}/${sampleSizeNeeded} visitors)`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">{test.visitors.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Variation A</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">{test.conversionA.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Conversion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Variation B</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">{test.conversionB.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Conversion rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Performance</CardTitle>
              <CardDescription>Conversion rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Performance chart will appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Data</CardTitle>
              <CardDescription>Detailed metrics for each variation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Variation A (Control)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visitors</span>
                        <span className="font-medium">
                          {Math.floor(test.visitors / 2).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversions</span>
                        <span className="font-medium">
                          {Math.floor(
                            (test.visitors / 2) * (test.conversionA / 100)
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversion Rate</span>
                        <span className="font-medium">{test.conversionA.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Order Value</span>
                        <span className="font-medium">${(32.45).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Variation B (Test)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visitors</span>
                        <span className="font-medium">
                          {Math.floor(test.visitors / 2).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversions</span>
                        <span className="font-medium">
                          {Math.floor(
                            (test.visitors / 2) * (test.conversionB / 100)
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversion Rate</span>
                        <span className="font-medium">{test.conversionB.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Order Value</span>
                        <span className="font-medium">${(29.75).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-3 font-semibold">Segment Analysis</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-md bg-muted/30 p-3">
                        <h4 className="mb-1 text-sm font-medium">Device Type</h4>
                        <p className="mb-2 text-sm text-muted-foreground">Best performance on:</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Mobile
                          </Badge>
                          <span className="text-sm font-medium text-green-600">
                            +{(Number(improvementPercent) * 1.2).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted/30 p-3">
                        <h4 className="mb-1 text-sm font-medium">User Type</h4>
                        <p className="mb-2 text-sm text-muted-foreground">Best performance on:</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            New Users
                          </Badge>
                          <span className="text-sm font-medium text-green-600">
                            +{(Number(improvementPercent) * 1.1).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted/30 p-3">
                        <h4 className="mb-1 text-sm font-medium">Time of Day</h4>
                        <p className="mb-2 text-sm text-muted-foreground">Best performance at:</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Evening
                          </Badge>
                          <span className="text-sm font-medium text-green-600">
                            +{(Number(improvementPercent) * 1.3).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Variations</CardTitle>
              <CardDescription>Details of what's being tested</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Test Type</h3>
                  <Badge variant="outline" className="capitalize">
                    {test.type}
                  </Badge>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {test.type === 'pricing'
                      ? 'Testing different pricing strategies to optimize conversion and revenue.'
                      : 'Testing different content variations to improve engagement and conversion.'}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Elements Being Tested</h3>
                  <div className="flex flex-wrap gap-2">
                    {test.elements.map((element: string) => (
                      <Badge key={element} variant="outline">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Variation A (Control)</h3>
                    <div className="min-h-[100px] rounded-md bg-muted/30 p-4">
                      <p>{test.variations.A}</p>
                      {test.type === 'pricing' && (
                        <div className="mt-3 flex items-center">
                          <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Original pricing</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Variation B (Test)</h3>
                    <div className="min-h-[100px] rounded-md bg-muted/30 p-4">
                      <p>{test.variations.B}</p>
                      {test.type === 'pricing' && (
                        <div className="mt-3 flex items-center">
                          <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">10% discount applied</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Implementation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Traffic Split</span>
                      <span>50/50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">User Assignment</span>
                      <span>Cookie-based</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Test Duration</span>
                      <span>14 days (7 days remaining)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
