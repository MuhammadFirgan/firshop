// _components/data-table.tsx
'use client'

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export interface DataTableProps<TData, Tvalue> {
  columns: ColumnDef<TData, Tvalue>[]
  data: TData[]
  count: number;
  page: number;
  pageSize: number;
  query: string;
}

export default function DataTableProducts<TData, TValue>({
  columns,
  data,
  count,
  page,
  pageSize,
  query,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 500);



  useEffect(() => {

    if (debouncedQuery !== query) {
      router.replace(`/dashboard/product?page=1&query=${debouncedQuery}`);
    }
  }, [debouncedQuery, query, router]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(count / pageSize),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: pageSize
      }
    }
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  const handleNextPage = () => {
    // Gunakan router.push untuk navigasi pagination
    router.push(`/dashboard/products?page=${page + 1}&query=${query}`);
  };

  const handlePreviousPage = () => {
    router.push(`/dashboard/products?page=${page - 1}&query=${query}`);
  };
  
  return (
    <div>
      <div className="max-w-xs mb-4">
        <Input 
          placeholder="Search product..."
          value={localQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-hidden rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-blue-50 border-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={page * pageSize >= count}
        >
          Next
        </Button>
      </div>
    </div>
  );
}