
import { getAllProducts } from "@/lib/action/product.action";
import { columns } from './columns';
import HeaderSectionDashboard from "@/components/shared/HeaderSectionDashboard";
import DataTable from "@/components/shared/DataTable";


export default async function page({ searchParams }: { searchParams: { page?: string, query?: string } }) {

  const page = parseInt((await searchParams).page || '1');
  const pageSize = 10;
  const searchQuery = (await searchParams).query || '';

  const result = await getAllProducts(page, pageSize, searchQuery)

  return (
    <div className="p-7 h-screen md:pl-20 md:pr-16 -mt-24">
      <HeaderSectionDashboard 
        heading="Our Products"
        subHeading="Manage your products and inventory"
        needButton={true}
        labelButton="Add new product"
        linkButton="/dashboard/product/create"
      />
       {/* @ts-ignore */}
      {/* <DataTableProducts 
        columns={columns} 
        data={result?.products || []}
        count={result?.count || 0}
        page={page}
        pageSize={pageSize}
        query={searchQuery}
      /> */}
      <DataTable 
        columns={columns} 
        data={result?.products || []}
        count={result?.count || 0}
        page={page}
        pageSize={pageSize}
        query={searchQuery}
        basePath="/dashboard/product"
      />
    </div>
    
  )
}
