import React from "react";

const DashboardOverview: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        نظرة عامة على لوحة التحكم
      </h1>{" "}
      <p className="text-gray-600 dark:text-gray-400">
        هذا هو الجزء الرئيسي في لوحة التحكم حيث يمكنك عرض ملخص عام للبيانات
        الخاصة بك.
      </p>{" "}
    </div>
  );
};

export default DashboardOverview;
