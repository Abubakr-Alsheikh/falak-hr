import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AnyApplicationResponse,
  isJobSeeker,
  isTrainee,
  isTrainer,
} from "@/types/subscription";

interface ReadApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: AnyApplicationResponse | null;
}

// Reusable component for displaying a detail field
const DetailField = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 gap-1 border-b py-2 sm:grid-cols-3">
    <dt className="font-semibold text-muted-foreground">{label}:</dt>
    <dd className="sm:col-span-2">
      {value || <span className="text-gray-400">غير متوفر</span>}
    </dd>
  </div>
);

export const ReadApplicationModal: React.FC<ReadApplicationModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  if (!application) return null;

  const renderSpecificFields = () => {
    if (isTrainer(application)) {
      return (
        <>
          <DetailField label="المدينة" value={application.cityRegion} />
          <DetailField label="الجنس" value={application.gender} />
          <DetailField
            label="الدرجة العلمية"
            value={application.educationalDegree}
          />
          <DetailField
            label="نوع التسجيل"
            value={application.registrationType}
          />
          <DetailField label="التخصص" value={application.specialization} />
          <DetailField
            label="فكرة الخدمة"
            value={
              <p className="whitespace-pre-wrap">{application.serviceIdea}</p>
            }
          />
        </>
      );
    }
    if (isTrainee(application)) {
      return (
        <DetailField
          label="المهارات المطلوبة"
          value={
            <p className="whitespace-pre-wrap">{application.skillsToDevelop}</p>
          }
        />
      );
    }
    if (isJobSeeker(application)) {
      return (
        <>
          <DetailField label="المدينة" value={application.cityRegion} />
          <DetailField
            label="الدرجة العلمية"
            value={application.educationalDegree}
          />
          <DetailField label="التخصص" value={application.specialization} />
          <DetailField
            label="سنوات الخبرة"
            value={application.yearsOfExperience}
          />
          <DetailField
            label="مجال العمل المرغوب"
            value={application.desiredWorkField}
          />
          <DetailField
            label="رابط السيرة الذاتية"
            value={
              application.cvLink ? (
                <a
                  href={application.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  فتح الرابط
                </a>
              ) : null
            }
          />
        </>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>تفاصيل الطلب: {application.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <h3 className="mb-2 text-lg font-semibold text-primary">
            المعلومات الأساسية
          </h3>
          <DetailField label="الاسم الكامل" value={application.fullName} />
          <DetailField label="البريد الإلكتروني" value={application.email} />
          <DetailField
            label="رقم الواتساب"
            value={application.whatsappNumber}
          />
          <DetailField
            label="تاريخ الطلب"
            value={format(new Date(application.created_at), "PPPpppp", {
              locale: ar,
            })}
          />
          <DetailField label="كيف سمع عنا" value={application.howHeard} />
          <DetailField
            label="يرغب بالاشعارات"
            value={application.receiveNotifications}
          />

          <h3 className="mb-2 pt-4 text-lg font-semibold text-primary">
            معلومات إضافية
          </h3>
          {renderSpecificFields()}

          <DetailField
            label="ملاحظات"
            value={
              <p className="whitespace-pre-wrap">
                {application.inquiriesNotes}
              </p>
            }
          />
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
