import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";

export default async function ShopPage() {
  const client = createClient();
  const fragrances = await client.getAllByType("fragrance");

  return (
    <Bounded className="py-16">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">
            Our Collection
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Discover our exquisite range of luxury fragrances, each crafted with the finest ingredients 
            and inspired by the elements of nature.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fragrances.map((fragrance, index) => (
          <FadeIn key={fragrance.id} delay={index * 0.1}>
            <ProductCard fragrance={fragrance} />
          </FadeIn>
        ))}
      </div>
    </Bounded>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: `Shop | ${settings.data.site_title}`,
    description: "Explore our complete collection of luxury fragrances. Find your perfect scent from our curated selection of premium perfumes.",
  };
}