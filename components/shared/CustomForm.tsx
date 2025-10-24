import { Control, Controller } from "react-hook-form"
import RenderField from "./RenderField"
import { Field } from "../ui/field"

export enum FieldType {
    INPUT = 'input',
    SELECT = 'select',
    FILE = 'file',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    UPLOAD = 'upload'
}

export interface CustomFormProps {
    id: string
    control: Control<any>
    type: FieldType
    name: string
    label?: string
    placeholder?: string
    value?: string
    children?: React.ReactNode
    disabled?: boolean
}


export default function CustomForm(props: CustomFormProps) {
    const { name, control, value } = props
  return (
    <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>

            
            <RenderField field={field} fieldState={fieldState} props={props}/>
            
        </Field>
        )}
    />
  )
}