// components/DateForm.tsx
"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface DateFormProps {
  control: Control<any>; // Tipe kontrol dari react-hook-form
  name: string;
  label: string;
  placeholder: string;
}

export function CustomCalendar({ control, name, label, placeholder }: DateFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"default"}
                  className={cn(
                    "pl-3 text-left font-normal border-gray-200",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                // disabled={(date) =>
                //   date > new Date() || date < new Date("1900-01-01")
                // }
                captionLayout="dropdown"
                components={{
                    DayButton: ({ className, ...props }) => {
                        return (
                          <Button
                            variant="ghost"
                            className={cn(
                              "hover:bg-gray-800 hover:text-white", // Perbaikan di sini
                              className
                            )}
                            {...props}
                          />
                        )
                      },
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}