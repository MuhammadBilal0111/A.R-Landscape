import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
export const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Add Items",
    icon: <MdDashboard />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <FaShoppingCart />,
  },
  {
    kind: "divider",
  },
  {
    segment: "edit",
    title: "Edit Item",
    icon: <MdModeEditOutline />,
    children: [
      {
        segment: "plants",
        title: "Edit Plants",
        icon: <MdOutlineDescription />,
      },
      {
        segment: "pots",
        title: "Edit Pots",
        icon: <MdOutlineDescription />,
      },
      {
        segment: "fertilizers",
        title: "Edit Fertilizers",
        icon: <MdOutlineDescription />,
      },
    ],
  },
  {
    segment: "ordersHistory",
    title: "Orders History",
    icon: <FaShoppingCart />,
  },
];

export const provincePrices = [
  {
    id: 1,
    name: "Sindh",
    price: 1000,
  },
  {
    id: 2,
    name: "Punjab",
    price: 2000,
  },
  {
    id: 3,
    name: "Balochistan",
    price: 3000,
  },
  {
    id: 4,
    name: "KPK",
    price: 4000,
  },
  {
    id: 5,
    name: "Gilgit Baltistan",
    price: 7000,
  },
];
