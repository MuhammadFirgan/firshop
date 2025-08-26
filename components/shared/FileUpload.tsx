import { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILES = 5;

interface UploadFileProps {
  value?: File
  onFieldChange: (fileUrl: String) => void
}

export default function FileUpload({ onFieldChange }: UploadFileProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files
      .filter((file) => file.size > 0)
      .map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const removeImage = (indexToRemove: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-6 w-full">
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
       

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
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          name="thumbnail"
          ref={fileInputRef}
        />
        <Button 
          asChild 
          variant="outline" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            Choose Files
          </label>
        </Button>
      </div>

      
      
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {previews.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                width={200}
                height={200}
                alt={`Product ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-slate-200"
              />
              <Button
                type="submit"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}