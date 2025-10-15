import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Badge } from "../../ui/badge";
import { Search, Eye, CheckCircle, Printer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

export function InvoicesManagement() {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentNote, setPaymentNote] = useState("");

  const [invoicesList, setInvoicesList] = useState([
    {
      id: "HD-00123",
      customer: "Lê Thị D",
      vehicle: "VF8-51K12345",
      total: "2.800.000",
      date: "15/10/2025",
      status: "unpaid",
      services: "Bảo dưỡng pin định kỳ",
      parts: [{ name: "Dầu làm mát động cơ", qty: 1, price: "800.000" }],
    },
    {
      id: "HD-00122",
      customer: "Trần Văn E",
      vehicle: "Ioniq5-30A98765",
      total: "500.000",
      date: "14/10/2025",
      status: "paid",
      services: "Thay lọc gió điều hòa",
      parts: [],
      paymentMethod: "VietQR",
    },
    {
      id: "HD-00121",
      customer: "Nguyễn Văn F",
      vehicle: "VF9-29B11111",
      total: "3.500.000",
      date: "13/10/2025",
      status: "paid",
      services: "Bảo dưỡng tổng quát",
      parts: [
        { name: "Phanh đĩa trước", qty: 2, price: "3.000.000" },
      ],
      paymentMethod: "Tiền mặt",
    },
  ]);

  const handleMarkAsPaid = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPaymentMethod("cash");
    setPaymentNote("");
    setIsPaymentDialogOpen(true);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const confirmPayment = () => {
    if (selectedInvoice) {
      setInvoicesList((prev) =>
        prev.map((inv) =>
          inv.id === selectedInvoice.id
            ? {
                ...inv,
                status: "paid",
                paymentMethod:
                  paymentMethod === "cash"
                    ? "Tiền mặt"
                    : paymentMethod === "transfer"
                    ? "Chuyển khoản"
                    : paymentMethod,
              }
            : inv
        )
      );
    }
    setIsPaymentDialogOpen(false);
  };

  const filteredInvoices = (status: string) => {
    let filtered = invoicesList;
    
    if (status !== "all") {
      filtered = filtered.filter((inv) => inv.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(
        (inv) =>
          inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(parseInt(price));
  };

  const unpaidCount = invoicesList.filter((inv) => inv.status === "unpaid").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý hóa đơn</h1>
          <p className="text-muted-foreground mt-2">
            Theo dõi và quản lý thanh toán hóa đơn
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách hóa đơn</CardTitle>
              <CardDescription>
                Tổng số: {invoicesList.length} hóa đơn
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                Tất cả ({invoicesList.length})
              </TabsTrigger>
              <TabsTrigger value="unpaid">
                Chưa thanh toán ({unpaidCount})
              </TabsTrigger>
              <TabsTrigger value="paid">
                Đã thanh toán ({invoicesList.length - unpaidCount})
              </TabsTrigger>
            </TabsList>

            {["all", "unpaid", "paid"].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã HĐ</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Xe</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices(status).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            Không có hóa đơn nào
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInvoices(status).map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              <code className="bg-muted px-2 py-1 rounded">
                                {invoice.id}
                              </code>
                            </TableCell>
                            <TableCell>{invoice.customer}</TableCell>
                            <TableCell>{invoice.vehicle}</TableCell>
                            <TableCell className="font-medium">
                              {formatPrice(invoice.total)}
                            </TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  invoice.status === "paid" ? "default" : "destructive"
                                }
                              >
                                {invoice.status === "paid"
                                  ? "Đã thanh toán"
                                  : "Chưa thanh toán"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewInvoice(invoice)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {invoice.status === "unpaid" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleMarkAsPaid(invoice)}
                                  >
                                    Ghi nhận TT
                                  </Button>
                                )}
                              </div>
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

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận thanh toán hóa đơn</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.id} - {formatPrice(selectedInvoice?.total || "0")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Phương thức thanh toán</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Tiền mặt</SelectItem>
                  <SelectItem value="transfer">Chuyển khoản</SelectItem>
                  <SelectItem value="card">Thẻ ATM/Visa</SelectItem>
                  <SelectItem value="momo">Ví Momo</SelectItem>
                  <SelectItem value="zalopay">ZaloPay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Input
                id="note"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Ghi chú về thanh toán (tùy chọn)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={confirmPayment}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết hóa đơn {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>
              Ngày tạo: {selectedInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Khách hàng</p>
                  <p className="font-medium">{selectedInvoice.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Xe</p>
                  <p className="font-medium">{selectedInvoice.vehicle}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Dịch vụ</h4>
                <p>{selectedInvoice.services}</p>
              </div>

              {selectedInvoice.parts.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Phụ tùng sử dụng</h4>
                  <div className="space-y-2">
                    {selectedInvoice.parts.map((part: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {part.name} (SL: {part.qty})
                        </span>
                        <span>{formatPrice(part.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="text-xl font-bold">
                    {formatPrice(selectedInvoice.total)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <Badge
                      variant={
                        selectedInvoice.status === "paid" ? "default" : "destructive"
                      }
                    >
                      {selectedInvoice.status === "paid"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </Badge>
                  </div>
                  {selectedInvoice.paymentMethod && (
                    <div>
                      <p className="text-sm text-muted-foreground">Phương thức</p>
                      <p className="font-medium">{selectedInvoice.paymentMethod}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Đóng
            </Button>
            <Button variant="secondary">
              <Printer className="h-4 w-4 mr-2" />
              In hóa đơn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
