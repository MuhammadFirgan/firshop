export interface createProductProps {
    name: string
    description: string
    price: string
    image_url: string
    stock: number
}

export interface createStoreProps {
    name: string
    description: string
    poster?: File
}