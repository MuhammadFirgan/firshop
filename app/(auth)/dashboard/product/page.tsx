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


export default async function page() {
  const products = await getAllProducts()

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
      <DataTableProducts columns={columns} data={products}/>
    </div>
    // <section className="p-7 h-screen md:pl-20 md:pr-16 -mt-24">
    //   <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
    //     <div>
    //       <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
    //         Our Products
    //       </h1>
    //       <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p>
    //     </div> 
    //     <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 !text-white">
    //       <Link href="/dashboard/product/create">Create New Product</Link>
    //     </Button> 
    //   </div>
    //   <div className="flex pt-4 gap-3">
    //     <div className="w-full">
    //       <Input 
    //         placeholder="Search product..."
    //         className="border-gray-200"
    //       />
    //     </div>
    //     <div>
    //       <Select>
    //         <SelectTrigger>
    //           <SelectValue placeholder="All Categories" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectItem value="light">Light</SelectItem>
    //           <SelectItem value="dark">Dark</SelectItem>
    //           <SelectItem value="system">System</SelectItem>
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   </div>

    //   <div className="border h-screen overflow-y-auto scrollbar-hide border-gray-200 rounded-lg mt-14">
    //     <Table >
    //       <TableCaption>A list of your recent invoices.</TableCaption>
    //       <TableHeader>
    //         <TableRow className="bg-blue-50 border-gray-200">
    //           <TableHead className="text-gray-700 font-semibold">Product</TableHead>
    //           <TableHead className="text-gray-700 font-semibold">Category</TableHead>
    //           <TableHead className="text-gray-700 font-semibold">Price</TableHead>
    //           <TableHead className="text-gray-700 font-semibold">Stock</TableHead>
    //           <TableHead className="text-gray-700 font-semibold">Status</TableHead>
    //           <TableHead className="text-gray-700 font-semibold">Action</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         <TableRow>
    //           <TableCell className="font-medium">
    //             <div className="flex items-center gap-4 px-4 py-2 w-[300px]">
    //               <Image src="/img/headset.jpg" width={24} height={24} alt="product" className="size-12"/>
    //               <div className="flex flex-col w-full max-w-44 md:max-w-xs">
    //                 <h1 className="line-clamp-1">Headset Gaming 5</h1>
    //                 <p className="line-clamp-1 text-xs text-gray-700 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nulla beatae reiciendis, quas asperiores obcaecati quisquam deserunt? Cumque dolor culpa perspiciatis exercitationem, tenetur nulla!</p>
    //               </div>
    //             </div>

    //           </TableCell>
    //           <TableCell>
    //             <Badge className="text-blue-700 bg-blue-100 font-semibold">Gaming</Badge>
    //           </TableCell>
    //           <TableCell>$250.00</TableCell>
    //           <TableCell>45</TableCell>
    //           <TableCell>
    //             <Badge className="text-green-700 bg-green-100 font-semibold">Active</Badge>
    //           </TableCell>
    //           <TableCell>
    //             <div className="flex items-center">
    //               <Button variant="ghost">
    //                 <Edit className="size-4" />
    //               </Button>
    //               <Button variant="ghost">
    //                 <Trash className="size-4"/>
    //               </Button>
    //             </div>
    //           </TableCell>
    //         </TableRow>
            
            
    //       </TableBody>
    //     </Table>
    //   </div>

    // </section>
  )
}
