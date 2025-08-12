import { categories, StepProps } from "@/constans";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function Step1Info({ formData, onInputChange, onSelectChange }: StepProps) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row ">
        <div className="flex w-full flex-col gap-3">
            <Label htmlFor="productName" className="text-slate-600">Product Name</Label>
            <Input 
                id="productName"
                className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                value={formData.productName}
                onChange={onInputChange}
            />
        </div>
        <div className="flex w-full flex-col gap-3">
            <Label className="text-slate-600">Category Product</Label>
            <Select onValueChange={onSelectChange} value={formData.category}>
                <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full">
                <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  
                </SelectContent>
            </Select>
        </div>
        
    </div>
  )
}
