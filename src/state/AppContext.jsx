import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllPlans, addPlan, deletePlan } from "../lib/db.js";

const AppContext = createContext(null);

const CART_KEY = "eat-and-eat-cart";

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    (async () => {
      try {
        const all = await getAllPlans();
        all.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        setPlans(all);
      } finally {
        setLoadingPlans(false);
      }
    })();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const savePlanFromCart = async (planName) => {
    if (!cart.length) return null;
    const newPlan = {
      name: planName || "แผนอาหารแบบด่วน",
      items: cart,
    };
    const id = await addPlan(newPlan);
    const all = await getAllPlans();
    all.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    setPlans(all);
    return id;
  };

  const deletePlanById = async (id) => {
    await deletePlan(id);
    const all = await getAllPlans();
    all.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    setPlans(all);
  };

  const loadPlanToCart = (plan) => {
    setCart(plan.items || []);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        plans,
        loadingPlans,
        savePlanFromCart,
        deletePlanById,
        loadPlanToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
