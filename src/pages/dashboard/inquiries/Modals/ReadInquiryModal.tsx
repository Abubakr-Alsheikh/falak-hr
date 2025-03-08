import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Inquiry } from "@/types/inquiry";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface ReadInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: Inquiry | null;
}

const ReadInquiryModal: React.FC<ReadInquiryModalProps> = ({
  isOpen,
  onClose,
  inquiry,
}) => {
  if (!inquiry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>تفاصيل الاستفسار</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-gray-500">
              الاسم:
            </label>
            <span id="name" className="col-span-3">
              {inquiry.name}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-gray-500">
              البريد الإلكتروني:
            </label>
            <span id="email" className="col-span-3">
              {inquiry.email}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right text-gray-500">
              رقم الهاتف:
            </label>
            <span id="phone" className="col-span-3">
              {inquiry.phone}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="message" className="text-right text-gray-500">
              الرسالة:
            </label>
            <span id="message" className="col-span-3">
              {inquiry.message}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="created_at" className="text-right text-gray-500">
              تاريخ الإنشاء:
            </label>
            <span id="created_at" className="col-span-3">
              {format(new Date(inquiry.created_at), "dd/MM/yyyy HH:mm", {
                locale: ar,
              })}
            </span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">إغلاق</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReadInquiryModal;
