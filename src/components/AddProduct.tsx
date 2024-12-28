/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */


'use client';

import React, { useState } from "react";

// ** import third-party libraries
import { useForm } from "react-hook-form";
import { Button } from "@lemonsqueezy/wedges";

// ** import sub-components
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";

function AddProduct({ onSuccess }: { onSuccess: () => void }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add product. Please try again.");
      }

      setMessage("Product added successfully!");
      reset();
      onSuccess(); // Close the modal on success
    } catch (error) {
      console.error(error);
      setMessage("Error: Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto space-y-6"
    >
      {/* Product Name */}
      <FormField
        label="Product Name"
        placeholder="Enter product name"
        name="name"
        control={control}
        rules={{ required: "Product name is required" }}
      />

      {/* Product URL */}
      <FormField
        label="Product URL"
        placeholder="Enter product URL"
        name="url"
        control={control}
        rules={{
          required: "Product URL is required",
          pattern: {
            value: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})/,
            message: "Enter a valid URL",
          },
        }}
      />

      {/* Platform */}
      <SelectField
        label="Select Platform"
        name="platform"
        control={control}
        rules={{ required: "Platform is required" }}
        options={[
          { value: "amazon", label: "Amazon" },
          { value: "ebay", label: "eBay" },
          { value: "walmart", label: "Walmart" },
        ]}
      />

      {/* Min and Max Price */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <FormField
          label="Min Price"
          placeholder="Min"
          type="number"
          name="min_price"
          control={control}
          rules={{
            required: "Minimum price is required",
            validate: (value: string) =>
              parseFloat(value) > 0 || "Minimum price must be greater than 0",
          }}
        />
        <FormField
          label="Max Price"
          placeholder="Max"
          type="number"
          name="max_price"
          control={control}
          rules={{
            required: "Maximum price is required",
            validate: (value: string) =>
              parseFloat(value) > 0 || "Maximum price must be greater than 0",
          }}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full shadow-wg-sm"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </Button>

      {/* Feedback Message */}
      {message && <p className="text-center text-surface mt-2">{message}</p>}
    </form>
  );
}

export default AddProduct;
