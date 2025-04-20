// src/pages/public/about/sections/CeoMessage.tsx
import React from "react";
import ceoImage from "@assets/AboutPage/ceo-image.jpg";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
// Optional: If using icons, import them (e.g., from Heroicons)
import {
  CheckCircleIcon,
  SparklesIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  AdjustmentsHorizontalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

interface CeoMessageProps {
  ceoName: string;
  ceoTitle: string;
  ceoImageUrl?: string;
  accentColor?: string; // Optional: Pass a Tailwind color class like 'blue-600' or 'primary'
}

const CeoMessage: React.FC<CeoMessageProps> = ({
  ceoName,
  ceoTitle,
  ceoImageUrl = ceoImage,
  accentColor = "primary-600", // Default accent color
}) => {
  // Helper function to apply accent color dynamically
  const getAccentTextColor = () => `text-${accentColor}`;
  const getAccentBgColor = () => `bg-${accentColor}`;
  const getAccentBorderColor = () => `border-${accentColor}`;

  return (
    // Use FadeIn for the whole section
    <FadeIn direction="up" duration={0.6}>
      {/* --- Main Container --- */}
      {/* Removed border, use subtle background, more padding, consistent margins */}
      <div className="mx-auto mb-16 max-w-7xl rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-50 px-6 py-16 shadow-xl sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          {" "}
          {/* Constrain inner content width */}
          {/* --- Header Section --- */}
          <div className="mb-12 text-center lg:mb-16">
            <h2
              className={`mb-3 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl`}
            >
              كلمة الرئيس التنفيذي
            </h2>
            <p className="text-xl font-medium text-slate-700 lg:text-2xl">
              فلك- استثمار في رأس المال البشري، استثمار في المستقبل
            </p>
            {/* Optional: Subtle divider */}
            <div
              className={`mx-auto mt-6 h-1 w-24 rounded-full ${getAccentBgColor()} opacity-50`}
            ></div>
          </div>
          {/* --- Main Content Section (CEO + Intro Message) --- */}
          {/* Increased gap, vertical alignment */}
          <div className="grid grid-cols-1 items-center gap-10 align-middle md:grid-cols-2 lg:gap-16">
            {/* CEO Image and Info - Right Side */}
            <SlideIn direction="right" delay={0.1} duration={0.6}>
              <div className="flex flex-col items-center justify-center text-center">
                {ceoImageUrl && (
                  <div
                    className={`mb-6 h-56 w-56 overflow-hidden rounded-full shadow-lg ring-4 ring-white ring-offset-4 ring-offset-gray-100 sm:h-64 sm:w-64 lg:h-72 lg:w-72 ${getAccentBorderColor()}`}
                  >
                    <img
                      src={ceoImageUrl}
                      alt={`صورة ${ceoName}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-2xl font-semibold text-slate-800">
                    {ceoName}
                  </p>
                  <p className="text-lg text-slate-600">{ceoTitle}</p>
                </div>
              </div>
            </SlideIn>

            {/* Message Content - Left Side */}
            <SlideIn direction="left" delay={0.1} duration={0.6}>
              {/* Adjusted text size and line height for better readability */}
              <div className="text-right text-lg leading-relaxed text-slate-700 lg:text-xl lg:leading-loose">
                <p className="mb-5">
                  أهلاً وسهلاً بكم في الموقع الإلكتروني لشركة فلك للموارد
                  البشرية.
                </p>
                <p>
                  يسرني أن أرحب بكم، شركاءنا المستقبليين، في هذا الفضاء الرقمي
                  الذي يعكس رؤيتنا الطموحة والتزامنا الراسخ بقيادة التغيير في
                  قطاع الموارد البشرية.
                </p>
              </div>
            </SlideIn>
          </div>
          {/* --- Sections Divider --- */}
          <div className="my-8 h-px bg-gray-200"></div>
          {/* --- Vision Section --- */}
          <SlideIn direction="up" delay={0.2} duration={0.6}>
            {/* Cleaner card style: less shadow, maybe a subtle border */}
            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
              <h3 className="mb-4 text-2xl font-semibold text-slate-800">
                رؤيتنا
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-slate-600 lg:text-lg lg:leading-relaxed">
                <p>
                  في فلك، نؤمن بأن رأس المال البشري هو أثمن أصول أي مؤسسة،
                  والمحرك الحقيقي للنمو المستدام. ومن هذا المنطلق، نضع نصب
                  أعيننا تمكين الشركات والمؤسسات من تحقيق أقصى إمكاناتها من خلال
                  حلول مبتكرة وفعالة في إدارة المواهب وتطوير الأداء.
                </p>
                <p>
                  إننا لا ننظر إلى الموارد البشرية كمجرد وظيفة إدارية، بل كشراكة
                  استراتيجية تسهم في تحقيق الأهداف المؤسسية، وتعزز القدرة
                  التنافسية، وتبني ثقافة مؤسسية إيجابية ومحفزة.
                </p>
              </div>
            </div>
          </SlideIn>
          {/* --- Why Falak Section --- */}
          <SlideIn direction="up" delay={0.3} duration={0.6}>
            <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
              <h3 className="mb-6 text-2xl font-semibold text-slate-800">
                لماذا فلك
              </h3>
              <p className="mb-8 text-base leading-relaxed text-slate-600 lg:text-lg lg:leading-relaxed">
                فلك ليست مجرد شركة خدمات موارد بشرية تقليدية. نحن نقدم قيمة
                مضافة فريدة للشركات من خلال:
              </p>
              {/* Improved grid layout for points, removed nested boxes */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {/* Point 1: Innovation */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  {" "}
                  {/* space-x-reverse for RTL */}
                  {/* Optional Icon */}
                  <SparklesIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      الريادة الابتكارية
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      نسعى باستمرار لتطوير حلول مبتكرة تعتمد على أحدث التقنيات
                      وأفضل الممارسات العالمية.
                    </p>
                  </div>
                </div>
                {/* Point 2: Growth */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <ArrowTrendingUpIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      النمو المستدام
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      نحقق نمواً مطرداً ومستداماً من خلال التوسع الاستراتيجي في
                      أسواق واعدة وتنويع خدماتنا.
                    </p>
                  </div>
                </div>
                {/* Point 3: Professionalism */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <UserGroupIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      الإدارة الاحترافية
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      نعتمد على فريق قيادي ذي خبرة وكفاءة عالية، ملتزم بتحقيق
                      أعلى معايير الحوكمة والشفافية.
                    </p>
                  </div>
                </div>
                {/* Point 4: Return */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <HandThumbUpIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      العائد المالي
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      نقدم فرصاً استثمارية واعدة بعوائد مجزية على المدى الطويل،
                      مدفوعة بنمو القطاع وطلب السوق المتزايد على حلول الموارد
                      البشرية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
          {/* --- Future Strategy Section --- */}
          {/* Similar improvements as "Why Falak" */}
          <SlideIn direction="up" delay={0.4} duration={0.6}>
            <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
              <h3 className="mb-6 text-2xl font-semibold text-slate-800">
                استراتيجيتنا للمستقبل
              </h3>
              <p className="mb-8 text-base leading-relaxed text-slate-600 lg:text-lg lg:leading-relaxed">
                نحن ماضون في تنفيذ استراتيجية طموحة ترتكز على:
              </p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {/* Point 1: Expansion */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <GlobeAltIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      التوسع الجغرافي
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      زيادة تواجدنا في الأسواق الإقليمية والدولية.
                    </p>
                  </div>
                </div>
                {/* Point 2: Digital */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <ComputerDesktopIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      التحول الرقمي
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      تطوير منصات رقمية متقدمة لتقديم خدماتنا بكفاءة وفعالية
                      أكبر.
                    </p>
                  </div>
                </div>
                {/* Point 3: Diversification */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <AdjustmentsHorizontalIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      تنويع الخدمات
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      إضافة خدمات جديدة ومبتكرة تلبي احتياجات عملائنا المتغيرة.
                    </p>
                  </div>
                </div>
                {/* Point 4: Partnerships */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <CheckCircleIcon
                    className={`h-8 w-8 flex-shrink-0 ${getAccentTextColor()}`}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-semibold text-slate-800">
                      الشراكات الاستراتيجية
                    </h4>
                    <p className="text-sm text-slate-600 lg:text-base">
                      بناء تحالفات استراتيجية مع شركات رائدة في مجالات ذات صلة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
          {/* --- Closing Message --- */}
          <SlideIn direction="up" delay={0.5} duration={0.6}>
            {/* Add more top margin for separation */}
            <div className="mt-16 text-center lg:mt-20">
              <div className="space-y-5 text-base leading-relaxed text-slate-600 lg:text-lg lg:leading-relaxed">
                <p>
                  إننا ندعوكم، الشركاء الطموحين، للانضمام إلينا في هذه الرحلة
                  المثيرة، والمساهمة في بناء مستقبل أفضل لعالم الأعمال. نحن على
                  ثقة بأن فلك تمثل فرصة استثمارية فريدة ومجزية، وقصة نجاح تستحق
                  أن تكونوا جزءاً منها.
                </p>
                <p>
                  تفضلوا باستكشاف موقعنا الإلكتروني لمعرفة المزيد عن فرص
                  الاستثمار في فلك ، ولا تترددوا في التواصل معنا لمناقشة إمكانية
                  الشراكة.
                </p>
              </div>
              {/* Make the final thanks stand out a bit more */}
              <p className="mt-8 text-lg font-semibold text-slate-800 lg:text-xl">
                شكراً لكم، ونتطلع إلى الترحيب بكم في أسرة فلك.
              </p>
            </div>
          </SlideIn>
        </div>{" "}
        {/* End inner content constrainer */}
      </div>{" "}
      {/* End Main Container */}
    </FadeIn>
  );
};

export default CeoMessage;
