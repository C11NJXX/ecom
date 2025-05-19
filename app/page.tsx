import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  console.log(products);
  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome to My Ecommerce</h2>
            <p>Discover the latest products at the best prices</p>
          </div>
        </div>
      </section>
    </div>
  );
}
