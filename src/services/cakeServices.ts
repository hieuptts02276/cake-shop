export interface Cake {
id: number;
name: string;
price: number;
image: string;
description: string;
}

class CakeService {
getAll() {
return JSON.parse(
localStorage.getItem("cakes") || "[]"
);
}

getById(id: number) {
const cakes: Cake[] = JSON.parse(
localStorage.getItem("cakes") || "[]"
);

return cakes.find(
  (cake) => cake.id === id
);
}

add(cake: Cake) {
const cakes: Cake[] = JSON.parse(
localStorage.getItem("cakes") || "[]"
);

cakes.push(cake);

localStorage.setItem(
  "cakes",
  JSON.stringify(cakes)
);
}

update(cake: Cake) {
const cakes: Cake[] = JSON.parse(
localStorage.getItem("cakes") || "[]"
);

const updated = cakes.map(
  (c) =>
    c.id === cake.id
      ? cake
      : c
);

localStorage.setItem(
  "cakes",
  JSON.stringify(updated)
);
}

delete(id: number) {
const cakes: Cake[] = JSON.parse(
localStorage.getItem("cakes") || "[]"
);

const updated = cakes.filter(
  (cake) => cake.id !== id
);

localStorage.setItem(
  "cakes",
  JSON.stringify(updated)
);
}

search(keyword: string) {
const cakes: Cake[] = JSON.parse(
localStorage.getItem("cakes") || "[]"
);

return cakes.filter((cake) =>
  cake.name
    .toLowerCase()
    .includes(
      keyword.toLowerCase()
    )
);
}
}

export default new CakeService();
