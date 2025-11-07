import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createServer } from "./supabase/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseStringify<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alfanumerik dengan tanda hubung
    .replace(/^-+|-+$/g, ""); // Hapus tanda hubung di awal dan akhir
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
}

