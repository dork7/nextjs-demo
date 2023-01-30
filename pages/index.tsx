import React from "react";
import { readFile, readFileSync } from "fs";
import path from "path";

const HomePage = (props: any) => {
  const { products } = props;
  console.log(`productss`, products);
  return (
    <div>
      <ul>
        {products.map((product: any) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps(props: any) {
  console.log("Generating....");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData: any = await readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
