import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ArrowLeft, CheckCircle, X, User, Car, Calendar, FileText } from "lucide-react";
import { Textarea } from "../../ui/textarea";
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

interface AppointmentDetailsProps {
  appointment: any;
  onBack: () => void;
  onNavigate?: (page: string, data?: any) => void;
}

export function AppointmentDetails({ appointment, onBack, onNavigate }: AppointmentDetailsProps) {
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const technicians = [
    { id: "1", name: "Trần Văn C", status: "Sẵn có" },
    { id: "2", name: "Lê Văn H", status: "Sẵn có" },
    { id: "3", name: "Nguyễn Văn I", status: "Bận" },
  ];

  const handleConfirm = () => {
    // Handle confirm logic
    console.log("Confirmed with technician:", selectedTechnician);
    setShowConfirmDialog(false);
    onBack();
  };

  const handleReject = () => {
    // Handle reject logic
    console.log("Rejected appointment");
    setShowRejectDialog(false);
    onBack();
  };

  const handleFinalize = () => {
    onNavigate?.("staff-appointment-finalize", appointment);
  };

  const isPending = appointment.status === "pending";
  const isCompleted = appointment.status === "completed";
  const isInProgress = appointment.status === "in_progress";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Chi tiết lịch hẹn</h1>
          <p className="text-muted-foreground mt-2">
            Mã: {appointment.id}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Thông tin lịch hẹn</CardTitle>
              <Badge
                variant={
                  appointment.status === "pending"
                    ? "destructive"
                    : appointment.status === "completed"
                    ? "outline"
                    : "default"
                }
              >
                {appointment.status === "pending"
                  ? "Chờ xác nhận"
                  : appointment.status === "confirmed"
                  ? "Đã xác nhận"
                  : appointment.status === "in_progress"
                  ? "Đang tiến hành"
                  : "Hoàn thành"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Khách hàng</p>
                  <p className="font-medium">{appointment.customer}</p>
                  <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Xe</p>
                  <p className="font-medium">{appointment.vehicle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Dịch vụ yêu cầu</p>
                  <p className="font-medium">{appointment.service}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Thời gian mong muốn</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
              </div>

              {appointment.technician && (
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Kỹ thuật viên phụ trách</p>
                    <p className="font-medium">{appointment.technician}</p>
                  </div>
                </div>
              )}
            </div>

            {isPending && (
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-medium">Phân công kỹ thuật viên</h3>
                <div className="space-y-2">
                  <Label htmlFor="technician">Chọn kỹ thuật viên</Label>
                  <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kỹ thuật viên..." />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id} disabled={tech.status === "Bận"}>
                          {tech.name} ({tech.status})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ghi chú cho kỹ thuật viên..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
              <CardDescription>Xử lý lịch hẹn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isPending && (
                <>
                  <Button
                    className="w-full gap-2"
                    onClick={() => setShowConfirmDialog(true)}
                    disabled={!selectedTechnician}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Xác nhận lịch hẹn
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={() => setShowRejectDialog(true)}
                  >
                    <X className="h-4 w-4" />
                    Từ chối
                  </Button>
                </>
              )}

              {isInProgress && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Lịch hẹn đang được xử lý bởi kỹ thuật viên
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Đang tiến hành...
                  </Button>
                </div>
              )}

              {isCompleted && (
                <Button className="w-full" onClick={handleFinalize}>
                  Hoàn tất & Tạo hóa đơn
                </Button>
              )}
            </CardContent>
          </Card>

          {!isPending && (
            <Card>
              <CardHeader>
                <CardTitle>Tiến độ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Đã xác nhận</span>
                  </div>
                  {(isInProgress || isCompleted) && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Đang tiến hành</span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Hoàn thành</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận lịch hẹn?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xác nhận lịch hẹn này và phân công cho kỹ thuật viên đã chọn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Từ chối lịch hẹn?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn từ chối lịch hẹn này? Khách hàng sẽ được thông báo qua email/SMS.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-destructive text-destructive-foreground">
              Từ chối
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
