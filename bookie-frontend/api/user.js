import { api } from "../util/api";

export const getAllBooks = () => {
  return api.get(`/user/all-books`, {});
};

export const getUserBooks = (userId) => {
  return api.get(`/user/books`, {
    params: {
      user: userId,
    },
  });
};

export const createBook = (params, token) => {
  return api.post(`/user/books`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
      auth: token,
    },
  });
};
export const getBook = (id, token) => {
  return api.get(`/user/books/${id}`, {
    headers: {
      auth: token,
    },
  });
};

export const deleteBook = (id, token) => {
  return api.delete(`/user/books/${id}`, {
    headers: {
      auth: token,
    },
  });
};

export const getTransactions = (param, token) => {
  return api.get(`/user/transaction`, {
    headers: {
      auth: token,
    },
    params: {
      type: param,
    },
  });
};

export const addTransaction = (params, token) => {
  console.log(params, token);

  return api.post(`/user/transaction`, params, {
    headers: {
      auth: token,
    },
  });
};
export const getWishlist = (token) => {
  return api.get(`/user/wishlist`, {
    headers: {
      auth: token,
    },
  });
};
export const addToWishlist = (id, token) => {
  return api.post(
    `/user/wishlist`,
    {
      bookId: id,
    },
    {
      headers: {
        auth: token,
      },
    }
  );
};
export const signin = (params) => {
  return api.post("/user/signin", params);
};
export const register = (params) => {
  return api.post("/user/signup", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
