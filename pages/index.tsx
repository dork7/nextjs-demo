import React from "react";
import { readFile, readFileSync } from "fs";
import path from "path";
import Link from "next/link";

const HomePage = (props: any) => {
  const { products } = props;
  console.log(`productss`, products);
  return (
    <div>
      <ul>
        {products.map((product: any) => {
          return (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}> {product.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps(context: any) {
  console.log("Generating....");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData: any = await readFileSync(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // notFound: true, in case if there's any error in fetching data
  };
}

export default HomePage;
