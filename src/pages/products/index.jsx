import { useEffect } from "react";
import Container from "../../components/container/Container";
import PageIntro from "../../components/page-intro/PageIntro";
import ProjectCard from "../../components/cards/ProjectCard";
import { PRODUCTS_DETAILS } from "../../constants/products-details";
import ProductCard from "@/components/cards/ProductCard";

const PRODUCTS = PRODUCTS_DETAILS;


const ProductsPage = () => {
  useEffect(() => {
    document.title = 'WithZell - Products & SaaS Tools"';
  }, []);
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Products & SaaS Tools"
          intro={`Some of my side projects have grown into tools that people actually use. This page highlights those — small but meaningful products that blend AI, usability, and real-world value.`}
        ></PageIntro>
        {/* <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"> */}
          <div className="mb-16 grid gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProductsPage;
