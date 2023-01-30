import React from "react";
import { readFile, readFileSync } from "fs";
import path from "path";

const ProductDetails = (props: any) => {
  const { product } = props;
  if (!product) return "loading....";
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.descp}</p>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData: any = await readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const filteredProduct = data.products.find(
    (product: any) => product.id === productId
  );

  return {
    props: {
      product: filteredProduct,
    },
  };
}

export async function getStaticPaths(params: any) {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } },
    ],
    fallback: "blocking", // true | false | 'blocking' //  stop pre generating pages is set true,
    //and only prerender the pages mentioned in the path array
  };
}

export default ProductDetails;
