import { FaExchangeAlt } from "react-icons/fa";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Filter from "./Filter";

export default function MobileFilter() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
            
            <FaExchangeAlt className="text-xl cursor-pointer lg:hidden" />
        </SheetTrigger>
        <SheetContent side="bottom">
            <Filter />
        </SheetContent>
    </Sheet>
    </div>
  )
}
