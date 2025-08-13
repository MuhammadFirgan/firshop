import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { StepProps } from "@/constans";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILES = 5;

export default function Step4Images({ formData, errors }: StepProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('File type not supported. Please use JPG, PNG, or GIF');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size too large. Maximum size is 5MB');
      return false;
    }
    return true;
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setFileError(null);

    const files = Array.from(e.dataTransfer.files);
    
    if (files.length + formData.thumbnail.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} images allowed`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length > 0) {
      const formData = new FormData();
      validFiles.forEach(file => formData.append('images', file));
      
      // Add files to form data for server action
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.files = e.dataTransfer.files;
      input.name = 'images';
      e.currentTarget.closest('form')?.appendChild(input);
      input.style.display = 'none';
    }
  };

  const handleFileUpload = async (files: FileList) => {
    setFileError(null);
    const fileArray = Array.from(files);

    if (fileArray.length + formData.thumbnail.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} images allowed`);
      return;
    }

    const validFiles = fileArray.filter(validateFile);
    if (validFiles.length > 0) {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.files = files;
      input.name = 'images';
      document.querySelector('form')?.appendChild(input);
      input.style.display = 'none';
    }
  };

  const removeImage = (indexToRemove: number) => {
    const inputs = document.querySelectorAll('input[type="file"][name="images"]');
    inputs[indexToRemove]?.remove();
  };

  return (
    <div className="space-y-6 w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : errors?.thumbnail 
              ? 'border-red-500 bg-red-50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
        <p className="text-lg font-medium text-slate-700 mb-2">
          Drag & drop images here, or click to browse
        </p>
        <p className="text-sm text-slate-500 mb-4">
          Upload up to 5 images (JPG, PNG, GIF - Max 5MB each)
        </p>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              handleFileUpload(e.target.files);
            }
          }}
          className="hidden"
          id="file-upload"
          name="images"
        />
        <Button 
          asChild 
          variant="outline" 
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white
            ${errors?.thumbnail ? 'border-red-500' : ''}`}
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            Choose Files
          </label>
        </Button>
      </div>

      {(errors?.thumbnail || fileError) && (
        <p className="text-sm text-red-500 mt-2">
          {errors?.thumbnail?.[0] || fileError}
        </p>
      )}
      
      {formData.thumbnail.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {formData.thumbnail.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={URL.createObjectURL(image)}
                width={200}
                height={200}
                alt={`Product ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-slate-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}