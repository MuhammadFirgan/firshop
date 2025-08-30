export interface createProductProps {
    products: {
        productName: string
        category: string
        description: string
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