import { BarChart3, ChevronDown, Home, Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/base/components/ui/dropdown-menu';
import { getPath } from '@/features/common/utils/routers';

type Props = {};

const QuickAccess = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <span>Quick Access</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Quick Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getPath('home')} className="flex cursor-pointer items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Store Homepage</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={getPath('abTesting')} className="flex cursor-pointer items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Create A/B Test</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickAccess;
