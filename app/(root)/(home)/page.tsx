
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import SkeletonCard from '@/components/SkeletonCard';
import { bebas_neue, categories, products } from '@/constans';
import Image from 'next/image';
import { Filter, Search } from 'lucide-react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductsGrid, { Product } from '@/components/shared/ProductsGrid';
import PromotionBanner from '@/components/shared/PromotionBanner';
import NewArrival from '@/components/shared/NewArrival';
import { getAllProducts } from '@/lib/action/product.action';


interface ProductGridProps {
  onAddToCart: (product: Product) => void
}

export default async function Home() {

  const results = await getAllProducts(2, 2)
  

  return (
    <section>
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-6">
                
                <span className="text-orange-600 font-medium">Premium Gift Selection</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find the
                <span className="gradient-text"> Perfect Gift</span>
                <br />
                for Every Occasion
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover curated tech gifts that make lasting impressions. From innovative gadgets to professional tools, we help you give gifts that matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 !text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover-lift">
                  <Link href="">Shop Now</Link>
                 
                </Button>
                
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-orange-600 hover:text-orange-600 transition-all duration-300 hover-lift">
                  View Catalog
                </button>
              </div>

              <div className="flex items-center space-x-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>


            <div className="relative lg:ml-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-blur-sm p-8 hidden md:block">
                  <Image src="/img/girls.png" width={200} height={200} alt="hero" className="w-full hidden md:block" />
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift absolute left-0 top-14">
                    {/* <Gift className="text-orange-600 mb-4" size={32} /> */}
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                    <p className="text-gray-600 text-sm">Express shipping</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift absolute bottom-44 right-0">
                    {/* <Sparkles className="text-red-600 mb-4" size={32} /> */}
                    <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600 text-sm">Carefully curated</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift absolute bottom-0 left-0">
                      {/* <Gift className="text-orange-600 mb-4" size={32} /> */}
                      <h3 className="font-semibold text-gray-900 mb-2">Gift Wrapping</h3>
                      <p className="text-gray-600 text-sm">Professional service</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium tech gifts that make perfect presents
            </p>
          </div>



          <ProductsGrid limit={4}/>
          <div className="flex justify-center my-8">
            <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 !text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover-lift">
              <Link href="">View All</Link>

            </Button>
          </div>

        </div>
      </div>

      <PromotionBanner />
      <div className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium tech gifts that make perfect presents
            </p>
          </div>



          <ProductsGrid limit={8}/>
          <div className="flex justify-center my-8">
            <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 !text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover-lift">
              <Link href="">View All</Link>

            </Button>
          </div>

          <NewArrival />

        </div>
      </div>
    </section>
  );
}
