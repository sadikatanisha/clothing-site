import React from "react";
const products = [
  {
    id: 1,
    name: "Floral Kurta",
    price: 1200,
    category: "Kurta",
    img: "https://images.pexels.com/photos/25184999/pexels-photo-25184999/free-photo-of-model-in-traditional-embroidered-salwar-kameez-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 2,
    name: "Chic Co-ords",
    price: 1200,
    category: "Co-ords",
    img: "https://images.pexels.com/photos/25184956/pexels-photo-25184956/free-photo-of-model-in-traditional-green-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 3,
    name: "Elegant Saree",
    price: 1200,
    category: "Saree",
    img: "https://images.pexels.com/photos/25184935/pexels-photo-25184935/free-photo-of-model-in-a-floral-purple-dress-with-embroidery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Bridal Lehenga",
    price: 1200,
    category: "Lehenga",
    img: "https://images.pexels.com/photos/20690525/pexels-photo-20690525/free-photo-of-model-in-floral-salwar-kameez-with-necklace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const FeaturedProducts = () => {
  return (
    <div className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-tight">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white ">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg font-medium text-gray-700">
                ৳ {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
