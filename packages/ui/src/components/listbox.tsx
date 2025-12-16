import { ListBoxItem, ListBox as ListBoxRAC } from 'react-aria-components';

import { Label } from '../components/shadcn/label';

export type ListBoxOption = {
  id: string;
  label: string;
  isDisabled?: boolean;
};

export type ListBoxProps = {
  label: string;
  options: ListBoxOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
};

export const ListBox = ({
  label,
  options,
  value,
  onChange,
  ariaLabel,
}: ListBoxProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="overflow-hidden rounded-md border border-input">
        <ListBoxRAC
          className="space-y-1 bg-background p-1 text-sm shadow-xs transition-[color,box-shadow]"
          aria-label={ariaLabel || label}
          selectionMode="single"
          selectedKeys={value ? [value] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            if (selected && typeof selected === 'string') {
              onChange(selected);
            }
          }}
        >
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id}
              className="relative rounded px-2 py-1.5 outline-none data-disabled:cursor-not-allowed data-focus-visible:border-ring data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:opacity-50 data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50"
              isDisabled={option.isDisabled}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBoxRAC>
      </div>
    </div>
  );
};
