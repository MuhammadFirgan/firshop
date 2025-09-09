import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseStringify(data: any): any {
  // Fungsi replacer untuk JSON.stringify yang mengabaikan properti Symbol
  const replacer = (_key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      const filteredValue = {};
      for (const prop of Object.getOwnPropertyNames(value)) {
        // @ts-ignore
        filteredValue[prop] = value[prop];
      }
      return filteredValue;
    }
    return value;
  };

  return JSON.parse(JSON.stringify(data, replacer));
}

export function formatRupiah(amount: number) {
  if(typeof amount !== 'number') {
    return 'invalid amount'
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}