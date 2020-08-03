import React from "react";
import {
  HomeOutlined,
  ShoppingOutlined,
  SearchOutlined,
  DollarOutlined,
  HeartFilled,
  BookFilled,
  RightCircleOutlined,
  ContactsOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export const Discover = {
  title: "Discover",
  links: [
    {
      icon: <HomeOutlined />,
      path: "/",
      title: "Home",
    },
    {
      icon: <SearchOutlined />,
      path: "/browse",
      title: "Browse",
    },
    {
      icon: <RightCircleOutlined />,
      path: "/AboutUs",
      title: "About Us",
    },
    {
      icon: <HeartFilled />,
      path: "/wishlist",
      title: "For You",
    },
    {
      icon: <ContactsOutlined />,
      path: "/ContactUs",
      title: "Contact Us",
    },
  ],
};

export const Library = {
  title: "Library",
  links: [
    {
      icon: <BookFilled />,
      path: "/books",
      title: "My Books",
    },

    {
      icon: <DollarOutlined />,
      path: "/transactions",
      title: "Transactions",
    },
    {
      icon: <ShoppingOutlined />,
      path: "/cart",
      title: "Cart",
    },
    // {
    //   icon: <ProfileOutlined />,
    //   path: "/profile",
    //   title: "Profile",
    // },
  ],
};
