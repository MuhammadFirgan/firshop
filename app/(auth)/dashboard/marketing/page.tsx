import HeaderSectionDashboard from "@/components/shared/HeaderSectionDashboard";
import PromotionBanner from "@/components/shared/PromotionBanner";
import { getLatestMarketing } from "@/lib/action/marketing.action";


export default async function page() {

  const result = await getLatestMarketing()
  console.log("result : ", result)

  return (
    <div className="p-7 h-screen md:pl-20 md:pr-16 mt-14 mb-10 md:-mt-20">
      <HeaderSectionDashboard 
        heading="Our Marketing"
        subHeading="Manage your marketing campaigns and promotions"
        needButton={true}
        labelButton="Add Discount"
        linkButton="/dashboard/marketing/create"
      />

      <PromotionBanner 
        discount={result.discount}
        tagline={result.tagline}
        startDate={result.start_date}
        endDate={result.end_date}
        image={result.thumbnail}
      />
    </div>
  )
}
