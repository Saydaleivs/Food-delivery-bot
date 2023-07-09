import Badge from '@mui/material/Badge';
import { Product } from '../interfaces';

interface SingleProductPropTypes {
  product: Product;
  selectedProducts: object;
  removeFromCart: (id: string) => void;
  addToCart: (id: string) => void;
}

export const SingleProduct = ({
  product,
  selectedProducts,
  removeFromCart,
  addToCart,
}: SingleProductPropTypes) => {
  return (
    <div className='single-product w-56 h-68 flex flex-col bg-gray-50 gap-2 shadow-md hover:shadow-xl hover:scale-80 duration-200 px-4 py-7 overflow-hidden rounded-3xl'>
      <Badge
        badgeContent={selectedProducts && selectedProducts[product.id]}
        sx={{
          '& .MuiBadge-badge': {
            color: 'white',
            backgroundColor: 'rgb(24 24 27)',
          },
        }}
      >
        <img
          className=' h-32 w-full object-cover hover:scale-90 duration-500 rounded-xl'
          src={product.image}
          alt={product.name}
        />
      </Badge>
      <div className='price-title-container flex items-center justify-between'>
        <h2 className='text-stone-950 font-semibold text-xl capitalize'>
          {product.name}
        </h2>

        <p className='mt-1 text-sm text-gray-600'>
          <span className='text-zinc-500 font-semibold'>
            {product.price + " so'm"}
          </span>
        </p>
      </div>
      <div className='add-remove-btn-container mt-2 flex justify-between items-center w-45'>
        <button
          id={`${product.id}`}
          onClick={(e) => removeFromCart(e.currentTarget.id)}
          className='add-remove-btn w-20 text-zinc-800 px-2 py-1 border border-zinc-900 rounded-md active:bg-zinc-800 active:text-sky-50'
        >
          -
        </button>

        <button
          id={`${product.id}`}
          onClick={(e) => addToCart(e.currentTarget.id)}
          className='add-remove-btn w-20 bg-zinc-800 text-sky-50 active:bg-sky-50 active:text-zinc-800 duration-100 border border-zinc-900 px-2 py-1 rounded-md'
        >
          +
        </button>
      </div>
    </div>
  );
};
