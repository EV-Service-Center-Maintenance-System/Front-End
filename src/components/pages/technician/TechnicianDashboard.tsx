import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Wrench, Clock, CheckCircle, Car } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface TechnicianDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function TechnicianDashboard({ onNavigate }: TechnicianDashboardProps) {
  const [jobs] = useState([
    {
      id: "APM-00123",
      vehicle: "VinFast VF8 - 51K-123.45",
      service: "Bảo dưỡng pin định kỳ",
      customer: "Lê Thị D",
      status: "pending",
      scheduledTime: "14:00 15/10/2025",
      notes: "Khách hàng yêu cầu kiểm tra kỹ dung lượng pin",
    },
    {
      id: "APM-00124",
      vehicle: "Hyundai Ioniq5 - 30A-987.65",
      service: "Kiểm tra tổng quát",
      customer: "Trần Văn E",
      status: "in_progress",
      scheduledTime: "10:00 15/10/2025",
      startedAt: "10:05 15/10/2025",
    },
    {
      id: "APM-00120",
      vehicle: "Tesla Model 3 - 51F-222.22",
      service: "Thay lọc gió điều hòa",
      customer: "Phạm Thị G",
      status: "completed",
      scheduledTime: "09:00 14/10/2025",
      completedAt: "10:30 14/10/2025",
    },
  ]);

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any; icon: any }> = {
      pending: { label: "Đang chờ", variant: "secondary", icon: Clock },
      in_progress: { label: "Đang tiến hành", variant: "default", icon: Wrench },
      completed: { label: "Đã hoàn thành", variant: "outline", icon: CheckCircle },
    };
    return statusMap[status] || { label: status, variant: "outline", icon: Wrench };
  };

  const pendingCount = jobs.filter((j) => j.status === "pending").length;
  const inProgressCount = jobs.filter((j) => j.status === "in_progress").length;
  const completedToday = jobs.filter((j) => j.status === "completed").length;

  const stats = [
    {
      title: "Đang chờ bắt đầu",
      value: pendingCount,
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Đang tiến hành",
      value: inProgressCount,
      icon: Wrench,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Hoàn thành hôm nay",
      value: completedToday,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Công việc của tôi</h1>
        <p className="text-muted-foreground mt-2">
          Xin chào, KTV Trần Văn C - Danh sách công việc được phân công
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách công việc</CardTitle>
          <CardDescription>
            Tất cả các công việc được phân công cho bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã công việc</TableHead>
                  <TableHead>Xe</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Không có công việc nào
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job) => {
                    const statusInfo = getStatusInfo(job.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <TableRow key={job.id}>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {job.id}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-muted-foreground" />
                            {job.vehicle}
                          </div>
                        </TableCell>
                        <TableCell>{job.service}</TableCell>
                        <TableCell>{job.customer}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{job.scheduledTime}</div>
                            {job.startedAt && (
                              <div className="text-muted-foreground">
                                Bắt đầu: {job.startedAt}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant={job.status === "pending" ? "default" : "outline"}
                            onClick={() => onNavigate("technician-job-details", job)}
                          >
                            {job.status === "pending" ? "Bắt đầu" : "Chi tiết"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
