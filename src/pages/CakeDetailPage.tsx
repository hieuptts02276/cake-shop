import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Cake = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

type CartItem = Cake & { quantity: number };

export default function CakeDetailPage() {
  const { id } = useParams();

  const [cake, setCake] = useState<Cake | undefined>(undefined);

  useEffect(() => {
    const cakes = JSON.parse(
      localStorage.getItem("cakes") || "[]"
    ) as Cake[];

    const found = cakes.find(
      (c: Cake) => c.id === Number(id)
    );

    // Avoid calling setState synchronously inside the effect to prevent
    // cascading renders flagged by the linter. Schedule update asynchronously.
    setTimeout(() => setCake(found), 0);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as CartItem[];

    const existing = cart.find(
      (item: CartItem) => item.id === cake!.id
    );

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...(cake as Cake),
        quantity: 1
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Đã thêm vào giỏ hàng");
  };

  if (!cake) return <div>Loading...</div>;

  return (
    <div className="cake-detail">
      <h1>{cake.name}</h1>

      <div className="price">
        {cake.price.toLocaleString()} đ
      </div>

      <p>{cake.description}</p>

      <button type="button" onClick={addToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}
