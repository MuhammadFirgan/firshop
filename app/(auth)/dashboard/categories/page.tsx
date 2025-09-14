import FormCategory from '@/components/shared/FormCategory'
import HeaderSectionDashboard from '@/components/shared/HeaderSectionDashboard'


export default function page() {
  return (
    <div className='p-7 h-screen md:pl-20 md:pr-16 -mt-24'>
        <HeaderSectionDashboard 
            heading="Our Categories"
            subHeading="Manage your products and inventory"
            needButton={false}
        />
        <FormCategory />
    </div>
  )
}
