import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormField } from "../forms/FormField";

interface FileInputProps {
  id: string;
  label: string;
  file: File | null | undefined;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  file,
  onFileSelect,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    onFileSelect(selectedFile);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="rounded-lg border-2 border-dashed bg-slate-50 p-4">
      <FormField id={id} label={label} error={error}>
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={handleButtonClick}>
            اختر ملف
          </Button>
          <span
            className={cn(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {file?.name || "لم يتم اختيار أي ملف"}
          </span>
          <Input
            type="file"
            id={id}
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </FormField>
    </div>
  );
};
