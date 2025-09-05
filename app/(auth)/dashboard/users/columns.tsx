'use client'

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

export type users = {
    id: string
    name: string
    email: string
    role: string
    bcm_employee: boolean
}

export const columns: ColumnDef<users>[] = [
    {
        accessorKey: "fullName",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "role",
        header: "actions",
        cell: ({ row }) => {
            const userRole = ['super_admin', 'employee', 'user'];

            return (
                <div className="flex space-x-2">
                    
                    <Badge variant="destructive">
                        Super Admin
                    </Badge>
                    <Badge variant="warning">
                        Employee
                    </Badge>
                    <Badge variant="primary">
                        User
                    </Badge>
                    
                    
                </div>
            )


        }
        // cell: ({ row }) => (row.original.bcm_employee ? "Yes" : "No"),
    }
]