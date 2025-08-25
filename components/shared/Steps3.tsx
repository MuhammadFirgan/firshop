// components/Steps.tsx
'use client'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import Step4Images from "./Step4Images";
import ProgressStep, { steps } from "./ProgressStep";
import { Button } from "../ui/button";
import { useActionState, useState } from "react";
import Step1Info from "./Step1Info";
import Step2Desc from "./Step2Desc";
import Step3Price from "./Step3Price";

import { createProduct } from "@/lib/action/product.action";
import { z } from "zod";


export type ProductState = {
  status: "idle" | "pending" | "error";
  data: {
    productName: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: File[];
  };
  errors?: Record<string, string[]>;
};

export default function Steps() {
  const initialState: ProductState = {
    status: "idle",
    data: {
      productName: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      thumbnail: [],
    },
    errors: {},
  };
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const [state, formAction] = useActionState(createProduct, initialState)

  console.log("state : ", state)
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  
  return (
    <div className="max-w-sm overflow-x-auto md:max-w-full">
      <ProgressStep
        currentStep={currentStep}
      />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-5 rounded-lg flex flex-col gap-4">
        <div className="text-xl text-slate-800 font-semibold">
          {steps[currentStep - 1].title}
        </div>
        <div className="text-sm text-slate-600">
          {currentStep === 1 && "Enter the basic information about your product"}
          {currentStep === 2 && "Add detailed description and specifications"}
          {currentStep === 3 && "Set your pricing and inventory details"}
          {currentStep === 4 && "Upload product images to showcase your item"}
        </div>
      </div>
      <form action={formAction} className="flex w-full gap-4 flex-col mt-7">
        {currentStep === 1 && (
          <Step1Info 
            formData={state.data}
            errors={state?.errors}
            
          />
        )}
        {currentStep === 2 && (
          <Step2Desc 
            formData={state.data}
            errors={state?.errors}
            
          />
        )}
        {currentStep === 3 && (
          <Step3Price 
            formData={state.data}
            errors={state?.errors}
            
          />
        )}
        {currentStep === 4 && (
          <Step4Images 
            formData={state.data}
            errors={state?.errors}
          />
        )}
        
        
        <div className="flex justify-between items-center p-8 text-white">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            Previous
          </Button>
          
          <div className="flex gap-2 text-white">
            {currentStep === steps.length ? (
              <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <span className="text-white">Publish Product</span>
                
              </Button>
              
            ) : (
              <Button 
                onClick={nextStep}
                
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <span className="text-white">Next Step</span>
              
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}