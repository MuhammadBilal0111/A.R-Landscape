import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { GiPlantSeed } from "react-icons/gi";
import { PiPottedPlantBold } from "react-icons/pi";
import { GiFertilizerBag } from "react-icons/gi";

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
    title: "Edit",
    icon: <MdModeEditOutline />,
    children: [
      {
        segment: "plants",
        title: "Edit Plants",
        icon: <GiPlantSeed />,
      },
      {
        segment: "pots",
        title: "Edit Pots",
        icon: <PiPottedPlantBold />,
      },
      {
        segment: "fertilizers",
        title: "Edit Fertilizers",
        icon: <GiFertilizerBag />,
      },
      {
        segment: "province",
        title: "Edit Province Price",
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
