'use client'

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

interface columnCategoryProps {
    name: string
    totalProduct: string
}

export const column: ColumnDef<columnCategoryProps>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'totalProduct',
        header: () => (
            <div className="text-center">
                Total Product
            </div>
        ),
        cell: ({ row }) => {
            const total = row.original.totalProduct || '0';
            return (
                <div className="text-center ">
                    {total}
                </div>
            )
        }
    },
    {
        accessorKey: 'action',
        header: () => (
            <div className="text-center">
                Action
            </div>
        ),
        cell: () => {
            return (
                <div className="text-center">
                    <Button variant="ghost">
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        }
    }
]