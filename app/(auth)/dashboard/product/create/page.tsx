

import Steps from "@/components/shared/Steps";
import { Button } from "@/components/ui/button";



export default function page() {
    
  return (
    <section className="h-screen w-full px-8 pt-16 md:pt-0">
        <div className="flex justify-between ">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Product</h1>
                <span className="text-slate-600 mt-1">Create your product listing in just a few steps</span>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 !text-white">Save Product</Button>
        </div>

        <Steps />
    </section>
  )
}
