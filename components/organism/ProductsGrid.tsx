'use client'
import { products } from "@/constans"
import { useState } from "react"
import Card from "../Card"


export default function ProductsGrid({ limit }: { limit: number }) {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
    })
  return (
    <div className="w-full">
        {/* Container utama */}
        <div className="flex flex-col">
            {/* Grid produk */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible">
                {filteredProducts.slice(0, limit).map(product => (
                    <div
                        key={product.id}
                        className="flex-shrink-0 w-[300px] lg:w-[270px]"
                    >
                        <Card
                            product={product}
                            onAddToCart={() => console.log("Add to cart clicked")}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
