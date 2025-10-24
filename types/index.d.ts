import { ColumnDef } from "@tanstack/react-table"
import page from './../app/search/[keyword]/page';

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

export type users = {
    id: string
    fullName: string | null
    email: string | null
    role: string
}

export interface DataTableProps<TData, Tvalue> {
    columns: ColumnDef<TData, Tvalue>[]
    data: TData[]
    count: number
    page: number
    pageSize: number
    query: string
    basePath: string
}

export interface MarketingProps {
    discount: number
    tagline: string
    start_date: string
    end_date: string
    thumbnail: string
}

export interface headerSectionProps {
    heading: string
    subHeading: string
    needButton: boolean
    labelButton?: string
    linkButton?: string
}

export interface PromotionBannerProps {
    discount?: number
    tagline?: string
    startDate?: Date
    endDate?: Date
    image?: string
}

export interface FormCategoryProps {
    name: string
    slug: string
}

export interface storeProps {
    name: string
    description: string
    address: string
    profile?: string
    banner?: string
}