import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { Credentials } from "@/types/auth";
import { ROUTES } from "@/config/routes";
import logo from "@assets/logo.png";
import LoadingScreen from "@/components/common/public/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage: React.FC = () => {
  const { login, isLoading, isAuthenticated, authError, setAuthError } =
    useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);

    const credentials: Credentials = { username, password };

    try {
      await login(credentials, rememberMe);
    } catch (err: any) {
      console.error("Login error:", err);
      setAuthError(
        err.message ||
          "خطأ في اسم المستخدم أو كلمة المرور. يرجى المحاولة مرة أخرى."
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-8 dark:bg-gray-900">
      <div className="flex w-full max-w-4xl flex-col items-center gap-3">
        <Link to={ROUTES.HOME} className="mb-6">
          {" "}
          <img className="h-32" src={logo} alt="logo" />
        </Link>

        <Card className="w-full overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://ui.shadcn.com/placeholder.svg"
                alt="Login illustration"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">تسجيل الدخول إلى حسابك</h1>
                  {authError && (
                    <p className="mt-2 text-sm text-destructive">{authError}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">اسم المستخدم</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="اسم المستخدم"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Link
                        to={ROUTES.FORGOT_PASSWORD}
                        className="text-sm text-primary hover:underline"
                      >
                        هل نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      تذكرني
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    تسجيل الدخول
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link
                      to={ROUTES.REGISTER}
                      className="text-primary hover:underline"
                    >
                      اشتراك
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
