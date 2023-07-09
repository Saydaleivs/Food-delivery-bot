export default function TotalPrice({ totalPrice, setOpen, open }) {
  return (
    <>
      {totalPrice > 0 && (
        <div className='order-btn-wrapper justify-between items-center px-7 shadow-2xl'>
          <div className='flex flex-col'>
            <h1>Total</h1>
            <h4>{totalPrice}</h4>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className=' w-2/5 h-12 rounded-2xl font-sans font-semibol text-white bg-zinc-800'
          >
            Order
          </button>
        </div>
      )}
    </>
  );
}
