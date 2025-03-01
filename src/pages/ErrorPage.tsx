import Button from "@/components/common/public/Button";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="mt-2 text-2xl font-medium text-gray-700">
            الصفحة غير موجودة
          </p>
          <div className="divider"></div>
          <p className="mt-4 text-gray-600">
            يبدو أن الصفحة التي كنت تبحث عنها قد تم نقلها، أو حذفها، أو أنها لم
            تكن موجودة من الأساس. يمكنك العودة إلى الصفحة الرئيسية أو استخدام
            البحث للعثور على ما تبحث عنه.
          </p>
        </div>
        <div>
          <Link to="/">
            <Button
              text="العودة إلى الصفحة الرئيسية"
              className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
