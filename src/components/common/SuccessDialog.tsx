import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  dir?: "rtl" | "ltr";
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  dir = "rtl",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir={dir}>
        <DialogHeader className="flex flex-col items-center text-center">
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="mt-3 text-right text-xl text-muted-foreground">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-center">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              إغلاق
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
