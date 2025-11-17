import { NavLink } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

const navLinkClass = ({ isActive }) =>
  `px-3 py-1 rounded-full text-sm font-medium ${
    isActive
      ? "bg-primary text-white"
      : "text-slate-700 hover:bg-slate-100"
  }`;

export default function Navbar() {
  const { cartTotal, cart } = useApp();

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="border-b bg-white sticky top-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            E
          </div>
          <div>
            <div className="font-semibold text-slate-900">Eat and Eat</div>
            <div className="text-xs text-emerald-600">
              แอปสั่งอาหารตัวอย่าง · PWA
            </div>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm justify-end">
          <NavLink to="/" className={navLinkClass}>
            หน้าแรก
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            เมนู
          </NavLink>
          <NavLink to="/plan" className={navLinkClass}>
            แผนอาหาร
          </NavLink>
          <NavLink to="/history" className={navLinkClass}>
            History
          </NavLink>
          <NavLink to="/checkout" className={navLinkClass}>
            ตะกร้า
          </NavLink>
          <div className="ml-2 px-3 py-1 rounded-full bg-slate-100 text-xs flex items-center gap-1">
            🧺 {itemCount} · ฿{cartTotal}
          </div>
        </nav>
      </div>
    </header>
  );
}
