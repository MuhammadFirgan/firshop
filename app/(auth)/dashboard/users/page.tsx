import { getAllUser } from "@/lib/action/auth.action"
import DataTable from "./data-table"
import { columns } from "./columns"
import HeaderSectionDashboard from "@/components/shared/HeaderSectionDashboard";

export default async function page({ searchParams }: { searchParams: { page?: string, query?: string } }) {
  const page = parseInt((await searchParams).page || '1');
  const pageSize = 10;
  const searchQuery = (await searchParams).query || '';

  const { users, count } = await getAllUser(page, pageSize, searchQuery)

  return (
    <div className="mx-8 mt-12 md:-mt-48">
      <HeaderSectionDashboard 
        heading="User Management"
        subHeading="Manage your application users"
        needButton={false}
      />
      <DataTable 
        columns={columns} 
        // @ts-ignore
        data={users} 
        count={count || 0} 
        page={page} 
        pageSize={pageSize}
        query={searchQuery}
      />
    </div>
  )
}
