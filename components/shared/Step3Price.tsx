import { StepProps } from "@/constans";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function Step3Price({ formData, errors }: StepProps ) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row">
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="productName" className="text-slate-600">Product Price</Label>
            <Input 
                type="number"
                id="productPrice"
                className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 ${errors?.productName ? 'border-red-500' : ''}`}
                value={formData.price}
                
            />
        </div>
        <div className="flex flex-col gap-3 w-full">
            <Label className="text-slate-600">Product stock</Label>
            <Input 
                type="number"
                id="productPrice"
                className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                value={formData.stock}
                
            />
        </div>
    </div>
  )
}
