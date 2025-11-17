import { useApp } from "../state/AppContext.jsx";

export default function MenuItemCard({ item }) {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between">
      <div>
        {item.image && (
          <div className="mb-3 overflow-hidden rounded-lg aspect-[4/3] w-full bg-slate-100 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <span className="text-sm font-bold text-primary">฿{item.price}</span>
        </div>
        <p className="text-xs text-slate-500 mb-2">{item.description}</p>
        <div className="flex flex-wrap gap-1 text-[10px]">
          {item.tags?.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => addToCart(item)}
        className="mt-4 w-full rounded-lg bg-accent text-white text-sm py-2 font-medium hover:brightness-105 active:scale-[0.98] transition"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}
