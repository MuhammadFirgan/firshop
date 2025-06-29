import { bebas_neue } from "@/constans";
import Image from 'next/image';

interface BenefitsProps {
    image: string;
    title: string;
}

export default function Benefits({ image, title } : BenefitsProps) {
  return (
    <div className="w-full sm:w-1/3 h-60 relative">
      <Image src={`/img/${image}`} width={300} height={300} alt={image} className="w-full h-full brightness-50 rounded-2xl"/>
      <h1 className={`text-4xl lg:text-6xl text-white z-50 absolute top-10 px-6 ${bebas_neue.className}`}>{title}</h1>
    </div>
  )
}
