'use client'

import { DeleteAction } from "@/components/shared/DeleteAction"
import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/lib/action/category.action"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
        cell: ({ row }) => {
           
            return (
                // @ts-ignore
                <DeleteCategory categoryId={row.original.id as string} onDelete={deleteCategory} />
            )
        }
    }
]