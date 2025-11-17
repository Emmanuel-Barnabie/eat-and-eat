import { useState } from "react";
import { useApp } from "../state/AppContext.jsx";

export default function Checkout() {
  const { cart, cartTotal, clearCart, savePlanFromCart } = useApp();
  const [payment, setPayment] = useState("promptpay");
  const [status, setStatus] = useState("");

  if (!cart.length) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-bold text-slate-900">ตะกร้า / ชำระเงิน</h1>
        <p className="text-sm text-slate-600">ยังไม่มีสินค้าในตะกร้า</p>
      </section>
    );
  }

  const handleConfirm = async () => {
    setStatus("กำลังบันทึกคำสั่งซื้อ...");
    try {
      const paymentLabel = {
        promptpay: "PromptPay",
        card: "บัตรเครดิต/เดบิต",
        cod: "ชำระปลายทาง",
      }[payment];

      await savePlanFromCart(`ออเดอร์ใหม่ (${paymentLabel})`);
      clearCart();
      setStatus("สั่งซื้อสำเร็จ! ระบบบันทึกคำสั่งซื้อไว้ใน History แล้ว");
    } catch (e) {
      console.error(e);
      setStatus("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">ตะกร้า / ชำระเงิน</h1>

      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="text-sm font-semibold">รายการในตะกร้า</div>
        <ul className="text-xs text-slate-600 space-y-1 max-h-48 overflow-auto">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>฿{item.price * item.qty}</span>
            </li>
          ))}
        </ul>
        <div className="text-sm font-semibold mt-2">
          รวมทั้งหมด: ฿{cartTotal}
        </div>

        <div className="mt-4 space-y-2">
          <div className="text-xs font-medium text-slate-700">
            เลือกวิธีชำระเงิน
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="promptpay"
                checked={payment === "promptpay"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>PromptPay / โอนผ่านมือถือ</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>บัตรเครดิต / เดบิต</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>ชำระปลายทาง (เงินสด)</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full mt-2 rounded-lg bg-primary text-white text-sm font-medium py-2 hover:brightness-105"
        >
          ยืนยันการสั่งซื้อ
        </button>
        {status && (
          <div className="text-xs text-emerald-700 mt-2 whitespace-pre-line">
            {status}
          </div>
        )}
      </div>
    </section>
  );
}
