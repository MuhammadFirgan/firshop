import { StepProps } from "@/constans";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


export default function Step2Desc({ formData, onInputChange }: StepProps) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row">
        <div className="flex flex-col gap-3 w-full">
            <Label className="text-slate-600">Description</Label>
            <Textarea className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60" value={formData.description} onChange={onInputChange}/>
        </div>
    </div>
  )
}
