'use client';

import { BarChart3, ChevronDown, LayoutDashboard, LogOut, Package, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/features/base/components/ui/avatar';
import { Button } from '@/features/base/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/features/base/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/features/base/components/ui/sidebar';
import { cn } from '@/features/base/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();
  const [marketingOpen, setMarketingOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const { state } = useSidebar();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="rounded-md bg-primary p-1">
            <Link href="/">
              <Store className="h-6 w-6 text-primary-foreground" />
            </Link>
          </div>
          <div className={cn('flex flex-col', { hidden: isCollapsed })}>
            <span className="font-bold">Farmers Market</span>
            <span className="text-xs text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin')} tooltip="Dashboard">
              <Link href="/admin">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible
            open={analyticsOpen}
            onOpenChange={setAnalyticsOpen}
            className="group/collapsible w-full"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/analytics/ab-testing')}
                    tooltip="A/B Testing"
                  >
                    <Link href="/admin/analytics/ab-testing" className="pl-9">
                      <span>A/B Testing</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/analytics/traffic')}
                    tooltip="Traffic"
                  >
                    <Link href="/admin/analytics/traffic" className="pl-9">
                      <span>Traffic</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/products')} tooltip="Products">
              <Link href="/admin/products">
                <Package className="h-5 w-5" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div
          className={cn('flex items-center justify-between', {
            'flex-col': isCollapsed,
          })}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className={cn('flex flex-col', { hidden: isCollapsed })}>
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@example.com</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
