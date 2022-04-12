import React from "react";
import MovingCarousel from "../Carousel/MovingCarousel";

const FreqOrderedList: React.FC<{ allUsers: object[] }> = (props) => {
  const arr1: any = [];
  props.allUsers.map((user) => Object.keys(user).filter((k) => (k.startsWith("paidCart") ? arr1.push(Object.values(user[k.toString()])) : null)));
  const orderArray = arr1.flat().map((order: any) => {
    return [
      order["quantity"],
      order["productName"],
      order["productImage"],
      order["productPrice"],
      order["_id"],
      order["productCategory"],
      order["productDescription"],
      order["productNote"],
    ];
  });
  let accumOrder = orderArray.reduce((acc: any, curr: any) => {
    let order = acc.find((order: string[]) => order[1] === curr[1]);
    if (order) {
      order[0] += curr[0];
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  const accumOrderForEachProduct = accumOrder.sort().reverse();
  return (
    <div>
      <MovingCarousel accumOrderForEachProduct={accumOrderForEachProduct} />
    </div>
  );
};
export default FreqOrderedList;
