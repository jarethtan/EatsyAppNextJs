import React from "react";
import MovingCarousel from "../Carousel/MovingCarousel";

const FreqOrderedList = (props) => {
  const arr1 = [];
  props.allUsers.map((user) => Object.keys(user).filter((k) => (k.startsWith("paidCart") ? arr1.push(Object.values(user[k.toString()])) : null)));
  const orderArray = arr1.flat().map((order) => {
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
  let accumOrder = orderArray.reduce((acc, curr) => {
    let order = acc.find((order) => order[1] === curr[1]);
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
