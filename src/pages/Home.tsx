import React from "react";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import PlanCard from "../components/PlanCard";
import TextContent from "../components/TextContent";
import Button from "../components/Button";
import { BsArrowLeft } from "react-icons/bs";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="relative text-right">
        <div className="mb-4 text-6xl font-bold">فلك للموارد البشرية</div>
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
        <div className="absolute left-0 top-10">
          <Button icon={<BsArrowLeft />} text="أبدا معنا" />
        </div>
      </div>

      <div className="my-8 grid grid-cols-2 gap-6">
        <Card
          title="حساب صاحب عمل"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          buttonText="تسجيل الدخول"
        />
        <Card
          title="حساب موظف"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          buttonText="تسجيل الدخول"
        />
      </div>

      <SectionTitle title="نبذة عن فلك للموارد البشرية" />
      <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />

      <div className="my-8 grid grid-cols-3 gap-6">
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
      </div>

      <SectionTitle title="أسعار باقات الإشتراك" />
      <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />

      <div className="my-8 grid grid-cols-3 gap-6">
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
      </div>
    </div>
  );
};

export default Home;
