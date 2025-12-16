import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@starter/ui/components/shadcn/sidebar';
import { Link } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';

const isExternalUrl = (url: string) =>
  url.startsWith('http') || url.startsWith('mailto:');

export const NavSecondary = ({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size="sm"
              >
                {isExternalUrl(item.url) ? (
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
