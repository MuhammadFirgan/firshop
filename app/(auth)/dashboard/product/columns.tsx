'use client'

import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/utils"
import { createProductProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"

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
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            return <span>{formatRupiah(price)}</span>
        }
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        header: 'Actions',
        cell: ({ row }) => {
            
            return (    
                <div className="flex items-center">
                    <Link href={`product/${row.original?.id}/edit`}>
                        <Button variant="ghost">
                            <Edit className="size-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost">
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        },
    },
]