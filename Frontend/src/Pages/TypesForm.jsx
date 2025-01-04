import React, { useState } from "react";
import Navbar from "../Components/Nav";
import { BookOpen, User } from "lucide-react";
import image1 from "../assets/Sale1.png";
import image2 from "../assets/Sale2.png";
import SalesForm from "../Components/SalesForm";
import ProductForm from "../Components/ProductForm";

const FormCard = ({ card, onClick }) => {
  return (
    <div
      onClick={() => onClick(card.route)}
      className="group cursor-pointer bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="h-48 w-full bg-gradient-to-br from-blue-500 to-purple-600 relative">
        <img
          src={card.imageUrl || "/api/placeholder/400/320"}
          alt={card.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-900">
          <card.Icon className="w-8 h-8 text-white mb-2" />
          <h3 className="text-lg font-bold text-white">{card.title}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-300 text-sm">{card.description}</p>
        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
          <span>Get Started</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Forms = () => {
  const [isSalesFormOpen, setIsSalesFormOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  const handleCardClick = (route) => {
    if (route === "/sales-form") {
      setIsSalesFormOpen(true);
    } else if (route === "/product-form") {
      setIsProductFormOpen(true);
    } else {
      console.log(`Navigating to: ${route}`);
    }
  };

  const cardData = [
    {
      id: 1,
      title: "Form Penjualan",
      Icon: User,
      description:
        "Penjualan barang anda bisa diakses di sini dengan segala apapun yang ada",
      imageUrl: image1,
      route: "/sales-form",
    },
    {
      id: 2,
      title: "Form Product",
      Icon: BookOpen,
      description:
        "Manajemen produk anda bisa diakses di sini dengan segala apapun yang ada.",
      route: "/product-form",
      imageUrl: image2,
    },
  ];

  return (
    <>
      <Navbar className="mt-0" />

      <div className="max-w-7xl mx-auto px-4 py-12 mt-5">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Select a Form
        </h2>
        <div className="flex justify-center items-center gap-6">
          {cardData.map((card) => (
            <FormCard key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>

      {/* Form Modals */}
      <SalesForm
        isOpen={isSalesFormOpen}
        onRequestClose={() => setIsSalesFormOpen(false)}
      />

      <ProductForm
        isOpen={isProductFormOpen}
        onRequestClose={() => setIsProductFormOpen(false)}
      />
    </>
  );
};

export default Forms;
