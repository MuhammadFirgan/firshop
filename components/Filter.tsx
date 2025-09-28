'use client'

import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';


export default function Filter() {
    
    return (
        <div className="my-8 md:mt-20 flex flex-col gap-8">
            <div>
                <h1 className="font-semibold mb-4">Categories</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Checkbox id="category1" />
                        <label htmlFor="category1" className="text-sm">Category 1</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="category2" />
                        <label htmlFor="category2" className="text-sm">Category 2</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="category3" />
                        <label htmlFor="category3" className="text-sm">Category 3</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="category4" />
                        <label htmlFor="category4" className="text-sm">Category 4</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className="font-semibold">Price Range</h1>
                <Slider defaultValue={[0]} max={100} step={1}  />
                <div className="flex justify-between mt-3">
                    <span>$0</span>
                    <span>$2000</span>
                </div>
            </div>
        </div>
    );
}
