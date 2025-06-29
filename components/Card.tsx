// import Image from 'next/image'
// import Link from 'next/link'

// interface CardProps {
//     id: string;
//     title: string;
//     image: string;
//     price: string;
// }

// export default function Card({ id, title, image, price } : CardProps) {
//   return (
//     <Link href={`/product/${id}`} className='p-10 flex flex-col justify-center w-full max-w-sm'>
//       <Image src={image} width={150} height={150} alt={title} className='overflow-hidden mx-auto object-contain' />       
//         <h1 className='text-lg line-clamp-2 pt-8'>{title}</h1>
//         <p className="text-sm font-semibold">${price}</p>
            
//     </Link>
//   )
// }

import { ShoppingCart, Star, Heart } from 'lucide-react'
import Image from 'next/image'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const Card: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-lift group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {product.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}

        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) 
                  ? "text-yellow-400 fill-current" 
                  : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover-lift"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card