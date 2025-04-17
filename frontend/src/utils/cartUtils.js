export const addDecimal = (num) => {
  return Number(num).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate Item price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //   Calculate Shipping price (If Price is > $100 then free else $10)
  state.shippingPrice = addDecimal(
    state.itemsPrice > 100 ? 5 : state.itemsPrice > 0 ? 100 : 0
  );

  //   Calculate Tax price (15%)
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice));

  //   Calculate Total price
  state.totalPrice = addDecimal(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
