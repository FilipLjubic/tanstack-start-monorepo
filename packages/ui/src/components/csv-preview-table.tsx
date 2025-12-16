import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '../lib/utils';
import { DataTableColumnHeader } from './example-data-table/data-table-column-header';
import { Button } from './shadcn/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shadcn/table';

type CsvPreviewRow = {
  kod: string;
  nameHr: string;
};

type CsvPreviewTableProps = {
  rows: CsvPreviewRow[];
  className?: string;
  emptyState?: ReactNode;
};

const DEFAULT_PAGE_SIZE = 25;

const columns: ColumnDef<CsvPreviewRow>[] = [
  {
    accessorKey: 'kod',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Kod"
      />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-foreground/80 text-sm">
        {row.original.kod}
      </span>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'nameHr',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Naziv"
        className="justify-start"
      />
    ),
    cell: ({ row }) => (
      <span className="text-foreground/90 text-sm">{row.original.nameHr}</span>
    ),
    enableSorting: true,
    enableHiding: false,
  },
];

const CsvPreviewTable: React.FC<CsvPreviewTableProps> = ({
  rows,
  className,
  emptyState = 'No rows to display.',
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'kod',
      desc: false,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setSorting((prev) => (prev.length ? prev : [{ id: 'kod', desc: false }]));
  }, [rows]);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  const paginatedRows = table.getRowModel().rows;

  const summary = useMemo(() => {
    if (!rows.length) {
      return 'No rows available.';
    }

    const { pageIndex, pageSize } = pagination;
    const start = pageIndex * pageSize + 1;
    const end = start + paginatedRows.length - 1;
    return `Showing ${start}–${end} of ${rows.length}`;
  }, [rows.length, pagination, paginatedRows.length]);

  const pageCount = Math.max(table.getPageCount(), 1);
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <span>{summary}</span>
        <span>
          Page {Math.min(currentPage, pageCount)} of {pageCount}
        </span>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedRows.length ? (
              paginatedRows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  {emptyState}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={currentPage >= pageCount || !rows.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export type { CsvPreviewRow };
export { CsvPreviewTable };
