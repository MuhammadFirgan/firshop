// components/Steps.tsx
'use client'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import Step4Images from "./Step4Images";
import ProgressStep, { steps } from "./ProgressStep";
import { Button } from "../ui/button";
import { useState } from "react";
import Step1Info from "./Step1Info";
import Step2Desc from "./Step2Desc";
import Step3Price from "./Step3Price";
import { useFormState } from "react-dom";
import { createProduct } from "@/lib/action/product.action";
import { z } from "zod";


export default function Steps() {
  
  const [currentStep, setCurrentStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   productName: '',
  //   category: '',
  //   description: '',
  //   price: 0,
  //   stock: 0,
  //   images: []
  // });
  const [state, formAction] = useFormState(createProduct, {
    status: 'idle',
    data: {
      productName: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
      thumbnail: [] as File[]
    }
  })

  
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { id, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [id]: value
  //   }));
  // };

  // const handleImageChange = (newImages: File[]) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     images: newImages
  //   }));
  // };
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
      <form action={formAction} className="flex w-full gap-4 flex-col md:flex-row mt-7">
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
        
        {/* <div className="flex flex-col gap-4 w-full md:flex-row ">
          <div className="flex flex-col gap-3">
            <Label htmlFor="productName" className="text-slate-600">Product Name</Label>
            <Input 
              id="productName"
              className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-slate-600">Category Product</Label>
            <Select>
              <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div> */}
        {/* <div className="flex flex-col gap-4 w-full md:flex-row">
          <div className="flex flex-col gap-3">
            <Label htmlFor="productName" className="text-slate-600">Product Price</Label>
            <Input 
              type="number"
              id="productPrice"
              className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-slate-600">Product stock</Label>
            <Input 
              type="number"
              id="productPrice"
              className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:flex-row">
          <div className="flex flex-col gap-3">
            <Label className="text-slate-600">Category</Label>
            <div className="flex flex-col gap-3">
              <Label className="text-slate-600">Description</Label>
              <Textarea className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60"/>
            </div>
            
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-slate-600">Upload Product</Label>
            <Step4Images />
          </div>
        </div> */}
      </form>
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
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 ">
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
    </div>
  )
}