function OrderItems({ item }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg  text-gray-700 font-semibold bg-gray-300 py-3  px-4 mt-1">
      <h1>
        {item?.title}
        <span className="bg-green-900 text-yellow-400 font-semibold text-sm p-1 rounded-md text-center ml-3">
          x{item?.quantity}
        </span>
      </h1>
      <div className="flex justify-between">
        <h3>Price:</h3>
        <h3>Rs. {(item?.price * item?.quantity).toFixed(2)}</h3>
      </div>
    </div>
  );
}
export default OrderItems;
