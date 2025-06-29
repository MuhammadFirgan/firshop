import Image from "next/image";
import Link from "next/link";

export default function NewArrival() {
  return (
    <div className="py-32 w-full ">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-10 bg-gradient-to-r from-orange-600 to-red-600"></div>
            <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold">New Arrival</h1>
                <span className="text-sm gradient-text">Gaming Set</span>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  place-content-center">
  
            <div className="w-full h-full relative">
                <Image src="/img/ps5.jpg" width={200} height={200} alt="new arrival" className="w-full" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute left-0 bottom-0 flex flex-col justify-end gap-5 text-white p-4 h-full max-w-sm">
                    <h2 className="text-xl font-bold">PlayStation 5</h2>
                    <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                    <Link href="" className="self-start inline-block border-b-2 border-white pb-1 font-semibold hover:gradient-text hover:border-orange-600">Shop Now</Link>
                </div>
            </div>

            
            <div className="flex flex-col h-full max-h-[500px] gap-4">
                <div className="flex gap-4">
                    <div className="w-full h-[350px] relative">
                        <Image src="/img/mouse.jpg" width={200} height={200} alt="new arrival" className="w-full h-full" />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="absolute left-0 bottom-0 flex flex-col justify-end gap-5 text-white p-4 h-full max-w-sm">
                            <h2 className="text-xl font-bold">Gaming Mouse</h2>
                            <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                            <Link href="" className="self-start inline-block border-b-2 border-white pb-1 font-semibold hover:gradient-text hover:border-orange-600">Shop Now</Link>
                        </div>
                    </div>
                    <div className="w-full h-[350px] relative">
                        <Image src="/img/vr2.jpg" width={200} height={200} alt="new arrival" className="w-full h-full" />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="absolute left-0 bottom-0 flex flex-col justify-end gap-5 text-white p-4 h-full max-w-sm">
                            <h2 className="text-xl font-bold">Virtual Reality</h2>
                            <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                            <Link href="" className="self-start inline-block border-b-2 border-white pb-1 font-semibold hover:gradient-text hover:border-orange-600">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full relative ">
                    <Image src="/img/keyboard.jpg" width={200} height={200} alt="new arrival" className="w-full" />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute left-0 bottom-0 flex flex-col justify-end gap-5 text-white p-4 h-full max-w-sm">
                        <h2 className="text-xl font-bold">Mechanical Keyboard</h2>
                        <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                        <Link href="" className="self-start inline-block border-b-2 border-white pb-1 font-semibold hover:gradient-text hover:border-orange-600">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
