'use client'

import { createProduct } from "@/lib/action/product.action";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categories } from "@/constans";
import { Textarea } from "../ui/textarea";
import Step4Images from "./Step4Images";


export default function Step() {
  const [state, formAction] = useActionState(createProduct, {})
  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-5 rounded-lg flex flex-col gap-4 my-4">
        <h1>Enter the basic information about your product</h1>
      </div>
      <form action={formAction} className="w-full flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col w-full gap-3">
            <Label htmlFor="productName">Product Name</Label>
            <Input 
              id="productName"
              className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 
                  ${state?.errors ? 'border-red-500' : ''}`}
              defaultValue={state?.productName}
              name="productName"
            />
            {state?.productName && (
              <p className="text-sm text-red-500 mt-1">
                  {state?.productName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-3">
            <Label className="text-slate-600">Category Product</Label>
            <Select defaultValue={state?.category} name="category">
                <SelectTrigger className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full ${state?.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  
                </SelectContent>
            </Select>
            {state?.category && (
              <p className="text-sm text-red-500 mt-1">
                  {state?.category[0]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-slate-600">Description</Label>
          <Textarea name="description" className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60 ${state?.description ? 'border-red-500' : ''}`} defaultValue={state?.description ?? ''}/>
          {state?.description && (
            <p className="text-sm text-red-500 mt-1">
              {state.description[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full md:flex-row">
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="productName" className="text-slate-600">Product Price</Label>
            <Input 
                type="number"
                id="productPrice"
                className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 ${state?.productName ? 'border-red-500' : ''}`}
                defaultValue={state?.price ?? 0}
                name="price"
            />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label className="text-slate-600">Product stock</Label>
          <Input 
              type="number"
              id="stock"
              name="stock"
              className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
              defaultValue={state?.stock ?? 0}
          />
        </div>
        <Step4Images 
         
        />
    </div>
       
      </form>
    </section>
  )
}
