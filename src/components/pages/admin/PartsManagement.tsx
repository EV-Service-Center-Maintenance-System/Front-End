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
import { Badge } from "../../ui/badge";
import { Plus, Edit, Search, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function PartsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [partsList, setPartsList] = useState([
    {
      id: 1,
      name: "Lọc gió điều hòa EV-123",
      code: "LG-123",
      price: "300.000",
      stock: 8,
      threshold: 10,
    },
    {
      id: 2,
      name: "Dầu làm mát động cơ",
      code: "DLM-456",
      price: "800.000",
      stock: 50,
      threshold: 20,
    },
    {
      id: 3,
      name: "Phanh đĩa trước",
      code: "PT-789",
      price: "1.500.000",
      stock: 15,
      threshold: 5,
    },
    {
      id: 4,
      name: "Gạt mưa cao cấp",
      code: "GM-234",
      price: "250.000",
      stock: 3,
      threshold: 10,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
    threshold: "",
  });

  const handleAdd = () => {
    setEditingPart(null);
    setFormData({ name: "", code: "", price: "", stock: "", threshold: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (part: any) => {
    setEditingPart(part);
    setFormData({
      name: part.name,
      code: part.code,
      price: part.price,
      stock: part.stock.toString(),
      threshold: part.threshold.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingPart) {
      setPartsList((prev) =>
        prev.map((part) =>
          part.id === editingPart.id
            ? {
                ...part,
                ...formData,
                stock: parseInt(formData.stock),
                threshold: parseInt(formData.threshold),
              }
            : part
        )
      );
    } else {
      const newPart = {
        id: partsList.length + 1,
        ...formData,
        stock: parseInt(formData.stock),
        threshold: parseInt(formData.threshold),
      };
      setPartsList((prev) => [...prev, newPart]);
    }
    setIsDialogOpen(false);
  };

  const filteredParts = partsList.filter(
    (part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(parseInt(price));
  };

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock <= threshold) {
      return { label: "Sắp hết", variant: "destructive" as const, icon: AlertTriangle };
    }
    return { label: "Sẵn có", variant: "default" as const, icon: CheckCircle };
  };

  const lowStockCount = partsList.filter((p) => p.stock <= p.threshold).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý phụ tùng & Kho</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý tồn kho và nhập hàng phụ tùng
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm phụ tùng mới
        </Button>
      </div>

      {lowStockCount > 0 && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium">Cảnh báo tồn kho</p>
                <p className="text-sm text-muted-foreground">
                  Có {lowStockCount} phụ tùng sắp hết hàng hoặc dưới ngưỡng tối thiểu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phụ tùng</CardTitle>
          <CardDescription>
            Tổng số: {partsList.length} phụ tùng | Sắp hết: {lowStockCount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc mã hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên phụ tùng</TableHead>
                  <TableHead>Mã hiệu</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Ngưỡng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Không tìm thấy phụ tùng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredParts.map((part) => {
                    const status = getStockStatus(part.stock, part.threshold);
                    const StatusIcon = status.icon;
                    return (
                      <TableRow key={part.id}>
                        <TableCell className="font-medium">{part.name}</TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {part.code}
                          </code>
                        </TableCell>
                        <TableCell>{formatPrice(part.price)}</TableCell>
                        <TableCell>
                          <span className={part.stock <= part.threshold ? "text-destructive font-medium" : ""}>
                            {part.stock}
                          </span>
                        </TableCell>
                        <TableCell>{part.threshold}</TableCell>
                        <TableCell>
                          <Badge variant={status.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(part)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Sửa
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingPart ? "Chỉnh sửa phụ tùng" : "Thêm phụ tùng mới"}
            </DialogTitle>
            <DialogDescription>
              {editingPart
                ? "Cập nhật thông tin phụ tùng"
                : "Điền thông tin để thêm phụ tùng mới"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên phụ tùng</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Lọc gió điều hòa EV-123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Mã hiệu</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="LG-123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá (VNĐ)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="300000"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Tồn kho</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Ngưỡng tối thiểu</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) =>
                    setFormData({ ...formData, threshold: e.target.value })
                  }
                  placeholder="10"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              {editingPart ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
