import React from 'react';

const DashboardOverview: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">نظرة عامة على لوحة التحكم</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">الشركات</h2>
                    <p className="text-gray-600">
                         إجمالي الشركات: 10 {/* Replace with dynamic data */}
                    </p>
                    {/* Add more content/charts for companies */}
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">الموظفين</h2>
                    <p className="text-gray-600">
                         إجمالي الموظفين: 150 {/* Replace with dynamic data */}
                    </p>
                    {/* Add more content/charts for employees */}
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">المهام</h2>
                    <p className="text-gray-600">
                         المهام قيد التقدم: 25 {/* Replace with dynamic data */}
                    </p>
                    {/* Add more content/charts for tasks */}
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">النشاطات الأخيرة</h2>
                    <ul className="list-inside list-disc">
                        <li>تمت المهمة "إنشاء ميزة جديدة" بواسطة محمد</li>
                        <li>تمت إضافة موظفة جديدة "عثمان" إلى شركة "فلك"</li>
                        {/* Add more recent activity items */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;