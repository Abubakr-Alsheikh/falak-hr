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
import { SubscriptionResponse } from "@/types/subscription";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface ReadSubscriptionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionResponse | null;
}

const ReadSubscriptionRequestModal: React.FC<
  ReadSubscriptionRequestModalProps
> = ({ isOpen, onClose, subscription }) => {
  if (!subscription) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>تفاصيل طلب الاشتراك</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-gray-500">
              الاسم:
            </label>
            <span id="name" className="col-span-3">
              {subscription.first_name} {subscription.last_name}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-gray-500">
              البريد الإلكتروني:
            </label>
            <span id="email" className="col-span-3">
              {subscription.email}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="user-type" className="text-right text-gray-500">
              نوع المستخدم:
            </label>
            <span id="user-type" className="col-span-3">
              {subscription.user_type_display}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="subscription-type"
              className="text-right text-gray-500"
            >
              نوع الاشتراك:
            </label>
            <span id="subscription-type" className="col-span-3">
              {subscription.subscription_type_display}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="request_date" className="text-right text-gray-500">
              تاريخ الإنشاء:
            </label>
            <span id="created_at" className="col-span-3">
              {format(new Date(subscription.request_date), "dd/MM/yyyy HH:mm", {
                locale: ar,
              })}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right text-gray-500">
              الحالة:
            </label>
            <span id="status" className="col-span-3 flex items-center">
              {subscription.is_processed ? (
                <>
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  <span>تمت معالجته</span>
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-4 w-4 text-red-500" />
                  <span>قيد الانتظار</span>
                </>
              )}
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

export default ReadSubscriptionRequestModal;
