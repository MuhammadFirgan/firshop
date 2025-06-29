
interface FeaturesProps {
    icon: React.ReactNode;
    title: string;
    desc: string
}

export default function Features({ icon, title, desc } : FeaturesProps) {
  return (
    <div className="max-w-sm p-5 flex flex-col items-center text-center gap-3">
        {icon}
      
      <h1 className="font-semibold text-lg">{title}</h1>
      <span className="text-sm text-gray-500">{desc}</span>
    </div>
  )
}
