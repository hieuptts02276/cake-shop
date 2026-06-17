import { useState } from "react";
import { Link } from "react-router-dom";

interface Cake {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function HomePage() {
const [cakes] = useState<Cake[]>(() => {
  const data = JSON.parse(localStorage.getItem("cakes") || "[]");
  if (data.length === 0) {
    const sample: Cake[] = [
      {
        id: 1,
        name: "Bánh Chocolate",
        price: 250000,
        image: "https://via.placeholder.com/300",
        description: "Bánh kem chocolate",
      },
      {
        id: 2,
        name: "Bánh Dâu Tây",
        price: 300000,
        image: "https://via.placeholder.com/300",
        description: "Bánh kem dâu",
      },
    ];

    localStorage.setItem("cakes", JSON.stringify(sample));
    return sample;
  }

  return data as Cake[];
});
const [keyword, setKeyword] = useState("");

const filtered = cakes.filter((cake) =>
cake.name.toLowerCase().includes(
keyword.toLowerCase()
)
);

return ( <div className="container mt-4"> <h2>Shop Bánh Kem</h2>
  <input
    className="form-control mb-4"
    placeholder="Tìm bánh..."
    value={keyword}
    onChange={(e) =>
      setKeyword(e.target.value)
    }
  />

  <div className="row">
    {filtered.map((cake) => (
      <div
        className="col-md-4 mb-4"
        key={cake.id}
      >
        <div className="card h-100">
          <img
            src={cake.image}
            className="card-img-top"
            alt={cake.name}
          />

          <div className="card-body">
            <h5>{cake.name}</h5>

            <p>
              {cake.price.toLocaleString()}
              đ
            </p>

            <Link
              className="btn btn-primary"
              to={`/cake/${cake.id}`}
            >
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);
}
