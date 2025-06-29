'use client'

import { Button } from "@/components/ui/button"
import { BiCart } from 'react-icons/bi';


interface CheckoutProps {
    id: string
    category: string
    title: string
    description: string
    price: string
}


export default function Checkout({ id, category, title, description, price } : CheckoutProps) {

  
  return (
    <>
        <div className='w-full sm:max-w-xl'>
            <h5 className='text-blue-600'>{category}</h5>
            <h1 className="text-4xl ">{title}</h1>
            <p className="my-5">{description}</p>
            <span className='text-3xl'>${price}</span>
            <div className="flex flex-col my-4">
                <label htmlFor="quantity">Quantity : </label>
                <input type="number" id="quantity" min="1" max="100" className='max-w-20 px-4 py-1 border rounded my-2'/>
            </div>
            <div className="flex items-center gap-4">
                <Button size="lg" variant="default">
                <BiCart className="h-4 w-4 mr-2" />
                Add to Cart
                </Button>
                <Button size="lg">Purchase Now</Button>
            </div>
        </div>
    </>
  )
}
