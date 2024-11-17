import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoBarChart, IoLayers } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";

export const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
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
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <IoBarChart />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <MdOutlineDescription />,
      },
      {
        segment: "traffic",
        title: "Traffic",
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
