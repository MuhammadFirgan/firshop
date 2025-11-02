
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter,  MapPin, Clock, Pencil } from 'lucide-react';
import { getOwnStore } from '@/lib/action/store.action';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  
  const mystore = await getOwnStore();

  const isOwner = !!mystore;


  return (
    <section className='mt-24 px-4 md:mt-0'>
      <div className="relative">
        <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl">
         
          <Image
            src={mystore.banner}
            alt={`${mystore.name} banner`}
            width={500}
            height={5000}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl transition-transform duration-300 group-hover:scale-105 hidden md:block">
                    <Image
                      src={mystore.poster}
                      alt={mystore.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover "
                    />
                  </div>
                </div>

                <div className="flex-1 text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {mystore.name}
                  </h1>
                  <div className="flex flex-col gap-4 text-sm md:text-base text-white/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mystore.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Open 24/7</span>
                      {isOwner && (
                        <Badge asChild>
                          <Link href={`/store/${mystore.id}/edit`}>Edit Store</Link>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 p-6 border-0 bg-white/10 dark:bg-black/20 backdrop-blur-md">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {mystore.description}
          </p>
        </div>
      </div>
      <div className="min-h-screen">
       

        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            

            <div className="mt-12 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    Featured Products
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0"
                    >
                      hhh
                    </Badge>
                  </h2>
                  <p className="text-muted-foreground">
                    Discover our latest collection of cutting-edge tech
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value="hhh"
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-0 bg-white/10 dark:bg-black/20 backdrop-blur-md focus-visible:ring-orange-600"
                  />
                </div>

                <Select value="" >
                  <SelectTrigger className="h-12 border-0 bg-white/10 dark:bg-black/20 backdrop-blur-md focus:ring-orange-600">
                    <Filter className="h-5 w-5 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    hhh
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
              
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
