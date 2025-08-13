import { categories, StepProps } from "@/constans";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function Step1Info({ formData, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row ">
        <div className="flex w-full flex-col gap-3">
            <Label htmlFor="productName" className="text-slate-600">Product Name</Label>
            <Input 
                id="productName"
                className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 
                    ${errors?.productName ? 'border-red-500' : ''}`}
                value={formData.productName}
                
            />
            {errors?.productName && (
                <p className="text-sm text-red-500 mt-1">
                    {errors.productName[0]}
                </p>
            )}
        </div>
        <div className="flex w-full flex-col gap-3">
            <Label className="text-slate-600">Category Product</Label>
            <Select value={formData.category}>
                <SelectTrigger className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full ${errors?.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  
                </SelectContent>
            </Select>
            {errors?.category && (
                <p className="text-sm text-red-500 mt-1">
                    // @ts-ignore
                    {errors.category[0]}
                </p>
            )}
        </div>
        
    </div>
  )
}
