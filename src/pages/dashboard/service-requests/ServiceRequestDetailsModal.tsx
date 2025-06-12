import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceRequest, ServiceRequestStatus } from "@/types/serviceRequest";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Download } from "lucide-react";

interface ServiceRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
}

// Helper for status styling (remains the same)
const statusStyles: Record<
  ServiceRequestStatus,
  { label: string; className: string }
> = {
  pending_review: {
    label: "قيد المراجعة",
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
  approved: {
    label: "تمت الموافقة",
    className: "bg-green-500 hover:bg-green-600",
  },
  rejected: { label: "مرفوض", className: "bg-red-500 hover:bg-red-600" },
  in_progress: {
    label: "قيد التنفيذ",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  completed: { label: "مكتمل", className: "bg-gray-500 hover:bg-gray-600" },
};

// DetailRow and FileLink components remain the same

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center">
    <dt className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-1/3">
      {label}
    </dt>
    <dd className="mt-1 w-full text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:w-2/3">
      {value}
    </dd>
  </div>
);

const FileLink = ({ url, label }: { url: string | null; label: string }) => {
  if (!url) {
    return <span className="text-gray-400">لم يتم الرفع</span>;
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </a>
  );
};

export const ServiceRequestDetailsModal = ({
  isOpen,
  onClose,
  request,
}: ServiceRequestDetailsModalProps) => {
  // --- CHANGE IS HERE ---
  // The <Dialog> component itself is now always rendered.
  // Its visibility is controlled ONLY by the `open` and `onOpenChange` props.
  // We conditionally render the *content* inside to avoid errors when `request` is null.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        {request && (
          <>
            <DialogHeader>
              <DialogTitle>
                تفاصيل طلب الخدمة - {request.companyName}
              </DialogTitle>
              <DialogDescription>
                مراجعة تفاصيل الطلب المقدم من {request.contactPerson}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <dl className="space-y-4">
                <DetailRow
                  label="الحالة"
                  value={
                    <Badge className={statusStyles[request.status].className}>
                      {statusStyles[request.status].label}
                    </Badge>
                  }
                />
                <DetailRow
                  label="نوع الطلب"
                  value={
                    request.requestType === "main_facility"
                      ? "منشأة رئيسية"
                      : "تعديل بيانات"
                  }
                />
                <DetailRow label="اسم الشركة" value={request.companyName} />
                <DetailRow label="جهة الاتصال" value={request.contactPerson} />
                <DetailRow label="البريد الإلكتروني" value={request.email} />
                <DetailRow label="رقم الهاتف" value={request.phone} />
                <DetailRow
                  label="تاريخ التقديم"
                  value={format(
                    new Date(request.created_at),
                    "dd MMMM yyyy, HH:mm",
                    { locale: ar }
                  )}
                />
                <DetailRow
                  label="ملف الشركة"
                  value={
                    request.companyProfile || (
                      <span className="text-gray-400">لا يوجد</span>
                    )
                  }
                />
                <DetailRow
                  label="التراخيص"
                  value={
                    <FileLink url={request.licenses} label="تحميل التراخيص" />
                  }
                />
                <DetailRow
                  label="بيانات المدراء"
                  value={
                    <FileLink
                      url={request.managers}
                      label="تحميل بيانات المدراء"
                    />
                  }
                />
                <DetailRow
                  label="الميزانية"
                  value={
                    <FileLink url={request.balance} label="تحميل الميزانية" />
                  }
                />
              </dl>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
