'use client'

import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';


export default function Filter() {
    
    return (
        <div>
            
            <div className="my-8">
                <div className="flex gap-4 my-6 lg:flex-col">
                    <h1 className="font-semibold">Sort By</h1>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Latest
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Newest
                        </label>
                    </div>
                </div>
                <h1 className="font-semibold mb-7">Price Range</h1>
                <Slider defaultValue={[0]} max={100} step={1}  />
                <div className="flex justify-between mt-3">
                    <span>$0</span>
                    <span>$2000</span>
                </div>
            </div>
        </div>
    );
}
