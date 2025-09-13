import HeaderSectionDashboard from "@/components/shared/HeaderSectionDashboard";
import PromotionBanner from "@/components/shared/PromotionBanner";


export default function page() {
  return (
    <div className="p-7 h-screen md:pl-20 md:pr-16 mt-14 mb-10 md:-mt-20">
      <HeaderSectionDashboard 
        heading="Our Marketing"
        subHeading="Manage your marketing campaigns and promotions"
        needButton={true}
        labelButton="Add Discount"
        linkButton="/dashboard/marketing/create"
      />

      <PromotionBanner />
    </div>
  )
}
