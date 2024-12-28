import { cn } from "@/utils/cn";

export const ErrorLabel = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) return null;
  return (
    <p className={cn("text-xs text-destructive pt-1", className)}>{message}</p>
  );
};
