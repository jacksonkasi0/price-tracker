/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@lemonsqueezy/wedges";
import { Controller } from "react-hook-form";

import { cn } from "@/utils/cn";

import { ErrorLabel } from "./ErrorLabel";

export const SelectField = ({
  label,
  control,
  name,
  rules,
  options,
  className,
}: {
  label: string;
  control: any;
  name: string;
  rules: any;
  options: { value: string; label: string }[];
  className?: string; // Support for additional className
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue=""
    render={({ field, fieldState: { error } }) => (
      <div className={cn("select-field-container", className)}>
        <Select
          {...field}
          label={label}
          required
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ErrorLabel message={error?.message} />
      </div>
    )}
  />
);
