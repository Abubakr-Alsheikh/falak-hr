import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import path if needed
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Building2, Users, Projector } from "lucide-react"; // Example Icons

// Sample Data (Replace with your actual data fetching)
const companyData = [
  { name: "شركة أ", value: 3 },
  { name: "شركة ب", value: 5 },
  { name: "شركة ج", value: 2 },
];
const employeeData = [
  { name: "شركة أ", value: 80 },
  { name: "شركة ب", value: 30 },
  { name: "شركة ج", value: 40 },
];

const projectsData = [
  { name: "مكتملة", value: 10 },
  { name: "قيد التنفيذ", value: 25 },
  { name: "متأخرة", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Example colors for the pie chart.

const recentActivities = [
  { user: "محمد", task: "إنشاء ميزة جديدة", type: "task" },
  { user: "عثمان", company: "فلك", type: "employee" },
  { user: "أحمد", task: "تصحيح خطأ برمجي", type: "task" },
  { user: "فاطمة", company: "شركة التقنية", type: "employee" },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">نظرة عامة على لوحة التحكم</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Companies Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              الشركات
            </CardTitle>
            <CardDescription>إحصائيات حول الشركات</CardDescription>
          </CardHeader>
          <CardContent dir="ltr">
            <p className="text-lg font-semibold" dir="rtl">
              إجمالي الشركات: 10
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={companyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="عدد الشركات" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employees Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              الموظفين
            </CardTitle>
            <CardDescription>إحصائيات حول الموظفين</CardDescription>
          </CardHeader>
          <CardContent dir="ltr">
            <p className="text-lg font-semibold" dir="rtl">
              إجمالي الموظفين: 150
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="عدد الموظفين" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Projector className="h-5 w-5" />
              المشاريع
            </CardTitle>
            <CardDescription>حالة المشاريع</CardDescription>
          </CardHeader>
          <CardContent dir="ltr">
            <p className="text-lg font-semibold" dir="rtl">
              المشاريع قيد التقدم: 30
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {projectsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities Card (Stretched to full width) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
            <CardDescription>سجل بآخر الأحداث في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentActivities.map((activity, index) => (
                <li key={index} className="text-sm">
                  {activity.type === "task" ? (
                    <span>
                      تمت المهمة "{activity.task}" بواسطة <b>{activity.user}</b>
                    </span>
                  ) : (
                    <span>
                      تمت إضافة موظف جديد "{activity.user}" إلى شركة "
                      <b>{activity.company}</b>"
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
