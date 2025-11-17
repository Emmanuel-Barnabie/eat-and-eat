import { useApp } from "../state/AppContext.jsx";

export default function History() {
  const { plans, loadingPlans, deletePlanById, loadPlanToCart } = useApp();

  if (loadingPlans) {
    return <div className="text-sm text-slate-600">กำลังโหลด History...</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">
        History & แผนสั่งอาหาร
      </h1>

      {!plans.length && (
        <div className="text-xs text-slate-500">
          ยังไม่มีแผนที่บันทึกไว้ ลองไปบันทึกจากหน้า "แผนอาหาร"
        </div>
      )}

      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center gap-2">
              <div>
                <div className="font-semibold text-sm">{plan.name}</div>
                <div className="text-[11px] text-slate-500">
                  {plan.createdAt
                    ? new Date(plan.createdAt).toLocaleString()
                    : "ไม่ทราบเวลา"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => loadPlanToCart(plan)}
                  className="px-3 py-1 rounded-lg bg-primary text-white text-xs"
                >
                  โหลดเข้าไปยังตะกร้าอีกครั้ง
                </button>
                <button
                  onClick={() => deletePlanById(plan.id)}
                  className="px-3 py-1 rounded-lg border text-xs text-red-600"
                >
                  ลบ
                </button>
              </div>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1">
              {plan.items?.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between border-b last:border-0 pb-1"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>฿{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
