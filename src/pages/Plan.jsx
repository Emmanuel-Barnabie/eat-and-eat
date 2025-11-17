import { useState } from "react";
import { useApp } from "../state/AppContext.jsx";

export default function Plan() {
  const { cart, cartTotal, savePlanFromCart } = useApp();
  const [planName, setPlanName] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    if (!cart.length) {
      setStatus("กรุณาเลือกเมนูจากหน้าเมนูก่อน");
      return;
    }
    setStatus("กำลังบันทึก...");
    try {
      await savePlanFromCart(planName || "แผนสั่งอาหารวันนี้");
      setStatus("บันทึกแผนเรียบร้อย (IndexedDB)");
    } catch (e) {
      console.error(e);
      setStatus("มีข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">บันทึกแผนสั่งอาหาร</h1>

      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-700">
            ชื่อแผนสั่งอาหาร
          </label>
          <input
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            placeholder="เช่น แผนกินคลีนวันจันทร์, ปาร์ตี้เพื่อน 4 คน"
          />
        </div>

        <div className="text-sm font-semibold">
          รายการในตะกร้า ({cart.length} ชนิด) · รวม ฿{cartTotal}
        </div>
        <ul className="text-xs text-slate-600 space-y-1 max-h-40 overflow-auto">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>฿{item.price * item.qty}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSave}
          className="w-full mt-2 rounded-lg bg-primary text-white text-sm font-medium py-2 hover:brightness-105"
        >
          บันทึกแผนลง History (IndexedDB)
        </button>
        {status && (
          <div className="text-xs text-emerald-700 mt-1">{status}</div>
        )}
      </div>
    </section>
  );
}
