export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  localStorage.getItem("user");
};

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const getCart = () => {
  localStorage.getItem("cart");
};
