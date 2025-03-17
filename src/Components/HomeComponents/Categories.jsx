import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const categories = [
    {
      name: "Embroidered Salwar Kameez",
      img: "https://images.pexels.com/photos/25184999/pexels-photo-25184999/free-photo-of-model-in-traditional-embroidered-salwar-kameez-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      name: "Traditional Green Dress",
      img: "https://images.pexels.com/photos/25184956/pexels-photo-25184956/free-photo-of-model-in-traditional-green-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      name: "Floral Purple Dress",
      img: "https://images.pexels.com/photos/25184935/pexels-photo-25184935/free-photo-of-model-in-a-floral-purple-dress-with-embroidery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-tight">
        Our Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="relative group">
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 flex items-center justify-between rounded-b-2xl">
              <span className="text-lg font-semibold">{category.name}</span>
              <FaArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
