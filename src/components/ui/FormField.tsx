/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from "react-hook-form";
import { Input } from "@lemonsqueezy/wedges";

import { cn } from "@/utils/cn"; 

import { ErrorLabel } from "./ErrorLabel";

export const FormField = ({
  label,
  placeholder,
  type = "text",
  control,
  name,
  rules,
  className,
}: {
  label: string;
  placeholder: string;
  type?: string;
  control: any;
  name: string;
  rules: any;
  className?: string; // Support for additional className
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue=""
    render={({ field, fieldState: { error } }) => (
      <div className={cn("form-field-container", className)}>
        <Input
          required
          label={label}
          placeholder={placeholder}
          type={type}
          {...field}
          className="w-full"
        />
        <ErrorLabel message={error?.message} />
      </div>
    )}
  />
);
