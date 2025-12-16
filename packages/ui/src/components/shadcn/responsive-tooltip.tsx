import {
  Popover as PopoverPrimitive,
  Tooltip as TooltipPrimitive,
} from 'radix-ui';
import React from 'react';

import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

interface ResponsiveTooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

interface ResponsiveTooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

interface ResponsiveTooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
}

const ResponsiveTooltipContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
});

const ResponsiveTooltip = ({
  children,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 200,
}: ResponsiveTooltipProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ResponsiveTooltipContext.Provider value={{ isMobile: true }}>
        <PopoverPrimitive.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </PopoverPrimitive.Root>
      </ResponsiveTooltipContext.Provider>
    );
  }

  return (
    <ResponsiveTooltipContext.Provider value={{ isMobile: false }}>
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </ResponsiveTooltipContext.Provider>
  );
};

const ResponsiveTooltipTrigger = ({
  children,
  asChild = true,
  className,
}: ResponsiveTooltipTriggerProps) => {
  const { isMobile } = React.useContext(ResponsiveTooltipContext);

  if (isMobile) {
    return (
      <PopoverPrimitive.Trigger
        asChild={asChild}
        className={className}
        data-slot="responsive-tooltip-trigger"
      >
        {children}
      </PopoverPrimitive.Trigger>
    );
  }

  return (
    <TooltipPrimitive.Trigger
      asChild={asChild}
      className={className}
      data-slot="responsive-tooltip-trigger"
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
};

const tooltipContentStyles =
  'z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md';

const tooltipAnimationStyles = '';

const ResponsiveTooltipContent = ({
  children,
  className,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  alignOffset,
}: ResponsiveTooltipContentProps) => {
  const { isMobile } = React.useContext(ResponsiveTooltipContext);

  if (isMobile) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn(
            tooltipContentStyles,
            tooltipAnimationStyles,
            className
          )}
          data-slot="responsive-tooltip-content"
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(tooltipContentStyles, tooltipAnimationStyles, className)}
        data-slot="responsive-tooltip-content"
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export {
  ResponsiveTooltip,
  ResponsiveTooltipTrigger,
  ResponsiveTooltipContent,
};
