import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Button } from '@/features/base/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/base/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/base/components/ui/tabs';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+20.1% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+12.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+3.1% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active A/B Tests</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  <span>-2 completed this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year compared to last year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex h-[300px] items-center justify-center rounded-md bg-muted/20">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sales chart will appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders from your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Order #{1000 + i}</p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1 ? 'Just now' : `${i} hour${i > 1 ? 's' : ''} ago`}
                        </p>
                      </div>
                      <div className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'Organic Heirloom Tomatoes',
                    'Fresh Free-Range Eggs',
                    'Artisanal Sourdough Bread',
                  ].map((product, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{product}</p>
                        <p className="text-xs text-muted-foreground">{120 - i * 20} units sold</p>
                      </div>
                      <div className="font-medium">${(10 - i).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B Test Performance</CardTitle>
                <CardDescription>Current test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Product Pricing Test</h4>
                      <span className="text-xs font-medium text-green-500">+28.1%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Variation A</span>
                        <span>3.2%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: '32%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Variation B</span>
                        <span className="text-green-600">4.1%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: '41%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Call-to-Action Button Test</h4>
                      <span className="text-xs font-medium text-green-500">+3.6%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Variation A</span>
                        <span>2.8%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: '28%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Variation B</span>
                        <span className="text-green-600">2.9%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: '29%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'New order placed',
                    'Product stock updated',
                    'New customer registered',
                    'Discount code created',
                    'A/B test started',
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="relative mt-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity}</p>
                        <p className="text-xs text-muted-foreground">
                          {i === 0 ? 'Just now' : `${i * 10} minute${i > 1 ? 's' : ''} ago`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Detailed analytics about your store performance, customer behavior, and sales trends.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Reports</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Generate and view reports about sales, inventory, customer activity, and more.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <Bell className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Notifications</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              View and manage all system notifications, alerts, and updates.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
