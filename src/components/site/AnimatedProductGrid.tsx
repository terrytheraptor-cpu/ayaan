import { motion, type Variants } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/catalog.functions";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function AnimatedProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10",
        className,
      )}
      key={products.map(p => p.id).join(",")}
    >
      {products.map((p, i) => (
        <motion.div key={p.id} variants={item} layout>
          <ProductCard p={p} priority={i < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
}
