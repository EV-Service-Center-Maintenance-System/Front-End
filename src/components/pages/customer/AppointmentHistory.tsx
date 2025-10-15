import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Eye, Download, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Separator } from "../../ui/separator";

export function AppointmentHistory() {
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const appointments = [
    {
      id: "APM-00125",
      date: "18/10/2025",
      vehicle: "VF8-51K12345",
      service: "Bảo dưỡng pin định kỳ",
      status: "confirmed",
      cost: null,
    },
    {
      id: "APM-00124",
      date: "15/10/2025",
      vehicle: "Ioniq5-30A98765",
      service: "Kiểm tra tổng quát",
      status: "in_progress",
      cost: null,
    },
  ];

  const history = [
    {
      id: "HD-00122",
      date: "01/10/2025",
      vehicle: "VF8-51K12345",
      service: "Bảo dưỡng pin định kỳ",
      cost: "2.000.000đ",
      paid: true,
      serviceFee: "2.000.000đ",
      parts: [],
    },
    {
      id: "HD-00121",
      date: "15/09/2025",
      vehicle: "Ioniq5-30A98765",
      service: "Thay lọc gió điều hòa, Kiểm tra tổng quát",
      cost: "500.000đ",
      paid: true,
      serviceFee: "500.000đ",
      parts: [],
    },
    {
      id: "HD-00120",
      date: "01/09/2025",
      vehicle: "VF8-51K12345",
      service: "Bảo dưỡng tổng quát",
      cost: "3.500.000đ",
      paid: false,
      serviceFee: "2.000.000đ",
      parts: [{ name: "Phanh đĩa trước", qty: 2, price: "3.000.000đ" }],
    },
  ];

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: "Chờ xác nhận", variant: "destructive" },
      confirmed: { label: "Đã xác nhận", variant: "default" },
      in_progress: { label: "Đang tiến hành", variant: "secondary" },
      completed: { label: "Hoàn thành", variant: "outline" },
    };
    return statusMap[status] || { label: status, variant: "outline" };
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDialogOpen(true);
  };

  const formatPrice = (price: string) => {
    if (!price) return "-";
    return price;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lịch hẹn & Lịch sử dịch vụ</h1>
        <p className="text-muted-foreground mt-2">
          Theo dõi lịch hẹn và xem lại lịch sử dịch vụ đã sử dụng
        </p>
      </div>

      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">
            Lịch hẹn hiện tại ({appointments.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Lịch sử dịch vụ ({history.length})
          </TabsTrigger>
        </TabsList>

        {/* Current Appointments */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Lịch hẹn của bạn</CardTitle>
              <CardDescription>
                Các lịch hẹn đang chờ và đang thực hiện
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Bạn chưa có lịch hẹn nào
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã lịch hẹn</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Xe</TableHead>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((apt) => {
                        const statusInfo = getStatusInfo(apt.status);
                        return (
                          <TableRow key={apt.id}>
                            <TableCell>
                              <code className="bg-muted px-2 py-1 rounded text-sm">
                                {apt.id}
                              </code>
                            </TableCell>
                            <TableCell>{apt.date}</TableCell>
                            <TableCell>{apt.vehicle}</TableCell>
                            <TableCell>{apt.service}</TableCell>
                            <TableCell>
                              <Badge variant={statusInfo.variant}>
                                {statusInfo.label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử dịch vụ</CardTitle>
              <CardDescription>
                Tất cả các dịch vụ đã hoàn thành
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã HĐ</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Xe</TableHead>
                      <TableHead>Dịch vụ</TableHead>
                      <TableHead>Tổng chi phí</TableHead>
                      <TableHead>Thanh toán</TableHead>
                      <TableHead className="text-right">Chi tiết</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {item.id}
                          </code>
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.vehicle}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {item.service}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(item.cost)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.paid ? "default" : "destructive"}>
                            {item.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewInvoice(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!item.paid && (
                              <Button size="sm">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Thanh toán
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Hóa đơn dịch vụ {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>
              Ngày: {selectedInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Xe</p>
                  <p className="font-medium">{selectedInvoice.vehicle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <Badge variant={selectedInvoice.paid ? "default" : "destructive"}>
                    {selectedInvoice.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Dịch vụ</h4>
                <p className="text-sm">{selectedInvoice.service}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Phí dịch vụ:</span>
                  <span className="font-medium">{selectedInvoice.serviceFee}</span>
                </div>
              </div>

              {selectedInvoice.parts && selectedInvoice.parts.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Phụ tùng</h4>
                  <div className="space-y-2">
                    {selectedInvoice.parts.map((part: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {part.name} (SL: {part.qty})
                        </span>
                        <span>{part.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-medium">Tổng cộng:</span>
                <span className="text-2xl font-bold">{selectedInvoice.cost}</span>
              </div>

              <p className="text-xs text-muted-foreground">(Đã bao gồm VAT)</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceDialogOpen(false)}>
              Đóng
            </Button>
            <Button variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Tải hóa đơn
            </Button>
            {selectedInvoice && !selectedInvoice.paid && (
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Thanh toán ngay
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
