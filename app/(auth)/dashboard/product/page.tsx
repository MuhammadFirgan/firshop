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
import Image from "next/image";


export default function page() {
  return (
    <section className="p-7 md:pl-20 md:pr-16">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p>
        </div> 
        <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 ">
          <Link href="/dashboard/product/create" className="text-white">Create New Product</Link>
        </Button> 
      </div>

      <div className="flex w-full items-center md:gap-12 overflow-x-auto py-8 gap-4">
        <div className="size-20">
          <Image src="/img/headset.jpg" width={200} height={200} alt="product" className="w-full aspect-square rounded-xl"/>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h1 className="line-clamp-1">Headset Pro Gaming</h1>
          <span className="text-xs text-gray-500">Gaming</span>
        </div>
        <div className="flex flex-col">
          <span className="">Rp. 200000</span>
          <span className="text-xs text-gray-500">120 stocks</span>
        </div>
        <div className="flex flex-col">
          <span className="">Rp. 200000</span>
          <span className="text-xs text-gray-500">120 stocks</span>
        </div>
        {/* <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="border-none bg-gradient-to-r from-blue-100 to-purple-100">
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="line-clamp-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea totam fuga accusamus tenetur rerum placeat voluptate voluptatibus explicabo fugit dolor?</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </div>

    </section>
  )
}
