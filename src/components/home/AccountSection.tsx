import React from "react";
import AccountCard from "../AccountCard";

const AccountSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <AccountCard
            title="حساب صاحب عمل"
            description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
            buttonText="تسجيل الدخول"
            backgroundImage="https://placehold.co/500x500"
          />
          <AccountCard
            title="حساب موظف"
            description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
            buttonText="تسجيل الدخول"
            backgroundImage="https://placehold.co/500x500"
          />
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
