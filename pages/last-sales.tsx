import React, { useEffect, useState } from "react";

const LastSales = () => {
  const [salesData, setSalesData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsLoading(true);
    fetch("https://nextjs-demo-9a278-default-rtdb.firebaseio.com/sales.json", {
      signal,
    })
      .then((data: any) => data.json())
      .then((result) => {
        console.log(result);
        const transformedData = [];
        for (const key in result) {
          transformedData.push({
            id: key,
            username: result[key].username,
            volume: result[key].volume,
          });
        }
        setIsLoading(false);
        setSalesData(transformedData);
      });
    return () => {
      abortController.abort();
    };
  }, []);
  if (isLoading) return "loading....";
  return (
    <div>
      {salesData.map((sale: any) => {
        return (
          <p>
            {sale.username} <span>{sale.volume}</span>
          </p>
        );
      })}
    </div>
  );
};

export default LastSales;
