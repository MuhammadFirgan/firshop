import { Store } from "lucide-react";
import { navigation } from "./Sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Filter from "../Filter";
import Link from "next/link";

export type BarTypeProps = {
    type?: 'dashboard' | 'content'
}

export default function SidebarContent({ type = "content" }: BarTypeProps) {
  return (
    <>
        {type === "dashboard" ? (
            <aside className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                            <li key={item.name}>
                                <Button
                                    asChild
                                    className={cn(
                                        "w-full justify-start gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200",
                                        item.current
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50'
                                
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                                    )}
                                    >
                                    <Link href={item.href}>
                                    
                                        <item.icon
                                            className={cn(
                                            "h-5 w-5 shrink-0 transition-colors duration-200",
                                            item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </Button>
                            </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </aside>
        ) : (
            <Filter />
       
        )}
    </>
    
  )
}
