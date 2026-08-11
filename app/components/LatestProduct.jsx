// import LatestProductSlider from "./LatestProductSlider";

import LatestProductSlider from "./LatestProductSlider";

const getLatestProducts = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    cache: "no-store",
  });

  return res.json();
};

export default async function LatestProduct() {
  const products = await getLatestProducts();

  return <LatestProductSlider products={products.slice(0, 12)} />;
}
