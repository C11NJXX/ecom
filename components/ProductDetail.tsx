"use client";

import Image from "next/image";
import Stripe from "stripe";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full flex justify-center items-center md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            height={200}
            width={200}
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}
      <div className="flex flex-col items-center md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold to-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => removeItem(product.id)}>
          {" "}
          -{" "}
        </Button>
        <span className="text-lg font-semibold">{quantity}</span>
        <Button variant="outline" onClick={onAddItem}>
          +
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
