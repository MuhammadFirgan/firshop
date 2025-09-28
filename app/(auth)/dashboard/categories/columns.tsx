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
        header: 'Total Product',
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: () => {
            return (
                <Button variant="ghost">
                    <Trash className="size-4"/>
                </Button>
            )
        }
    }
]