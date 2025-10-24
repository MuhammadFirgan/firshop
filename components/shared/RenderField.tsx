import React from 'react'
import { CustomFormProps, FieldType } from './CustomForm'
import { FormControl, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { FieldError, FieldLabel } from '../ui/field'

export default function RenderField({ field, fieldState, props }: { field: any, fieldState: any, props: CustomFormProps }) {
    switch (props.type) {
        case FieldType.INPUT:
            return (
                <>
                    <FieldLabel>{props.label}</FieldLabel>
                    <Input 
                        {...field}
                        id={props.id}
                        aria-invalid={fieldState.invalid}
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        autoComplete="off"
                        className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20"
                        
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    {/* <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={props.placeholder}
                            className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20"
                            {...field}
                            disabled={props.disabled}
                            value={props.value || field.value}
                           
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500"/> */}
                </>
            )
        case FieldType.NUMBER:
            return (
                <>
                    <FieldLabel>{props.label}</FieldLabel>
                    <Input 
                        {...field}
                        id={props.id}
                        aria-invalid={fieldState.invalid}
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        autoComplete="off"
                        className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20"
                        type="number"
                        
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    {/* <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={props.placeholder} {...field}
                            className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20 w-full"
                            type="number"
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" /> */}
                </>
            )
        case FieldType.TEXTAREA:
            return (
                <>
                    
                    <FieldLabel>{props.label}</FieldLabel>
                    <Textarea 
                        className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20 h-60" 
                        placeholder={props.placeholder} 
                        aria-invalid={fieldState.invalid}
                        {...field}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                
                </>
                
            )

        case FieldType.SELECT:
            return (
                <>
                    <FieldLabel>{props.label}</FieldLabel>
                    <Select name={field.name} defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger 
                            className="transition-all duration-300 border-gray-200  focus:border-blue-400 focus:ring-blue-400/20 w-full"
                            aria-invalid={fieldState.invalid}

                        >
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-white shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-red-500" />
                </>
            )
        // case FieldType.UPLOAD:
        //     return (
        //         <>
        //             <FormLabel>{props.label}</FormLabel>
        //             <FormControl>
        //                 <Input id="picture" type="file"  placeholder={props.placeholder} {...field} className="shad-input border-zinc-200 w-full" />
                        
        //             </FormControl>
        //             <FormMessage className="text-sm text-red-500" />
                    
        //         </>
        //     )
    
        default:
            break;
    }
}
