import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ArrowLeft, Plus, Trash2, Receipt } from "lucide-react";
import { Separator } from "../../ui/separator";

interface AppointmentFinalizeProps {
  appointment: any;
  onBack: () => void;
}

export function AppointmentFinalize({ appointment, onBack }: AppointmentFinalizeProps) {
  const [selectedParts, setSelectedParts] = useState<any[]>([
    { id: 1, name: "Dầu làm mát động cơ", code: "DLM-456", price: 800000, quantity: 1 },
  ]);
  const [newPart, setNewPart] = useState({ partId: "", quantity: 1 });

  const availableParts = [
    { id: "1", name: "Lọc gió điều hòa EV-123", code: "LG-123", price: 300000 },
    { id: "2", name: "Dầu làm mát động cơ", code: "DLM-456", price: 800000 },
    { id: "3", name: "Phanh đĩa trước", code: "PT-789", price: 1500000 },
    { id: "4", name: "Gạt mưa cao cấp", code: "GM-234", price: 250000 },
  ];

  const servicePrice = 2000000; // Bảo dưỡng pin định kỳ

  const addPart = () => {
    if (newPart.partId && newPart.quantity > 0) {
      const part = availableParts.find((p) => p.id === newPart.partId);
      if (part) {
        setSelectedParts([
          ...selectedParts,
          {
            id: Date.now(),
            name: part.name,
            code: part.code,
            price: part.price,
            quantity: newPart.quantity,
          },
        ]);
        setNewPart({ partId: "", quantity: 1 });
      }
    }
  };

  const removePart = (id: number) => {
    setSelectedParts(selectedParts.filter((p) => p.id !== id));
  };

  const partsTotal = selectedParts.reduce((sum, part) => sum + part.price * part.quantity, 0);
  const grandTotal = servicePrice + partsTotal;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleFinalize = () => {
    // Handle finalization logic
    console.log("Finalized with parts:", selectedParts);
    alert("Đã tạo hóa đơn thành công!");
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Hoàn tất dịch vụ</h1>
          <p className="text-muted-foreground mt-2">
            {appointment.id} - {appointment.vehicle}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Service Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Khách hàng:</span>
                <span className="font-medium">{appointment.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Xe:</span>
                <span className="font-medium">{appointment.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dịch vụ:</span>
                <span className="font-medium">{appointment.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kỹ thuật viên:</span>
                <span className="font-medium">{appointment.technician}</span>
              </div>
            </CardContent>
          </Card>

          {/* Parts Used */}
          <Card>
            <CardHeader>
              <CardTitle>Ghi nhận phụ tùng đã sử dụng</CardTitle>
              <CardDescription>
                Thêm các phụ tùng đã thay thế trong quá trình bảo dưỡng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Part Form */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7">
                  <Select value={newPart.partId} onValueChange={(value) => setNewPart({ ...newPart, partId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phụ tùng..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableParts.map((part) => (
                        <SelectItem key={part.id} value={part.id}>
                          {part.name} - {formatPrice(part.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    min="1"
                    value={newPart.quantity}
                    onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })}
                    placeholder="SL"
                  />
                </div>
                <div className="col-span-2">
                  <Button onClick={addPart} className="w-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Parts List */}
              {selectedParts.length > 0 && (
                <div className="space-y-2 border rounded-lg p-4">
                  {selectedParts.map((part) => (
                    <div key={part.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{part.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {part.code} | SL: {part.quantity} | {formatPrice(part.price)}/cái
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{formatPrice(part.price * part.quantity)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePart(part.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Tóm tắt chi phí</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí dịch vụ:</span>
                  <span>{formatPrice(servicePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí phụ tùng:</span>
                  <span>{formatPrice(partsTotal)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-medium">Tổng cộng:</span>
                <span className="text-2xl font-bold">{formatPrice(grandTotal)}</span>
              </div>

              <p className="text-xs text-muted-foreground">(Đã bao gồm VAT)</p>

              <Separator />

              <Button className="w-full gap-2" onClick={handleFinalize}>
                <Receipt className="h-4 w-4" />
                Xác nhận hoàn tất & Tạo hóa đơn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
