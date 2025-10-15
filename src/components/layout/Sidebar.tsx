import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  Package, 
  Calendar, 
  Car, 
  FileText,
  ClipboardList,
  Receipt,
  User,
  X
} from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPage, onNavigate, userRole, isOpen, onClose }: SidebarProps) {
  const adminMenuItems = [
    { id: "admin-dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "admin-staff", label: "Quản lý nhân sự", icon: Users },
    { id: "admin-services", label: "Quản lý dịch vụ", icon: Wrench },
    { id: "admin-parts", label: "Quản lý phụ tùng", icon: Package },
    { id: "admin-invoices", label: "Quản lý hóa đơn", icon: Receipt },
  ];

  const staffMenuItems = [
    { id: "staff-dashboard", label: "Lịch hẹn", icon: Calendar },
    { id: "staff-appointments", label: "Xử lý lịch hẹn", icon: ClipboardList },
  ];

  const technicianMenuItems = [
    { id: "technician-dashboard", label: "Công việc của tôi", icon: Wrench },
  ];

  const customerMenuItems = [
    { id: "customer-dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "customer-vehicles", label: "Xe của tôi", icon: Car },
    { id: "customer-appointments", label: "Lịch hẹn", icon: Calendar },
    { id: "customer-history", label: "Lịch sử dịch vụ", icon: FileText },
    { id: "customer-profile", label: "Thông tin cá nhân", icon: User },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case "Admin":
        return adminMenuItems;
      case "Staff":
        return staffMenuItems;
      case "Technician":
        return technicianMenuItems;
      case "Customer":
        return customerMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
          <div className="p-4 space-y-2">
            <div className="mb-6 hidden lg:block">
              <div className="text-xs uppercase text-muted-foreground mb-2 px-3">
                {userRole}
              </div>
            </div>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    currentPage === item.id && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose?.();
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
