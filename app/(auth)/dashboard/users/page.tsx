import { getAllUser } from "@/lib/action/auth.action"
import DataTable from "./data-table"
import { columns } from "./columns"

export default async function page() {

    const users = await getAllUser()
    

  return (
    <div className="mx-8 mt-12 md:-mt-48">
      <div className="flex flex-col gap-4 mb-5 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            List Users
          </h1>
          <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p>
        </div> 
      </div>
      <DataTable columns={columns} data={users}/>
    </div>
  )
}
