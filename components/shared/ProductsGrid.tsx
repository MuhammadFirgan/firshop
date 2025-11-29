'use client'
import { useEffect, useState } from "react"
import Card from "../Card"
import { getAllProducts } from "@/lib/action/product.action"
import { Loader } from "lucide-react"

export interface Product {
    id: string | number
    name: string
    price: number
    stock: number
    slug: string
    thumbnail_url: string
    category_id: string
    categories: {
        name: string
    }
}

export default function ProductsGrid({ limit }: { limit: number }) {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [resultExplore, setResultExplore] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const dataExplore = async () => {
            try {
                setIsLoading(true)
                // PERBAIKAN: Ubah page dari 0 ke 1
                const result = await getAllProducts(1, limit, searchTerm)
                
                if (result && result.products) {
                    // @ts-ignore
                    setResultExplore(result.products)
                   
                } else if (result && result.error) {
                    console.error('Database error:', result.error)
                    setResultExplore([])
                } else {
                    setResultExplore([])
                }
            } catch (error) {
                console.error('Error fetching products:', error)
                setResultExplore([])
            } finally {
                setIsLoading(false)
            }
        }
        
        dataExplore()
    }, [limit, searchTerm]) // Tambahkan searchTerm jika ingin reactive

    const filteredProducts = resultExplore.filter(product => {
        const matchesCategory = selectedCategory === 'All' || 
            product.categories.name === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    
    
    if (isLoading) {
        return <div className="text-center flex justify-center items-center py-8">
            <Loader className="animate-spin"/>
        </div>
    }

    if (resultExplore.length === 0) {
        return <div className="text-center py-8">No products found</div>
    }

    

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible">
                {filteredProducts.map(product => {
                        
                        const cardProduct = {
                            ...product,
                            rating: 0, 
                            reviews: 0, 
                            featured: false, 
                            originalPrice: undefined 
                        }
                        
                        return (
                            <div
                                key={product.id}
                                className="shrink-0 w-[300px] lg:w-[270px]"
                            >
                                <Card
                                    product={cardProduct}
                                    onAddToCart={() => console.log("Add to cart clicked", product.id)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}