'use client'

import { Check, DollarSign, FileText, ImageIcon, Package } from "lucide-react";
import { useState } from "react";

export default function Steps() {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        { id: 1, title: 'Basic Info', icon: Package },
        { id: 2, title: 'Details', icon: FileText },
        { id: 3, title: 'Pricing', icon: DollarSign },
        { id: 4, title: 'Images', icon: ImageIcon }
    ];
  return (
    <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`ml-3 font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          {/* <Progress value={calculateProgress()} className="h-2" /> */}
        </div>
  )
}
