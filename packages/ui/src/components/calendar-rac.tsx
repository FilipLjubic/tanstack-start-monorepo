import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  composeRenderProps,
  Heading as HeadingRac,
  I18nProvider,
  RangeCalendar as RangeCalendarRac,
} from 'react-aria-components';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../components/shadcn/tooltip';
import { cn } from '../lib/utils';

interface BaseCalendarProps {
  className?: string;
  /**
   * Function that takes a date and returns tooltip content.
   * If it returns null/undefined, no tooltip will be shown for that date.
   */
  getTooltipContent?: (date: CalendarDate) => ReactNode | null | undefined;
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps;
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> &
  BaseCalendarProps;

function CalendarHeader() {
  return (
    <header className="flex w-full items-center gap-1 pb-1">
      <HeadingRac className="pl-3 font-medium text-sm capitalize" />

      <div className="ml-auto flex gap-1">
        <Button
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          slot="previous"
        >
          <ChevronLeftIcon size={16} />
        </Button>
        <Button
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          slot="next"
        >
          <ChevronRightIcon size={16} />
        </Button>
      </div>
    </header>
  );
}

function CalendarGridComponent({
  isRange = false,
  getTooltipContent,
}: {
  isRange?: boolean;
  getTooltipContent?: (date: CalendarDate) => ReactNode | null | undefined;
}) {
  const now = today(getLocalTimeZone());

  return (
    <CalendarGridRac weekdayStyle="short">
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="size-9 rounded-md p-0 font-medium text-muted-foreground/80 text-xs uppercase">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-1 [&_td]:py-1">
        {(date) => {
          const tooltipContent = getTooltipContent?.(date);
          const shouldShowTooltip = tooltipContent != null;

          const cellElement = (
            <CalendarCellRac
              className={cn(
                'relative flex size-8 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full p-0 font-normal text-xs outline-none duration-150 [transition-property:color,background-color,border-radius,box-shadow]',
                // Hover state
                'data-hovered:bg-accent data-hovered:text-accent-foreground',
                // Selected state
                'data-selected:bg-primary data-selected:text-primary-foreground',
                // Focus states
                'data-focus-visible:z-10 data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50',
                // Disabled state
                'data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:opacity-30',
                // Unavailable state
                'data-unavailable:pointer-events-none data-unavailable:cursor-default data-unavailable:bg-muted data-unavailable:text-muted-foreground data-unavailable:line-through data-unavailable:opacity-30',
                // Range-specific styles
                isRange &&
                  'data-invalid:data-selection-end:bg-destructive data-invalid:data-selection-start:bg-destructive data-invalid:data-selection-end:text-white data-invalid:data-selection-start:text-white data-selected:rounded-none data-selection-start:rounded-s-md data-selection-end:rounded-e-md data-invalid:bg-red-100 data-selected:bg-accent data-selection-end:bg-primary data-selection-start:bg-primary data-selected:text-foreground data-selection-end:text-primary-foreground data-selection-start:text-primary-foreground',
                // Today indicator styles
                date.compare(now) === 0 &&
                  cn(
                    'after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary',
                    isRange
                      ? 'data-selection-end:after:bg-background data-selection-start:after:bg-background'
                      : 'data-selected:after:bg-background'
                  )
              )}
              date={date}
            />
          );

          if (!shouldShowTooltip) {
            return cellElement;
          }

          return (
            <Tooltip>
              <TooltipTrigger asChild>{cellElement}</TooltipTrigger>
              <TooltipContent>{tooltipContent}</TooltipContent>
            </Tooltip>
          );
        }}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  );
}

function Calendar({ className, getTooltipContent, ...props }: CalendarProps) {
  return (
    <I18nProvider locale="hr-HR">
      <CalendarRac
        {...props}
        className={composeRenderProps(className, (className) =>
          cn('w-fit p-4', className)
        )}
      >
        <CalendarHeader />
        <CalendarGridComponent getTooltipContent={getTooltipContent} />
      </CalendarRac>
    </I18nProvider>
  );
}

function RangeCalendar({
  className,
  getTooltipContent,
  ...props
}: RangeCalendarProps) {
  return (
    <I18nProvider locale="hr-HR">
      <RangeCalendarRac
        {...props}
        className={composeRenderProps(className, (className) =>
          cn('w-fit p-4', className)
        )}
      >
        <CalendarHeader />
        <CalendarGridComponent
          getTooltipContent={getTooltipContent}
          isRange
        />
      </RangeCalendarRac>
    </I18nProvider>
  );
}

export { Calendar, RangeCalendar };
