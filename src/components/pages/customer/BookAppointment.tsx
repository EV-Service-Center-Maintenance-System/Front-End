import { useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "../../ui/utils";
import { Checkbox } from "../../ui/checkbox";

interface BookAppointmentProps {
  onBack: () => void;
}

export function BookAppointment({ onBack }: BookAppointmentProps) {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const vehicles = [
    { id: "1", name: "VinFast VF8 - 51K-123.45" },
    { id: "2", name: "Hyundai Ioniq 5 - 30A-987.65" },
  ];

  const services = [
    { id: "1", name: "Bảo dưỡng pin định kỳ", price: "2.000.000đ", duration: "2-3 giờ" },
    { id: "2", name: "Kiểm tra tổng quát", price: "Miễn phí", duration: "1 giờ" },
    { id: "3", name: "Thay lọc gió điều hòa", price: "500.000đ", duration: "30 phút" },
    { id: "4", name: "Thay dầu làm mát", price: "1.200.000đ", duration: "1-2 giờ" },
  ];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = () => {
    // Handle booking logic
    console.log({
      vehicle: selectedVehicle,
      services: selectedServices,
      date,
      time,
      notes,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="inline-flex h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Đặt lịch thành công!</h2>
            <p className="text-muted-foreground mb-6">
              Yêu cầu đặt lịch của bạn đã được gửi. Chúng tôi sẽ xác nhận trong thời gian sớm nhất.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
              <p className="text-sm mb-2">
                <strong>Mã lịch hẹn:</strong> APM-00{Math.floor(Math.random() * 1000)}
              </p>
              <p className="text-sm mb-2">
                <strong>Xe:</strong> {vehicles.find((v) => v.id === selectedVehicle)?.name}
              </p>
              <p className="text-sm mb-2">
                <strong>Thời gian:</strong> {time} {date && format(date, "dd/MM/yyyy", { locale: vi })}
              </p>
              <p className="text-sm">
                <strong>Số dịch vụ:</strong> {selectedServices.length} dịch vụ
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onBack}>
                Về trang chủ
              </Button>
              <Button onClick={() => setSubmitted(false)}>
                Đặt lịch khác
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Đặt lịch dịch vụ</h1>
        <p className="text-muted-foreground mt-2">
          Điền thông tin để đặt lịch bảo dưỡng hoặc sửa chữa
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin đặt lịch</CardTitle>
          <CardDescription>
            Vui lòng điền đầy đủ thông tin bên dưới
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Vehicle */}
          <div className="space-y-2">
            <Label htmlFor="vehicle">1. Chọn xe của bạn</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn xe..." />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 2: Services */}
          <div className="space-y-3">
            <Label>2. Chọn dịch vụ</Label>
            <div className="space-y-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Thời gian: {service.duration}
                        </p>
                      </div>
                      <p className="font-medium">{service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>3. Chọn ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Chọn giờ</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giờ..." />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Step 4: Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">4. Ghi chú thêm (tùy chọn)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mô tả vấn đề hoặc yêu cầu đặc biệt..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedVehicle || selectedServices.length === 0 || !date || !time}
              className="flex-1"
            >
              Gửi yêu cầu đặt lịch
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
