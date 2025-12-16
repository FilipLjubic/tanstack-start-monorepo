import { Badge } from '@starter/ui/components/shadcn/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@starter/ui/components/shadcn/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@starter/ui/components/shadcn/sidebar';
import { Link } from '@tanstack/react-router';
import { ChevronRight, type LucideIcon } from 'lucide-react';

const isExternalUrl = (url: string) => url.startsWith('http');

export const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    badge?: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
              >
                {isExternalUrl(item.url) ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                ) : (
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )}
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
