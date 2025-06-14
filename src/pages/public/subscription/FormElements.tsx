import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Props for a standard text input field
interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormInputField: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label} <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Props for a textarea field
interface FormTextareaProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

export const FormTextareaField: React.FC<FormTextareaProps> = ({
  control,
  name,
  label,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label}
          {name.endsWith("Notes") ? (
            ""
          ) : (
            <span className="text-red-500"> *</span>
          )}
        </FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Props for a radio group field
interface FormRadioGroupProps {
  control: Control<any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  className?: string;
}

export const FormRadioGroupField: React.FC<FormRadioGroupProps> = ({
  control,
  name,
  label,
  options,
  className,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel>
          {label} <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl dir="rtl">
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse"
              >
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
