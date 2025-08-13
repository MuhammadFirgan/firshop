import { StepProps } from "@/constans";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


export default function Step2Desc({ formData, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row">
        <div className="flex flex-col gap-3 w-full">
            <Label className="text-slate-600">Description</Label>
            <Textarea className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60 ${errors?.description ? 'border-red-500' : ''}`} value={formData.description} />
            {errors?.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description[0]}
              </p>
            )}
        </div>
    </div>
  )
}
