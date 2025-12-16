import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@starter/ui/components/shadcn/sidebar';
import { Link } from '@tanstack/react-router';
import { Home, LifeBuoy } from 'lucide-react';
import type * as React from 'react';
import { LogoIcon } from '@/components/icons/logo';
import { useUser } from '@/contexts/user-context';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export const AppSidebar = (props: AppSidebarProps) => {
  const { user } = useUser();

  const navMain = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
  ];

  const navSecondary = [
    {
      title: 'Support',
      url: 'mailto:support@example.com',
      icon: LifeBuoy,
    },
  ];

  return (
    <Sidebar
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="xl"
              asChild
            >
              <Link to="/dashboard">
                <LogoIcon />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Starter</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary
          items={navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
