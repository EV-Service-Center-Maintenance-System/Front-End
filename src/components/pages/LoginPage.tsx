import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - determine role based on email
    let role = "Customer";
    if (email.includes("admin")) role = "Admin";
    else if (email.includes("staff")) role = "Staff";
    else if (email.includes("tech")) role = "Technician";
    
    onLogin(email, password, role);
  };

  // Demo accounts for testing
  const demoAccounts = [
    { email: "admin@ev.com", role: "Admin" },
    { email: "staff@ev.com", role: "Staff" },
    { email: "tech@ev.com", role: "Technician" },
    { email: "customer@ev.com", role: "Customer" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">EV</span>
          </div>
          <h1 className="text-2xl font-bold">Chào mừng trở lại</h1>
          <p className="text-muted-foreground mt-2">Đăng nhập vào tài khoản của bạn</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập hệ thống</CardTitle>
            <CardDescription>EV Service Center</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Tên đăng nhập (Email)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm cursor-pointer select-none"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Chưa có tài khoản? </span>
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:underline font-medium"
              >
                Đăng ký
              </button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground mb-3 text-center">
                Tài khoản demo để thử nghiệm:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword("password");
                    }}
                    className="text-xs"
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
