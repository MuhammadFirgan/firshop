import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTableProducts from "./data-table";
import { getAllProducts } from "@/lib/action/product.action";
import { columns } from './columns';


export default async function page({ searchParams }: { searchParams: { page?: string, query?: string } }) {

  const page = parseInt((await searchParams).page || '1');
  const pageSize = 10;
  const searchQuery = (await searchParams).query || '';

  const result = await getAllProducts(page, pageSize, searchQuery)

  return (
    <div className="p-7 h-screen md:pl-20 md:pr-16 -mt-24">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-5 md:items-center">
         <div>
           <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             Our Products
           </h1>
           <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p>
         </div> 
         <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 !text-white">
           <Link href="/dashboard/product/create">Create New Product</Link>
         </Button> 
       </div>
       {/* @ts-ignore */}
      <DataTableProducts 
        columns={columns} 
        data={result?.products || []}
        count={result?.count || 0}
        page={page}
        pageSize={pageSize}
        query={searchQuery}
      />
    </div>
    
  )
}
