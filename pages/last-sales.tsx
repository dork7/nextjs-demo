import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props: any) => {
  const [salesData, setSalesData] = useState(props.data);

  const { data, error, isLoading } = useSWR(
    "https://nextjs-demo-9a278-default-rtdb.firebaseio.com/sales.json",
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSalesData(transformedData);
    }
  }, [data]);

  if (error) return "ERROR!!!";
  if (!data && !salesData) return " loading.........";
  if (isLoading) return "loading....";
  return (
    <div>
      {salesData?.map((sale: any) => {
        return (
          <p>
            {sale.username} <span>{sale.volume}</span>
          </p>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  console.log("props");
  const response = await fetch(
    "https://nextjs-demo-9a278-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      data: transformedData,
    },
    // revalidate: 10,
  };
}

export default LastSales;
