import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { headerSectionProps } from '@/types'

export default function HeaderSectionDashboard({ heading, subHeading, needButton, labelButton, linkButton }: headerSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-5 md:items-center">
        <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {heading}
            </h1>
            {/* <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p> */}
            <p className="text-slate-600 mt-1">{subHeading}</p>
        </div>
        {needButton && (
            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 !text-white">
                <Link href={`${linkButton}`}>{labelButton}</Link>
            </Button> 
        )} 
    </div>
  )
}
