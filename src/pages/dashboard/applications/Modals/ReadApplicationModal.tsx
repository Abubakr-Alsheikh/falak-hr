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

// Reusable component for displaying a detail field (no changes needed, it's good)
const DetailField = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 items-center gap-2 py-2 sm:grid-cols-3 sm:gap-4">
    <dt className="text-right font-semibold text-muted-foreground sm:col-span-1">
      {label}:
    </dt>
    <dd className="col-span-2 text-foreground">
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
            label="نبذة عن الحقيبة التدريبية"
            value={
              <p className="whitespace-pre-wrap">
                {application.trainingPackageBrief}
              </p>
            }
          />
          <DetailField
            label="نبذة عن شرائح العملاء"
            value={
              <p className="whitespace-pre-wrap">
                {application.clientSegmentsBrief}
              </p>
            }
          />
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
      <DialogContent
        className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle>تفاصيل الطلب: {application.fullName}</DialogTitle>
          {/* Optional: Add a brief description if needed */}
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          {" "}
          {/* Added max-h and overflow-y-auto */}
          <h3 className="mb-2 text-lg font-semibold text-primary">
            المعلومات الأساسية
          </h3>
          <div className="space-y-2 p-4">
            {" "}
            {/* Added grouping for basic info */}
            <DetailField label="الاسم الكامل" value={application.fullName} />
            <DetailField label="البريد الإلكتروني" value={application.email} />
            <DetailField
              label="رقم الواتساب"
              value={application.whatsappNumber}
            />
            <DetailField
              label="الفئة العمرية"
              value={application.ageCategory}
            />
            <DetailField label="الجنسية" value={application.nationality} />
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
          </div>
          <h3 className="mb-2 mt-6 text-lg font-semibold text-primary">
            معلومات إضافية
          </h3>
          <div className="space-y-2 p-4">
            {" "}
            {/* Added grouping for specific info */}
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
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default">إغلاق</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
