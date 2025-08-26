

import Steps from "@/components/shared/Steps";
import { Button } from "@/components/ui/button";



export default function page() {
    
  return (
    <section className="h-screen w-full px-8 pt-16 md:pt-0 md:-mt-14">
        <div className="flex justify-between ">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Product</h1>
                <span className="text-slate-600 mt-1">Create your product listing in just a few steps</span>
            </div>
           
        </div>

        <Steps />
    </section>
  )
}
