import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl px-6 py-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">
          ยินดีต้อนรับสู่ Eat and Eat
        </h1>
        <p className="text-sm opacity-90 mb-4">
          แอปตัวอย่างสั่งอาหารหลายหน้า (Multi-page) มีระบบตะกร้า, History,
          IndexedDB, LocalStorage และรองรับ PWA สำหรับติดตั้งบนมือถือ
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/menu"
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-primary hover:bg-slate-100"
          >
            เริ่มเลือกเมนู
          </Link>
          <Link
            to="/history"
            className="px-4 py-2 rounded-full text-sm border border-white/70 hover:bg-white/10"
          >
            ดู History การสั่ง
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card
          title="จัดการเมนูและตะกร้า"
          body="ผู้ใช้สามารถเลือกเมนูใส่ตะกร้า ปรับจำนวน และไปหน้าชำระเงินได้."
        />
        <Card
          title="History & แผนสั่งอาหาร"
          body="รองรับการบันทึกแผนสั่งอาหารและประวัติการสั่งผ่าน IndexedDB."
        />
        <Card
          title="PWA พร้อมติดตั้ง"
          body="สามารถติดตั้งบนมือถือเป็น PWA สำหรับใช้ present หรือใช้งานได้จริง."
        />
      </div>
    </section>
  );
}

function Card({ title, body }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="font-semibold text-sm mb-1">{title}</h2>
      <p className="text-xs text-slate-600">{body}</p>
    </div>
  );
}
