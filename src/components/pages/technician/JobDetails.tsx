import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ArrowLeft, Play, Pause, CheckCircle, Car, User, FileText, Calendar } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

interface JobDetailsProps {
  job: any;
  onBack: () => void;
}

export function JobDetails({ job, onBack }: JobDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [notes, setNotes] = useState(job.notes || "");
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const handleStart = () => {
    setCurrentStatus("in_progress");
  };

  const handlePause = () => {
    setCurrentStatus("paused");
  };

  const handleComplete = () => {
    setShowCompleteDialog(true);
  };

  const confirmComplete = () => {
    setCurrentStatus("completed");
    setShowCompleteDialog(false);
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any; color: string }> = {
      pending: { label: "Đang chờ", variant: "secondary", color: "bg-yellow-500" },
      in_progress: { label: "Đang tiến hành", variant: "default", color: "bg-blue-500" },
      paused: { label: "Tạm dừng", variant: "destructive", color: "bg-orange-500" },
      completed: { label: "Đã hoàn thành", variant: "outline", color: "bg-green-500" },
    };
    return statusMap[status] || { label: status, variant: "outline", color: "bg-gray-500" };
  };

  const statusInfo = getStatusInfo(currentStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Chi tiết công việc</h1>
          <p className="text-muted-foreground mt-2">
            Mã: {job.id}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Thông tin công việc</CardTitle>
              <Badge variant={statusInfo.variant}>
                {statusInfo.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Xe</p>
                  <p className="font-medium">{job.vehicle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Dịch vụ</p>
                  <p className="font-medium">{job.service}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Khách hàng</p>
                  <p className="font-medium">{job.customer}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Thời gian đặt lịch</p>
                  <p className="font-medium">{job.scheduledTime}</p>
                </div>
              </div>

              {job.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Ghi chú từ Staff</p>
                    <p className="font-medium">{job.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="techNotes">Ghi chú kỹ thuật (tùy chọn)</Label>
                <Textarea
                  id="techNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú về quá trình sửa chữa, tình trạng xe..."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật trạng thái</CardTitle>
              <CardDescription>Quản lý tiến độ công việc</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentStatus === "pending" && (
                <Button className="w-full gap-2" onClick={handleStart}>
                  <Play className="h-4 w-4" />
                  Bắt đầu công việc
                </Button>
              )}

              {currentStatus === "in_progress" && (
                <>
                  <Button className="w-full gap-2" onClick={handleComplete}>
                    <CheckCircle className="h-4 w-4" />
                    Đã hoàn thành
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={handlePause}>
                    <Pause className="h-4 w-4" />
                    Tạm dừng
                  </Button>
                </>
              )}

              {currentStatus === "paused" && (
                <Button className="w-full gap-2" onClick={handleStart}>
                  <Play className="h-4 w-4" />
                  Tiếp tục
                </Button>
              )}

              {currentStatus === "completed" && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Công việc đã hoàn thành
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Staff sẽ xử lý tiếp
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {currentStatus !== "pending" && (
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className={`h-2 w-2 rounded-full ${statusInfo.color} mt-1.5`}></div>
                    <div className="flex-1">
                      <p className="font-medium">Được phân công</p>
                      <p className="text-muted-foreground">{job.scheduledTime}</p>
                    </div>
                  </div>
                  {(currentStatus === "in_progress" || currentStatus === "completed") && (
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div className="flex-1">
                        <p className="font-medium">Đã bắt đầu</p>
                        <p className="text-muted-foreground">
                          {job.startedAt || "10:05 15/10/2025"}
                        </p>
                      </div>
                    </div>
                  )}
                  {currentStatus === "completed" && (
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                      <div className="flex-1">
                        <p className="font-medium">Hoàn thành</p>
                        <p className="text-muted-foreground">
                          {new Date().toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Complete Confirmation Dialog */}
      <AlertDialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hoàn thành?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn đã hoàn thành công việc này? Sau khi xác nhận, Staff sẽ tiếp nhận để tạo hóa đơn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmComplete}>
              Xác nhận hoàn thành
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
