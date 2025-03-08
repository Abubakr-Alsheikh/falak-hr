import React from "react";
import { Inquiry } from "@/types/inquiry";
import { inquiryService } from "@api/inquiryService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

interface DeleteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: Inquiry | null;
  onConfirm: () => void;
}

const DeleteInquiryModal: React.FC<DeleteInquiryModalProps> = ({
  isOpen,
  onClose,
  inquiry,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    if (!inquiry) return;

    try {
      await inquiryService.deleteInquiry(inquiry.id);
      onConfirm();
      onClose();
    } catch (error: any) {
      console.error("Failed to delete inquiry:", error);
      // Consider displaying an error message to the user using a toast or another UI element
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogDescription>
            {inquiry
              ? `هل أنت متأكد أنك تريد حذف الاستفسار من "${inquiry.name}"؟`
              : "هل أنت متأكد أنك تريد حذف هذا الاستفسار؟"}
          </DialogDescription>
        </DialogHeader>

        {/* Use Shadcn Alert for a consistent warning */}
        <Alert variant="destructive">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertTitle>تحذير!</AlertTitle>
          <AlertDescription>هذا الإجراء لا يمكن التراجع عنه.</AlertDescription>
        </Alert>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm}>
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInquiryModal;
