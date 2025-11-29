// components/DeleteProductButton.tsx
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "@/lib/action/product.action";
import { deleteCategory } from "@/lib/action/category.action";



export function DeleteAction({slug, onDelete}: {slug: string, onDelete: (id: string) => Promise<{ success: boolean; message: string }>}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    // @ts-ignore
    const result = await onDelete(slug);


    if (result?.success) {
      toast.success(result.message);
      router.refresh();
      
    } else {
      toast.error(result?.message);
    }
    setIsDeleting(false);
  };

  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <div className="text-center ">
            <Button variant="ghost" size="icon">
                <Trash className="size-4 cursor-pointer" />
            </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : 'Hapus'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}