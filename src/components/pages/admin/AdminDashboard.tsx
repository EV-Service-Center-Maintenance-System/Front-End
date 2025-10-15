import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Package,
  ArrowRight
} from "lucide-react";
import { Badge } from "../../ui/badge";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const stats = [
    {
      title: "Doanh thu tháng",
      value: "150.000.000đ",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Lịch hẹn hoàn thành",
      value: "50",
      change: "+8 so với tháng trước",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Khách hàng mới",
      value: "23",
      change: "+15.3%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Tồn kho phụ tùng",
      value: "127",
      change: "3 sản phẩm sắp hết",
      icon: Package,
      trend: "warning",
    },
  ];

  const alerts = [
    {
      type: "warning",
      title: "Phụ tùng 'Lọc gió điều hòa EV-123' sắp hết hàng",
      description: "Chỉ còn 8 sản phẩm trong kho (ngưỡng tối thiểu: 10)",
      action: "Đề xuất tạo đơn hàng nhập",
    },
    {
      type: "info",
      title: "Dựa trên tần suất sử dụng",
      description: "Nên xem xét nhập thêm 'Dầu làm mát động cơ' cho tháng tới",
      action: "Xem báo cáo chi tiết",
    },
    {
      type: "success",
      title: "Tỷ lệ khách hàng hài lòng tăng",
      description: "98% khách hàng đánh giá 5 sao trong tháng này",
      action: "Xem phản hồi",
    },
  ];

  const popularServices = [
    { name: "Bảo dưỡng pin định kỳ", count: 28, revenue: "56.000.000đ" },
    { name: "Kiểm tra tổng quát", count: 15, revenue: "0đ" },
    { name: "Thay lọc gió điều hòa", count: 12, revenue: "6.000.000đ" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Trang tổng quan</h1>
        <p className="text-muted-foreground mt-2">
          Xin chào, Admin - Chào ngày mới! 🌟
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${
                  stat.trend === "warning" 
                    ? "bg-yellow-100 dark:bg-yellow-900" 
                    : "bg-primary/10"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    stat.trend === "warning"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-primary"
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts & Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cảnh báo & Gợi ý (AI)
          </CardTitle>
          <CardDescription>
            Các thông tin quan trọng và đề xuất thông minh
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className={`mt-0.5 ${
                alert.type === "warning" 
                  ? "text-yellow-600 dark:text-yellow-400"
                  : alert.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}>
                {alert.type === "warning" && <AlertTriangle className="h-5 w-5" />}
                {alert.type === "info" && <TrendingUp className="h-5 w-5" />}
                {alert.type === "success" && <TrendingUp className="h-5 w-5" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={
                    alert.type === "warning" ? "destructive" :
                    alert.type === "success" ? "default" : "secondary"
                  }>
                    {alert.type === "warning" ? "Cảnh báo" : 
                     alert.type === "success" ? "Thành công" : "Thông tin"}
                  </Badge>
                  <span className="font-medium">{alert.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  {alert.action} <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions & Popular Services */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Lối tắt nhanh</CardTitle>
            <CardDescription>Truy cập nhanh các chức năng quan trọng</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("admin-staff")}
            >
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div>Quản lý nhân sự</div>
                <div className="text-xs text-muted-foreground">
                  Thêm, sửa, phân quyền nhân viên
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("admin-services")}
            >
              <Calendar className="h-5 w-5" />
              <div className="text-left">
                <div>Quản lý dịch vụ</div>
                <div className="text-xs text-muted-foreground">
                  CRUD dịch vụ và gói bảo dưỡng
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("admin-parts")}
            >
              <Package className="h-5 w-5" />
              <div className="text-left">
                <div>Quản lý phụ tùng</div>
                <div className="text-xs text-muted-foreground">
                  Quản lý kho và nhập hàng
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardHeader>
            <CardTitle>Dịch vụ phổ biến</CardTitle>
            <CardDescription>Top dịch vụ được sử dụng nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {service.count} lần sử dụng
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{service.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
