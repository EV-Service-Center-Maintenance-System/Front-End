import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Calendar, Clock, User, Car, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface StaffDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function StaffDashboard({ onNavigate }: StaffDashboardProps) {
  const [appointments] = useState([
    {
      id: "APM-00123",
      customer: "Lê Thị D",
      phone: "090xxxxxxx",
      vehicle: "VinFast VF8 - 51K-123.45",
      service: "Bảo dưỡng pin định kỳ",
      time: "14:00 15/10/2025",
      status: "pending",
    },
    {
      id: "APM-00124",
      customer: "Trần Văn E",
      phone: "091xxxxxxx",
      vehicle: "Hyundai Ioniq5 - 30A-987.65",
      service: "Kiểm tra tổng quát",
      time: "16:00 15/10/2025",
      status: "pending",
    },
    {
      id: "APM-00125",
      customer: "Nguyễn Văn F",
      phone: "092xxxxxxx",
      vehicle: "VinFast VF9 - 29B-111.11",
      service: "Thay lọc gió điều hòa",
      time: "10:00 16/10/2025",
      status: "confirmed",
      technician: "Trần Văn C",
    },
    {
      id: "APM-00126",
      customer: "Phạm Thị G",
      phone: "093xxxxxxx",
      vehicle: "Tesla Model 3 - 51F-222.22",
      service: "Bảo dưỡng tổng quát",
      time: "14:00 14/10/2025",
      status: "in_progress",
      technician: "Lê Văn H",
    },
    {
      id: "APM-00127",
      customer: "Hoàng Văn I",
      phone: "094xxxxxxx",
      vehicle: "VinFast VF8 - 51K-333.33",
      service: "Bảo dưỡng pin định kỳ",
      time: "09:00 13/10/2025",
      status: "completed",
      technician: "Trần Văn C",
    },
  ]);

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: "Chờ xác nhận", variant: "destructive" },
      confirmed: { label: "Đã xác nhận", variant: "default" },
      in_progress: { label: "Đang tiến hành", variant: "secondary" },
      completed: { label: "Hoàn thành", variant: "outline" },
    };
    return statusMap[status] || { label: status, variant: "outline" };
  };

  const filterByStatus = (status: string) => {
    if (status === "all") return appointments;
    return appointments.filter((apt) => apt.status === status);
  };

  const stats = [
    {
      title: "Chờ xác nhận",
      value: filterByStatus("pending").length,
      icon: Clock,
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Đã xác nhận",
      value: filterByStatus("confirmed").length,
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Đang tiến hành",
      value: filterByStatus("in_progress").length,
      icon: Car,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Hoàn thành hôm nay",
      value: filterByStatus("completed").length,
      icon: User,
      color: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý lịch hẹn</h1>
        <p className="text-muted-foreground mt-2">
          Xem và xử lý các lịch hẹn của khách hàng
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách lịch hẹn</CardTitle>
          <CardDescription>
            Tất cả các lịch hẹn trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Chờ xác nhận ({filterByStatus("pending").length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
              <TabsTrigger value="in_progress">Đang tiến hành</TabsTrigger>
              <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
            </TabsList>

            {["pending", "confirmed", "in_progress", "completed"].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã lịch hẹn</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Xe</TableHead>
                        <TableHead>Dịch vụ yêu cầu</TableHead>
                        <TableHead>Thời gian</TableHead>
                        {status !== "pending" && <TableHead>Kỹ thuật viên</TableHead>}
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterByStatus(status).length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={status === "pending" ? 6 : 7}
                            className="text-center text-muted-foreground"
                          >
                            Không có lịch hẹn nào
                          </TableCell>
                        </TableRow>
                      ) : (
                        filterByStatus(status).map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell>
                              <code className="bg-muted px-2 py-1 rounded text-sm">
                                {apt.id}
                              </code>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{apt.customer}</div>
                                <div className="text-sm text-muted-foreground">
                                  {apt.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{apt.vehicle}</TableCell>
                            <TableCell>{apt.service}</TableCell>
                            <TableCell>{apt.time}</TableCell>
                            {status !== "pending" && (
                              <TableCell>{apt.technician || "-"}</TableCell>
                            )}
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  onNavigate("staff-appointment-details", apt)
                                }
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Xem
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
