import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
