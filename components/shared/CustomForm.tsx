import { ReactNode } from "react"
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
  } from "react-hook-form"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { UploadResult } from "@/lib/action/upload.action"
import FileUpload from "./FileUpload"
 
  
  type FormControlProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
  > = {
    name: TName
    label: ReactNode
    description?: ReactNode
    control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"]
    disabled?: boolean
    placeholder?: string
  }
  
  type FormBaseProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
  > = FormControlProps<TFieldValues, TName, TTransformedValues> & {
    horizontal?: boolean
    controlFirst?: boolean
    children: (
      field: Parameters<
        ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
      >[0]["field"] & {
        "aria-invalid": boolean
        id: string
      }
    ) => ReactNode
  }
  
  type FormControlFunc<
    ExtraProps extends Record<string, unknown> = Record<never, never>
  > = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
  >(
    props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps
  ) => ReactNode

  type FormUploadProps = {
    onUpload: (formData: FormData) => Promise<UploadResult>;
  }
  
  function FormBase<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
  >({
    children,
    control,
    label,
    name,
    description,
    controlFirst,
    horizontal,
    disabled = false
  }: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const labelElement = (
            <>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {description && <FieldDescription>{description}</FieldDescription>}
            </>
          )
          const control = children({
            ...field,
            id: field.name,
            "aria-invalid": fieldState.invalid,
            disabled: disabled,

     
          })
          const errorElem = fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )
  
          return (
            <Field
              data-invalid={fieldState.invalid}
              data-disabled={disabled}
              orientation={horizontal ? "horizontal" : undefined}
            >
              {controlFirst ? (
                <>
                  {control}
                  <FieldContent>
                    {labelElement}
                    {errorElem}
                  </FieldContent>
                </>
              ) : (
                <>
                  <FieldContent>{labelElement}</FieldContent>
                  {control}
                  {errorElem}
                </>
              )}
            </Field>
          )
        }}
      />
    )
  }
  
  export const FormInput: FormControlFunc = props => {
    return <FormBase {...props}>{field => <Input {...field} />}</FormBase>
  }
  
  export const FormTextarea: FormControlFunc = props => {
    return <FormBase {...props}>{field => <Textarea {...field} />}</FormBase>
  }
  
  export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({
    children,
    placeholder,
    ...props
  }) => {
    return (
      <FormBase {...props}>
        {({ onChange, onBlur, disabled, ...field }) => (
          <Select {...field} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger
              aria-invalid={field["aria-invalid"]}
              id={field.id}
              onBlur={onBlur}
              
            >
              <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
          </Select>
        )}
      </FormBase>
    )
  }

  export const FormUpload: FormControlFunc<FormUploadProps> = ({ onUpload, ...props }) => {
    return (
        <FormBase {...props}>
        {({ onChange, value, onBlur, id, ...field }) => (
            <FileUpload
                // Menggunakan value dan onChange dari field props
                value={value as string}
                onFieldChange={onChange}
                onUpload={onUpload}
                inputId={id} 
                {...field}
            />
        )}
      </FormBase>
    )
  }
  
