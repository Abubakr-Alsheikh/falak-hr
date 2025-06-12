import * as React from "react";
import {
  BookOpen,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  Users,
  Building2,
  ListTodo,
  MailQuestion,
  MailPlus,
  File,
  Users2,
  CreditCard,
  TrendingUp,
  Projector,
  MessageCircle,
  View,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

import { NavMain } from "@/components/common/dashboard/layout/nav-main";
import { NavProjects } from "@/components/common/dashboard/layout/nav-projects";
import { NavUser } from "@/components/common/dashboard/layout/nav-user";
import { TeamSwitcher } from "@/components/common/dashboard/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useUserData from "@/hooks/layout/useUserData";

const data = {
  teams: [
    {
      name: "شركة فلك",
      logo: GalleryVerticalEnd,
      plan: "مشروع",
    },
  ],
  navMain: [
    {
      title: "نظرة عامة على النظام",
      url: "#",
      icon: View,
      isActive: true,
      items: [
        {
          title: "لوحة التحكم",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "الشركات",
          url: "/dashboard/companies",
          icon: Building2,
        },
        {
          title: "المستخدمين",
          url: "/dashboard/users",
          icon: Users,
        },
        {
          title: "المشاريع",
          url: "/dashboard/projects",
          icon: Projector,
        },
        {
          title: "المهام",
          url: "/dashboard/tasks",
          icon: ListTodo,
        },
      ],
    },
    {
      title: "التفاعلات",
      url: "#",
      icon: MessageCircle,
      isActive: true,
      items: [
        {
          title: "الاستفسارات",
          url: "/dashboard/inquiries",
          icon: MailQuestion,
        },
        {
          title: "طلبات الاشتراك",
          url: "/dashboard/subscription",
          icon: MailPlus,
        },
        {
          title: "طلبات الخدمات",
          url: "/dashboard/service-requests",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "التوثيق",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "مقدمة",
          url: "#",
          icon: File,
        },
        {
          title: "البدء",
          url: "#",
          icon: File,
        },
        {
          title: "دروس تعليمية",
          url: "#",
          icon: File,
        },
        {
          title: "سجل التغييرات",
          url: "#",
          icon: File,
        },
      ],
    },
    {
      title: "إعدادات",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "عام",
          url: "#",
          icon: File,
        },
        {
          title: "فريق",
          url: "#",
          icon: Users2,
        },
        {
          title: "الفواتير",
          url: "#",
          icon: CreditCard,
        },
        {
          title: "الحدود",
          url: "#",
          icon: TrendingUp,
        },
      ],
    },
  ],
  projects: [
    {
      name: "هندسة التصميم",
      url: "#",
      icon: Frame,
    },
    {
      name: "المبيعات والتسويق",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserData();

  return (
    <Sidebar collapsible="icon" variant="floating" dir="ltr" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
