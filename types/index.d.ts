import { ColumnDef } from "@tanstack/react-table"

export interface createProductProps {
    id?: string
    products: {
        productName: string
        category: string
        description?: string
        price: number
        thumbnail: string
        stock: number
    }
}

export interface createStoreProps {
    name: string
    description: string
    poster?: File
}

export type users = {
    id: string
    fullName: string | null
    email: string | null
    role: string
}

export interface DataTableProps<TData, Tvalue> {
    columns: ColumnDef<TData, Tvalue>[]
    data: TData[]
}