'use client'

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
        accessorKey: "bcm_employee",
        header: "BCM Employee",
        // cell: ({ row }) => (row.original.bcm_employee ? "Yes" : "No"),
    }
]