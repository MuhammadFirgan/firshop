import React from 'react'
import { CustomFormProps, FieldType } from './CustomForm'
import { FormControl, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

export default function RenderField({ field, props }: { field: any, props: CustomFormProps }) {
    switch (props.type) {
        case FieldType.INPUT:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={props.placeholder}
                            className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                            {...field}
                           
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500"/>
                </>
            )
        case FieldType.NUMBER:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={props.placeholder} {...field}
                            className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full"
                            type="number"
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                </>
            )
        case FieldType.TEXTAREA:
            return (
                <>
                    
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Textarea className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60" placeholder={props.placeholder} {...field}/>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                
                </>
                
            )

        case FieldType.SELECT:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                            <SelectContent className="bg-white shad-select-content">
                                {props.children}
                            </SelectContent>
                        </Select>

                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                </>
            )
        case FieldType.UPLOAD:
            return (
                <>
                    
                    <FormControl>
                        <Input id="picture" type="file"  placeholder={props.placeholder} {...field} className="shad-input bg-zinc-900 border-none w-full" />
                        
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                    
                </>
            )
    
        default:
            break;
    }
}
