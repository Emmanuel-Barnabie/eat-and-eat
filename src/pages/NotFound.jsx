import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center space-y-3">
      <h1 className="text-2xl font-bold text-slate-900">404</h1>
      <p className="text-sm text-slate-600">ไม่พบหน้าที่ต้องการ</p>
      <Link
        to="/"
        className="inline-flex px-4 py-2 rounded-lg bg-primary text-white text-sm"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
