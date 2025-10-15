import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Car, Calendar, FileText, Plus, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { Progress } from "../../ui/progress";

interface CustomerDashboardProps {
  onNavigate: (page: string) => void;
}

export function CustomerDashboard({ onNavigate }: CustomerDashboardProps) {
  const stats = [
    {
      title: "Xe của tôi",
      value: "2",
      icon: Car,
      action: () => onNavigate("customer-vehicles"),
    },
    {
      title: "Lịch hẹn sắp tới",
      value: "1",
      icon: Calendar,
      action: () => onNavigate("customer-appointments"),
    },
    {
      title: "Dịch vụ đã sử dụng",
      value: "12",
      icon: FileText,
      action: () => onNavigate("customer-history"),
    },
  ];

  const activeService = {
    vehicle: "Hyundai Ioniq5 - 30A-987.65",
    service: "Kiểm tra tổng quát",
    status: "in_progress",
    technician: "Trần Văn C",
    estimatedCompletion: "17:00 15/10/2025",
    progress: 60,
  };

  const upcomingAppointment = {
    id: "APM-00125",
    vehicle: "VinFast VF8 - 51K-123.45",
    service: "Bảo dưỡng pin định kỳ",
    time: "14:00 18/10/2025",
    status: "confirmed",
  };

  const recentServices = [
    {
      date: "01/10/2025",
      vehicle: "VF8-51K12345",
      service: "Bảo dưỡng pin định kỳ",
      cost: "2.000.000đ",
    },
    {
      date: "15/09/2025",
      vehicle: "Ioniq5-30A98765",
      service: "Thay lọc gió điều hòa",
      cost: "500.000đ",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý xe và dịch vụ của bạn
          </p>
        </div>
        <Button onClick={() => onNavigate("customer-book-appointment")} className="gap-2">
          <Plus className="h-4 w-4" />
          Đặt lịch mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={stat.action}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Button variant="link" className="h-auto p-0 text-sm mt-2">
                  Xem chi tiết <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Service */}
      {activeService && (
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Xe đang làm dịch vụ</CardTitle>
                <CardDescription className="mt-2">
                  Theo dõi tiến độ sửa chữa real-time
                </CardDescription>
              </div>
              <Badge variant="default" className="gap-1">
                <Clock className="h-3 w-3" />
                Đang tiến hành
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Xe:</span>
                <span className="font-medium">{activeService.vehicle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dịch vụ:</span>
                <span className="font-medium">{activeService.service}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kỹ thuật viên:</span>
                <span className="font-medium">{activeService.technician}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ước tính hoàn thành:</span>
                <span className="font-medium">{activeService.estimatedCompletion}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tiến độ:</span>
                <span className="font-medium">{activeService.progress}%</span>
              </div>
              <Progress value={activeService.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Appointment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Lịch hẹn sắp tới
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointment ? (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{upcomingAppointment.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {upcomingAppointment.vehicle}
                    </p>
                  </div>
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Đã xác nhận
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{upcomingAppointment.time}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate("customer-appointments")}
                >
                  Xem chi tiết
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  Bạn chưa có lịch hẹn nào
                </p>
                <Button onClick={() => onNavigate("customer-book-appointment")}>
                  Đặt lịch ngay
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Services */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dịch vụ gần đây
              </CardTitle>
              <Button
                variant="link"
                size="sm"
                onClick={() => onNavigate("customer-history")}
              >
                Xem tất cả
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{service.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.date} • {service.vehicle}
                    </p>
                  </div>
                  <p className="font-medium">{service.cost}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("customer-book-appointment")}
            >
              <Calendar className="h-5 w-5" />
              <div className="text-left">
                <div>Đặt lịch dịch vụ</div>
                <div className="text-xs text-muted-foreground">
                  Đặt lịch bảo dưỡng nhanh chóng
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("customer-vehicles")}
            >
              <Car className="h-5 w-5" />
              <div className="text-left">
                <div>Quản lý xe</div>
                <div className="text-xs text-muted-foreground">
                  Thêm hoặc cập nhật thông tin xe
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate("customer-history")}
            >
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div>Lịch sử dịch vụ</div>
                <div className="text-xs text-muted-foreground">
                  Xem lịch sử và hóa đơn
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
