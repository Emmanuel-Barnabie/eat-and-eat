import { MENU_ITEMS } from "../data/menu.js";
import MenuItemCard from "../components/MenuItemCard.jsx";
import { useApp } from "../state/AppContext.jsx";
import { Link } from "react-router-dom";

export default function Menu() {
  const { cartTotal, cart, clearCart } = useApp();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-900">เมนูอาหาร</h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
            🌱 เมนูยอดนิยม
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {MENU_ITEMS.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-4 bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm">
          <div className="font-semibold">สรุปตะกร้า</div>
          <div className="text-xs text-slate-500">
            จำนวน {cart.reduce((s, i) => s + i.qty, 0)} รายการ · รวม ฿{cartTotal}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-lg border text-xs text-slate-600 hover:bg-slate-50"
          >
            ล้างตะกร้า
          </button>
          <Link
            to="/plan"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:brightness-105 flex items-center gap-1"
          >
            ไปหน้าบันทึกแผน
          </Link>
        </div>
      </div>
    </section>
  );
}
