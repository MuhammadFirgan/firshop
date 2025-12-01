
import { Button } from "@/components/ui/button"

// import Products from '@/components/Products';
import Checkout from '@/components/Checkout';
import SkeletonCard from '@/components/SkeletonCard'; 
import Image from 'next/image';
import { getProductBySlug } from "@/lib/action/product.action";
import { Share2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Quantity from "@/components/shared/Quantity";



export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
 
  const { slug } = await params
  const resultProduct = await getProductBySlug(slug)
  console.log("product by slug : ", resultProduct)
  if (!resultProduct || 'error' in resultProduct) {
    return (
      <section className="pt-28">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
          <p className="text-muted-foreground mt-2">
            {resultProduct?.error || 'The product you are looking for does not exist.'}
          </p>
        </div>
      </section>
    )
  }
  return (
    
    <section className="space-y-6 pt-28">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 h-96 ">
          <Image src={resultProduct?.thumbnail_url} alt="product image" width={800} height={800} className="w-full h-full rounded-xl"/>

        </div>
        <div className="flex flex-col gap-4 justify-center">
          <Badge className="bg-gradient">{resultProduct?.categories.name}</Badge>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-[var(--font-orbitron)]">
            {resultProduct?.name}
          </h1>
          <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            ${resultProduct?.price}
          </span>

          {/* for reviews */}
          {/* <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-orange-500 text-orange-500'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">{product.rating}</span>
            <span className="text-slate-500">({product.reviews} reviews)</span>
          </div> */}

          <div className="flex items-center gap-2">
            {resultProduct.stock > 0 ? (
              <>
                <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
                  In Stock
                </Badge>
                <span className="text-sm text-slate-600">
                  {resultProduct.stock} units available
                </span>
              </>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          <Quantity stock={resultProduct.stock}/>
          <div className="flex gap-3 w-full">
            <Button
              size="lg"
              className="flex-1 bg-gradient hover:from-orange-700 hover:to-red-700 text-white font-semibold h-12 group"
            >
              
              Buy Now
            </Button>
            
            <Button size="lg" variant="outline" className="h-12 px-4">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold">Description</h3>
        <p className="text-muted-foreground text-base">{resultProduct?.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-orange-600 text-orange-600'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div> */}
          {/* <span className="font-semibold">{product.rating.toFixed(1)}</span> */}
        </div>
        {/* <span className="text-muted-foreground">
          ({product.reviews_count} reviews)
        </span> */}
      </div>

      

      
    </section>
    
  )
}