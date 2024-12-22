import React from "react";
import Card from "../Card";

const AccountSection: React.FC = () => {
  return (
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
  );
};

export default AccountSection;