import { categories } from "@/constans";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type DropdownProps = {
    value?: string;
    onChangeHandler?: (value: string) => void;
  };

export default function ProductCategory({ value, onChangeHandler }: DropdownProps) {
  return (
    <Select onValueChange={onChangeHandler} value={value}>
        <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full">
        <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
            {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
            
        </SelectContent>
    </Select>
  )
}
