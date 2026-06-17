import { useState } from "react";

type Cake = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function AdminCakePage() {
  const [cakes, setCakes] = useState<Cake[]>(() => {
    const stored = localStorage.getItem("cakes");
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const addCake = () => {
    const newCake: Cake = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      description,
    };

    const updated = [...cakes, newCake];
    setCakes(updated);
    localStorage.setItem("cakes", JSON.stringify(updated));

    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  const deleteCake = (id: number) => {
    const updated = cakes.filter((cake) => cake.id !== id);
    setCakes(updated);
    localStorage.setItem("cakes", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Quản Lý Bánh Kem</h1>

      <div>
        <div>
          <label htmlFor="cake-name">Tên</label>
          <input
            id="cake-name"
            placeholder="Tên bánh"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cake-price">Giá</label>
          <input
            id="cake-price"
            placeholder="Giá bánh"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cake-image">Hình ảnh</label>
          <input
            id="cake-image"
            placeholder="URL hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cake-description">Mô tả</label>
          <textarea
            id="cake-description"
            placeholder="Mô tả bánh"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="button" onClick={addCake}>
          Thêm bánh
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map((cake) => (
            <tr key={cake.id}>
              <td>{cake.id}</td>
              <td>{cake.name}</td>
              <td>{cake.price.toLocaleString()}</td>
              <td>
                <button type="button" onClick={() => deleteCake(cake.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
