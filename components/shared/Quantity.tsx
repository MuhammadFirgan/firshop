'use client'
import { useState } from 'react';
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react';

export default function Quantity(stock?: any) {
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (delta: number) => {
         const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= stock) {
            setQuantity(newQuantity);
        }
    };
  return (
    <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700">Quantity:</span>
        <div className="flex items-center gap-2">
            <Button
                size="icon"
                variant="outline"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-full hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 hover:text-white hover:border-transparent transition-all"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <Button
                size="icon"
                variant="outline"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                className="h-10 w-10 rounded-full hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 hover:text-white hover:border-transparent transition-all"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    </div>
  )
}
