'use client'

import { DeleteAction } from "@/components/shared/DeleteAction"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/lib/action/product.action"
import { formatUSD } from "@/lib/utils"
import { createProductProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"

export type ProductData = {
    id: string;
    name: string;
    category: {
        name: string
    };
    price: number;
    stock: number;
    thumbnail_url: string;
}

export const columns: ColumnDef<ProductData>[] = [
    {
        accessorKey: 'name',
        header: 'Product',
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => {

            return <span>{row.original.category.name}</span>
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            return <span>{formatUSD(price)}</span>
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
                    {/* @ts-ignore */}
                    <DeleteAction  id={row.original.id as string} onDelete={deleteProduct}/>
                </div>
            )
        },
    },
]