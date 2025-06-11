import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ServiceFormData } from "@/pages/public/contact/sections/ServiceRequest";

interface Props {
  formData: ServiceFormData;
  onDataChange: (field: "agreement", value: boolean) => void;
}

const requestTypeLabels: Record<string, string> = {
  main_facility: "فتح ملف منشأة رئيسية",
  branch_facility: "فتح ملف منشأة فرعية",
  modify_data: "تعديل بيانات منشأة",
};

export const Step4Review = ({ formData, onDataChange }: Props) => {
  const getFileName = (file: File | null) => file?.name || "لم يتم إرفاق ملف";

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-sky-700">
        الخطوة الرابعة: المراجعة النهائية والتأكيد
      </h2>
      <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-3 border-b pb-2 text-lg font-semibold">ملخص الطلب</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <p>
            <strong>نوع الطلب:</strong>{" "}
            {requestTypeLabels[formData.requestType] || "غير محدد"}
          </p>
          <p>
            <strong>اسم المنشأة:</strong> {formData.companyName || "لم يدخل"}
          </p>
          <p>
            <strong>اسم المسؤول:</strong> {formData.contactPerson || "لم يدخل"}
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> {formData.email || "لم يدخل"}
          </p>
          <p>
            <strong>رقم الهاتف:</strong> {formData.phone || "لم يدخل"}
          </p>
        </div>
        <div className="pt-4">
          <strong>نبذة عن المنشأة:</strong>
          <p className="mt-1 whitespace-pre-wrap rounded-md bg-white p-3 text-sm text-slate-600">
            {formData.companyProfile || "لا يوجد"}
          </p>
        </div>
        <div className="pt-4">
          <strong>الملفات المرفقة:</strong>
          <ul className="mt-1 list-disc space-y-1 pr-5 text-sm text-slate-600">
            <li>
              التراخيص: <span>{getFileName(formData.licenses)}</span>
            </li>
            <li>
              بيانات المدراء: <span>{getFileName(formData.managers)}</span>
            </li>
            {formData.requestType !== "modify_data" && (
              <li>
                الرصيد الافتتاحي: <span>{getFileName(formData.balance)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="agreement"
            checked={formData.agreement}
            onCheckedChange={(checked) => onDataChange("agreement", !!checked)}
          />
          <label
            htmlFor="agreement"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            لقد اطلعت وأوافق على
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="h-auto px-1 py-0">
                  اتفاقية تزويد الخدمة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>بنود اتفاقية تزويد الخدمة</DialogTitle>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto py-4 text-sm leading-relaxed text-slate-700">
                  {/* Agreement content here */}
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>
                      <strong>النطاق والخدمات:</strong> يوافق الطرف الأول
                      (العميل) على أن يتلقى الخدمات الموضحة في طلب الخدمة هذا من
                      الطرف الثاني (مقدم الخدمة)، وذلك وفقاً للشروط والأحكام
                      المذكورة.
                    </li>
                    <li>
                      <strong>الرسوم والدفع:</strong> يتم تحديد الرسوم المستحقة
                      مقابل الخدمات في عرض الأسعار المقدم للعميل، ويتم الدفع
                      وفقاً للمواعيد والشروط المتفق عليها.
                    </li>
                    <li>
                      <strong>السرية وحماية البيانات:</strong> يلتزم مقدم الخدمة
                      بالحفاظ على سرية جميع المعلومات والبيانات التي يتم الحصول
                      عليها من العميل، وعدم الكشف عنها لأي طرف ثالث إلا بموافقة
                      خطية من العميل أو بموجب القانون.
                    </li>
                    <li>
                      <strong>المسؤولية والضمانات:</strong> يقدم مقدم الخدمة
                      خدماته بأقصى درجات العناية المهنية، ولا يتحمل المسؤولية عن
                      أي خسائر غير مباشرة أو تبعية تنجم عن استخدام الخدمات.
                    </li>
                    <li>
                      <strong>إنهاء الاتفاقية:</strong> يجوز لأي من الطرفين
                      إنهاء هذه الاتفاقية بإشعار خطي مسبق وفقاً للمدة المتفق
                      عليها، في حال عدم التزام الطرف الآخر ببنود الاتفاقية.
                    </li>
                    <li>
                      <strong>القانون الحاكم وحل النزاعات:</strong> تخضع هذه
                      الاتفاقية لقوانين المملكة العربية السعودية، وتتم تسوية أي
                      نزاعات تنشأ عن هذه الاتفاقية ودياً، وفي حال عدم التوصل إلى
                      تسوية، يتم اللجوء إلى المحاكم المختصة.
                    </li>
                    <li>
                      <strong>التعديلات:</strong> لا تعتبر أي تعديلات على هذه
                      الاتفاقية سارية المفعول إلا إذا تمت كتابتها ووقع عليها
                      الطرفان.
                    </li>
                  </ol>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      إغلاق
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            .
          </label>
        </div>
      </div>
    </div>
  );
};
