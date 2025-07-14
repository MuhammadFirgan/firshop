'use client'

import Card from "@/components/Card"
import { products } from "@/constans"
import { useState } from "react"





export default function page() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })
   return (
        <section className="flex justify-center gap-6 lg:justify-start flex-wrap md:pl-5 md:py-24">
            {filteredProducts.map(product => (
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
        </section>
    )
}
