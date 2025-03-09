import React, { useState } from "react";
import subscriptionService from "@api/subscriptionService";
import { SubscriptionRequest } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import LoadingScreen from "@/components/common/public/LoadingScreen";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import * as Tooltip from "@radix-ui/react-tooltip";

interface SubscriptionFormProps {
  onSuccess?: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSuccess }) => {
  const [userType, setUserType] = useState<"employer" | "manager">("employer");
  const [subscriptionType, setSubscriptionType] = useState<
    "basic" | "silver" | "gold"
  >("basic");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearForm = () => {
    setUserType("employer");
    setSubscriptionType("basic");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCompanyName("");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData: SubscriptionRequest = {
      user_type: userType,
      subscription_type: subscriptionType,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      company_name: companyName,
      message,
    };

    try {
      const response = await subscriptionService.createSubscriptionRequest(
        formData
      );
      setSuccessMessage("تم إرسال طلب الاشتراك بنجاح!");
      clearForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        let errorMsg = "";
        for (const field in err.response.data.errors) {
          err.response.data.errors[field].forEach((errorDetail: string) => {
            errorMsg += `- ${field}: ${errorDetail}\n`;
          });
        }
        setError(errorMsg);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Card dir="rtl">
      <CardHeader className="text-right">
        <CardTitle>نموذج الاشتراك</CardTitle>
        <CardDescription>
          املأ النموذج لإنشاء طلب اشتراك. يرجى التأكد من إدخال جميع المعلومات
          المطلوبة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {" "}
          {/* Increased spacing */}
          {successMessage && (
            <Alert>
              <AlertTitle>نجاح!</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>خطأ</AlertTitle>
              <AlertDescription>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            {" "}
            {/* Increased spacing within sections */}
            <Separator />
            <h3 className="text-lg font-semibold">معلومات المستخدم</h3>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_type">نوع المستخدم:</Label>
                <Select
                  onValueChange={(value) =>
                    setUserType(value as "employer" | "manager")
                  }
                  defaultValue={userType}
                >
                  <Tooltip.Provider delayDuration={200}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <SelectTrigger id="user_type">
                          <SelectValue placeholder="اختر نوع المستخدم" />
                        </SelectTrigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-popover text-popover-foreground"
                          sideOffset={5}
                        >
                          اختر نوع المستخدم (صاحب عمل أو مدير)
                          <Tooltip.Arrow className="fill-current" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>

                  <SelectContent>
                    <SelectItem value="employer">صاحب عمل</SelectItem>
                    <SelectItem value="manager">مدير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscription_type">نوع الاشتراك:</Label>
                <Select
                  onValueChange={(value) =>
                    setSubscriptionType(value as "basic" | "silver" | "gold")
                  }
                  defaultValue={subscriptionType}
                >
                  <Tooltip.Provider delayDuration={200}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <SelectTrigger id="subscription_type">
                          <SelectValue placeholder="اختر نوع الاشتراك" />
                        </SelectTrigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-popover text-popover-foreground"
                          sideOffset={5}
                        >
                          اختر نوع الاشتراك (أساسي، فضي، أو ذهبي)
                          <Tooltip.Arrow className="fill-current" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <SelectContent>
                    <SelectItem value="basic">أساسي</SelectItem>
                    <SelectItem value="silver">فضي</SelectItem>
                    <SelectItem value="gold">ذهبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Separator />
            <h3 className="text-lg font-semibold">المعلومات الشخصية</h3>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">الاسم الأول:</Label>
                <Input
                  type="text"
                  id="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="أدخل اسمك الأول"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">اسم العائلة:</Label>
                <Input
                  type="text"
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="أدخل اسم العائلة"
                  className="text-right"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني:</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="أدخل بريدك الإلكتروني"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">رقم الهاتف:</Label>
              <Input
                type="tel"
                id="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="أدخل رقم هاتفك"
                className="text-right"
              />
            </div>
          </div>
          <div className="space-y-4">
            <Separator />
            <h3 className="text-lg font-semibold">معلومات الشركة</h3>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="company_name">اسم الشركة:</Label>
              <Input
                type="text"
                id="company_name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="أدخل اسم شركتك"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">الرسالة:</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="أدخل رسالتك (اختياري)"
                rows={4}
                className="resize-none text-right"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start gap-2">
        <Button type="submit" onClick={handleSubmit}>
          إرسال الطلب
        </Button>
        <Link to="/">
          <Button variant="outline">عودة</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionForm;
