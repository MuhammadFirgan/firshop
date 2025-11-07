'use client'

import { Badge } from "@/components/ui/badge"
import { updateUserRole } from "@/lib/action/auth.action"
import { users } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"



type BadgeVariant = "destructive" | "warning" | "primary" | "default" | "secondary" | "outline" | "success" | null | undefined;

type RoleBadge = {
    name: string;
    variant: BadgeVariant;
};

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
        accessorKey: "actions",
        header: "actions",
        cell: ({ row }) => {

            const roles: RoleBadge[] = [
                {
                    name: "super_admin",
                    variant: "destructive"
                },
                {
                    name: "seller",
                    variant: "warning"
                },
                {
                    name: "user",
                    variant: "primary"
                },
            ]
            const [loading, setLoading] = useState(false)
            const router = useRouter()

            const handleChangeRole = async (newRole: string) => {
                if(loading) return 
                setLoading(true)

                const result = await updateUserRole(row.original.id, newRole)

                if(result) {

                    toast("role updated")
                    router.push("/dashboard/users")
                } else {
                    toast(result.error)
                }

                setLoading(false)
            }


            return (
                <div className="flex space-x-2">
                    {roles.map(role => (
                        <Badge 
                            key={`${row.id}_${role.name}`} 
                            variant={role.variant}
                            onClick={() => handleChangeRole(role.name)}
                            className="cursor-pointer"
                        >
                            {role.name.replace('_', ' ')}
                        </Badge>
                        
                    ))}
                    
                    
                </div>
            )


        }
      
    }
]