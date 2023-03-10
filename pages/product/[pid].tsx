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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData: any = await readFileSync(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const filteredProduct = data.products.find(
    (product: any) => product.id === productId
  );

  if (!filteredProduct)
    return {
      notFound: true,
    };

  return {
    props: {
      product: filteredProduct,
    },
  };
}

export async function getStaticPaths() {
  const { products } = await getData();
  const ids = products.map((product: any) => product.id);
  const paramsWithIds = ids.map((id: any) => ({ params: { pid: id } }));
  return {
    paths: paramsWithIds,
    //paths: [
    //{ params: { pid: "p1" } },
    // { params: { pid: "p2" } },
    // { params: { pid: "p3" } },
    //  ],
    fallback: true, // true | false | 'blocking' //  stop pre generating pages is set true,
    //and only prerender the pages mentioned in the path array
  };
}

export default ProductDetails;
