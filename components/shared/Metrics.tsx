import { DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";

const metrics = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Total Orders',
    value: '1,847',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Products Sold',
    value: '3,642',
    change: '-2.4%',
    trend: 'down',
    icon: Package,
    color: 'from-purple-500 to-violet-600'
  },
  {
    title: 'Active Customers',
    value: '892',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'from-orange-500 to-red-600'
  }
];

export default function Metrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="metric-card animate-float" style={{ animationDelay: `${index * 200}ms` }}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
  )
}
