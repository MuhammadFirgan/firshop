import DataTable from '@/components/shared/DataTable'
import FormCategory from '@/components/shared/FormCategory'
import HeaderSectionDashboard from '@/components/shared/HeaderSectionDashboard'
import { getCategories } from '@/lib/action/category.action'
import { column } from './columns'


export default async function page({ searchParams }: { searchParams: { page?: string, query?: string } }) {

  const page = parseInt((await searchParams).page || '')
  const pageSize = 10
  const searchQuery = (await searchParams).query || ''

  const result = await getCategories(page, pageSize, searchQuery)
  console.log('result', result)

  return (
    <div className='p-7 h-screen md:pl-20 md:pr-16 -mt-24'>
        <HeaderSectionDashboard 
            heading="Our Categories"
            subHeading="Manage your products and inventory"
            needButton={false}
        />
        <FormCategory />

        <DataTable 
          columns={column}
          data={result?.categories || []}
          count={result?.count || 0}
          page={page}
          pageSize={pageSize}
          query={searchQuery}
          basePath="/dashboard/categories"
        />
    </div>
  )
}
