import { useState } from "react";
import { Toaster } from "./components/ui/sonner";

// Layout Components
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";

// Auth Pages
import { HomePage } from "./components/pages/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";

// Admin Pages
import { AdminDashboard } from "./components/pages/admin/AdminDashboard";
import { StaffManagement } from "./components/pages/admin/StaffManagement";
import { ServicesManagement } from "./components/pages/admin/ServicesManagement";
import { PartsManagement } from "./components/pages/admin/PartsManagement";
import { InvoicesManagement } from "./components/pages/admin/InvoicesManagement";

// Staff Pages
import { StaffDashboard } from "./components/pages/staff/StaffDashboard";
import { AppointmentDetails } from "./components/pages/staff/AppointmentDetails";
import { AppointmentFinalize } from "./components/pages/staff/AppointmentFinalize";

// Technician Pages
import { TechnicianDashboard } from "./components/pages/technician/TechnicianDashboard";
import { JobDetails } from "./components/pages/technician/JobDetails";

// Customer Pages
import { CustomerDashboard } from "./components/pages/customer/CustomerDashboard";
import { VehiclesManagement } from "./components/pages/customer/VehiclesManagement";
import { BookAppointment } from "./components/pages/customer/BookAppointment";
import { AppointmentHistory } from "./components/pages/customer/AppointmentHistory";
import { ProfileManagement } from "./components/pages/customer/ProfileManagement";

type PageType = 
  | "home"
  | "login"
  | "register"
  | "admin-dashboard"
  | "admin-staff"
  | "admin-services"
  | "admin-parts"
  | "admin-invoices"
  | "staff-dashboard"
  | "staff-appointment-details"
  | "staff-appointment-finalize"
  | "technician-dashboard"
  | "technician-job-details"
  | "customer-dashboard"
  | "customer-vehicles"
  | "customer-book-appointment"
  | "customer-appointments"
  | "customer-history"
  | "customer-profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (email: string, password: string, role: string) => {
    // Mock login
    const user = {
      email,
      name: role === "Admin" ? "Admin User" : 
            role === "Staff" ? "Nhân viên" :
            role === "Technician" ? "Kỹ thuật viên" : "Khách hàng",
      role,
    };
    setCurrentUser(user);
    
    // Navigate to appropriate dashboard
    if (role === "Admin") setCurrentPage("admin-dashboard");
    else if (role === "Staff") setCurrentPage("staff-dashboard");
    else if (role === "Technician") setCurrentPage("technician-dashboard");
    else setCurrentPage("customer-dashboard");
  };

  const handleRegister = (data: any) => {
    // Mock register
    const user = {
      email: data.email,
      name: data.fullName,
      role: "Customer",
    };
    setCurrentUser(user);
    setCurrentPage("customer-dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleNavigate = (page: PageType, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    // Home and Auth Pages
    if (currentPage === "home") {
      return (
        <HomePage
          onLogin={() => handleNavigate("login")}
          onRegister={() => handleNavigate("register")}
        />
      );
    }

    if (currentPage === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => handleNavigate("register")}
        />
      );
    }

    if (currentPage === "register") {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={() => handleNavigate("login")}
        />
      );
    }

    // Protected Pages
    if (!currentUser) {
      handleNavigate("login");
      return null;
    }

    // Admin Pages
    if (currentPage === "admin-dashboard") {
      return <AdminDashboard onNavigate={handleNavigate} />;
    }
    if (currentPage === "admin-staff") {
      return <StaffManagement />;
    }
    if (currentPage === "admin-services") {
      return <ServicesManagement />;
    }
    if (currentPage === "admin-parts") {
      return <PartsManagement />;
    }
    if (currentPage === "admin-invoices") {
      return <InvoicesManagement />;
    }

    // Staff Pages
    if (currentPage === "staff-dashboard") {
      return <StaffDashboard onNavigate={handleNavigate} />;
    }
    if (currentPage === "staff-appointment-details") {
      return (
        <AppointmentDetails
          appointment={pageData}
          onBack={() => handleNavigate("staff-dashboard")}
          onNavigate={handleNavigate}
        />
      );
    }
    if (currentPage === "staff-appointment-finalize") {
      return (
        <AppointmentFinalize
          appointment={pageData}
          onBack={() => handleNavigate("staff-dashboard")}
        />
      );
    }

    // Technician Pages
    if (currentPage === "technician-dashboard") {
      return <TechnicianDashboard onNavigate={handleNavigate} />;
    }
    if (currentPage === "technician-job-details") {
      return (
        <JobDetails
          job={pageData}
          onBack={() => handleNavigate("technician-dashboard")}
        />
      );
    }

    // Customer Pages
    if (currentPage === "customer-dashboard") {
      return <CustomerDashboard onNavigate={handleNavigate} />;
    }
    if (currentPage === "customer-vehicles") {
      return <VehiclesManagement />;
    }
    if (currentPage === "customer-book-appointment") {
      return (
        <BookAppointment
          onBack={() => handleNavigate("customer-dashboard")}
        />
      );
    }
    if (currentPage === "customer-appointments" || currentPage === "customer-history") {
      return <AppointmentHistory />;
    }
    if (currentPage === "customer-profile") {
      return <ProfileManagement />;
    }

    return <div>Page not found</div>;
  };

  // Pages without layout
  if (currentPage === "home" || currentPage === "login" || currentPage === "register") {
    return (
      <>
        {renderPage()}
        <Toaster />
      </>
    );
  }

  // Pages with layout
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={currentUser?.role || ""}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigateToProfile={() => handleNavigate("customer-profile")}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            {renderPage()}
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}
