import { ListBox, type ListBoxOption } from './listbox';
import {
  SelectWithSearch,
  type SelectWithSearchOption,
} from './select-with-search';

export type AdaptiveSelectOption = {
  id: string;
  label: string;
};

export type AdaptiveSelectProps = {
  label: string;
  options: AdaptiveSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  threshold?: number;
};

export const AdaptiveSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  threshold = 6,
}: AdaptiveSelectProps) => {
  const useListBox = options.length < threshold;

  if (useListBox) {
    const listBoxOptions: ListBoxOption[] = options.map((opt) => ({
      id: opt.id,
      label: opt.label,
    }));

    return (
      <ListBox
        label={label}
        options={listBoxOptions}
        value={value}
        onChange={onChange}
      />
    );
  }

  const selectOptions: SelectWithSearchOption[] = options.map((opt) => ({
    id: opt.id,
    label: opt.label,
  }));

  return (
    <SelectWithSearch
      label={label}
      options={selectOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
    />
  );
};
