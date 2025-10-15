import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Battery, Zap, Shield, Clock, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomePageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function HomePage({ onLogin, onRegister }: HomePageProps) {
  const services = [
    {
      icon: Battery,
      title: "Bảo dưỡng pin",
      description: "Kiểm tra và bảo dưỡng định kỳ hệ thống pin xe điện"
    },
    {
      icon: Zap,
      title: "Sạc nhanh",
      description: "Hệ thống sạc nhanh công suất cao"
    },
    {
      icon: Shield,
      title: "Kiểm tra tổng quát",
      description: "Kiểm tra toàn diện hệ thống điện và an toàn"
    },
    {
      icon: Clock,
      title: "Bảo hành uy tín",
      description: "Cam kết bảo hành chính hãng và dịch vụ tốt nhất"
    }
  ];

  const stats = [
    { value: "5,000+", label: "Khách hàng tin dùng" },
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "98%", label: "Khách hàng hài lòng" },
    { value: "24/7", label: "Hỗ trợ khách hàng" }
  ];

  const features = [
    "Đặt lịch hẹn trực tuyến dễ dàng",
    "Theo dõi tiến độ sửa chữa real-time",
    "Lịch sử bảo dưỡng chi tiết",
    "Thanh toán online tiện lợi",
    "Kỹ thuật viên chuyên nghiệp",
    "Phụ tùng chính hãng"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">EV</span>
            </div>
            <span className="font-semibold">EV Service Center</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onLogin}>
              Đăng nhập
            </Button>
            <Button onClick={onRegister}>
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                ⚡ Dẫn đầu dịch vụ xe điện tại Việt Nam
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Trung tâm dịch vụ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> xe điện </span>
              hiện đại nhất
            </h1>
            <p className="text-lg text-muted-foreground">
              Chúng tôi cung cấp dịch vụ bảo dưỡng, sửa chữa chuyên nghiệp cho mọi dòng xe điện. 
              Đặt lịch online, theo dõi tiến độ real-time, thanh toán tiện lợi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onRegister} className="gap-2">
                Đặt lịch ngay
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLogin}>
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop"
                alt="Electric Vehicle Service"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg border hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400 fill-current" />
                </div>
                <div>
                  <div className="font-semibold">4.9/5.0</div>
                  <div className="text-sm text-muted-foreground">5000+ đánh giá</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ chuyên nghiệp cho xe điện của bạn
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop"
                  alt="Modern Service Center"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trải nghiệm dịch vụ hoàn toàn mới với công nghệ hiện đại và đội ngũ chuyên nghiệp
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={onRegister} className="gap-2">
                Bắt đầu ngay
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng trải nghiệm dịch vụ tốt nhất?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Đăng ký tài khoản ngay hôm nay để nhận ưu đãi đặc biệt cho lần đầu sử dụng dịch vụ
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={onRegister} className="gap-2">
                Đăng ký miễn phí
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLogin} className="border-white text-white hover:bg-white/10">
                Đăng nhập
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EV</span>
                </div>
                <span className="font-semibold">EV Service Center</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Trung tâm dịch vụ xe điện hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Bảo dưỡng định kỳ</li>
                <li>Sửa chữa</li>
                <li>Thay thế phụ tùng</li>
                <li>Tư vấn kỹ thuật</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Hotline: 1900-xxxx</li>
                <li>Email: support@ev.com</li>
                <li>Giờ làm việc: 8:00 - 20:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Theo dõi</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 EV Service Center. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
