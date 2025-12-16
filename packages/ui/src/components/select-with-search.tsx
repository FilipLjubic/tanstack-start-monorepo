import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './shadcn/command';
import { Label } from './shadcn/label';
import { Popover, PopoverContent, PopoverTrigger } from './shadcn/popover';

export type SelectWithSearchOption = {
  id: string;
  label: string;
};

export type SelectWithSearchProps = {
  label: string;
  options: SelectWithSearchOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
};

export const SelectWithSearch = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
}: SelectWithSearchProps) => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-coffee/30 bg-white px-3 font-normal outline-none outline-offset-0 hover:bg-white focus-visible:border-coffee/50 focus-visible:outline-[3px]"
          >
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value
                ? options.find((option) => option.id === value)?.label
                : placeholder}
            </span>
            <ChevronDownIcon
              size={16}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    {value === option.id && (
                      <CheckIcon
                        size={16}
                        className="ml-auto"
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
