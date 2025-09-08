'use client'

import { Button } from "@/components/ui/button"
import { createProductProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"

export const columns: ColumnDef<createProductProps>[] = [
    {
        accessorKey: 'name',
        header: 'Product',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        header: 'Actions',
        cell: () => {
            return (    
                <div className="flex items-center">
                    <Button variant="ghost">
                        <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost">
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        },
    },
]