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
    segment: "orders",
    title: "Orders",
    icon: <FaShoppingCart />,
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    segment: "addItem",
    title: "Add Items",
    icon: <IoMdAddCircleOutline />,
  },
  {
    kind: "divider",
  },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  {
    segment: "reports",
    title: "Edit Item",
    icon: <MdModeEditOutline />,
    children: [
      {
        segment: "Edit Plants",
        title: "Edit Plants",
        icon: <MdOutlineDescription />,
      },
      {
        segment: "Edit Pots",
        title: "Edit Pots",
        icon: <MdOutlineDescription />,
      },
      {
        segment: "Edit Fertilizers",
        title: "Edit Fertilizers",
        icon: <MdOutlineDescription />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <IoLayers />,
  },
];
