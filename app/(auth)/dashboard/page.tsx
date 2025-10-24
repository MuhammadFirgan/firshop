
import dynamic from 'next/dynamic';

export default function page() {

    const DynamicMetrics = dynamic(() => import('@/components/shared/Metrics'))

    const DynamicOrder = dynamic(() => import('@/components/shared/RecentOrder'))

    const DynamicProduct = dynamic(() => import('@/components/shared/TopProducts'))

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-[600px] md:mt-80">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Good morning, Firgan 👋</h1>
          <p className="text-slate-600 mt-1">Here's what's happening with your store today</p>
        </div>
        
      </div>

      <DynamicMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <DynamicOrder />

        {/* Top Products */}
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Top Products</h2>
          <DynamicProduct />
        </div>
      </div>
    </div>
  )
}

