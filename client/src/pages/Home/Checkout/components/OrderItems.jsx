function OrderItems() {
  return (
    <div className="flex flex-col gap-1 rounded-lg  text-gray-700 font-semibold bg-gray-300 py-3  px-4 my-1">
      <h1>
        Pepperoni Pizza
        <span className="bg-green-900 text-white font-semibold text-sm p-1 rounded-md text-center ml-3">
          x3
        </span>
      </h1>
      <div className="flex justify-between">
        <h3>Price:</h3>
        <h3>Rs. 4350</h3>
      </div>
    </div>
  );
}
export default OrderItems;
