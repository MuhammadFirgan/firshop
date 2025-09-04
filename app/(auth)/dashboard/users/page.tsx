import { getAllUser } from "@/lib/action/auth.action"
import DataTable from "./data-table"
import { columns } from "./columns"

export default async function page() {

    const users = await getAllUser()
    console.log("users : ", users)

  return (
    <div className="mx-8">
      <DataTable columns={columns} data={users}/>
    </div>
  )
}
