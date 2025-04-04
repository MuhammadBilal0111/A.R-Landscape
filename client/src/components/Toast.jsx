import toast from "react-hot-toast";

export function ToastSuccess(message) {
  return toast.success(message, {
    style: {
      border: "1px solid #14532d",
      padding: "16px",
      color: "#14532d",
    },
    iconTheme: {
      primary: "#14532d",
      secondary: "#FFFAEE",
    },
  });
}

export function ToastFailure(message) {
  return toast.error(message, {
    style: {
      border: "1px solid #8B0000",
      padding: "16px",
      color: "#8B0000",
    },
    iconTheme: {
      primary: "#8B0000",
      secondary: "#fff",
    },
  });
}
