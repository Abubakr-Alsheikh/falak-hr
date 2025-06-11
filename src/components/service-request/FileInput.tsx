import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileInputProps {
  label: string;
  onFileSelect: (file: File | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string>("لم يتم اختيار أي ملف");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : "لم يتم اختيار أي ملف");
    onFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="rounded-lg border-2 border-dashed bg-slate-50 p-4">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <Button type="button" onClick={handleButtonClick}>
          اختر ملف
        </Button>
        <span className="text-sm text-muted-foreground">{fileName}</span>
      </div>
      <Input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
