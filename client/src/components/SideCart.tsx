import { Fragment, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Badge } from '@mui/material';
import { Product, SideCartProptypes } from '../interfaces';
import { useParams, useSearchParams } from 'react-router-dom';
import useTelegram from '../hooks/useTelegram';

export default function SideCart({
  products,
  open,
  setOpen,
  category,
  getItems,
  getSelectedItems,
  selectedProducts,
  totalPrice,
}: SideCartProptypes) {
  const { contact } = useParams();

  const [params] = useSearchParams();
  const name = params.get('name');

  const deliveryPrice = 10000;
  const { tg } = useTelegram();

  function removeProduct(e: React.SyntheticEvent) {
    if (!selectedProducts) return;

    delete selectedProducts[e.currentTarget.id];
    localStorage.setItem('products', JSON.stringify(selectedProducts));

    getItems(category);
    getSelectedItems();
  }

  const order = useCallback(async () => {
    const prods = JSON.parse(localStorage.getItem('products') || '{}');
    if (!prods || JSON.stringify(prods) === '{}') return setOpen(false);

    const orderOwner = {
      name,
      phone_number: contact,
    };
    tg.sendData(JSON.stringify({ orderOwner, orders: prods }));
  }, []);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', order);

    return () => {
      tg.offEvent('mainButtonClicked', order);
    };
  }, []);

  useEffect(() => {
    if (open && JSON.stringify(selectedProducts) !== '{}') {
      tg.MainButton.setParams({
        text: 'Order',
        color: '#18181b',
      });
      tg.MainButton.show();

      return;
    }

    tg.MainButton.hide();
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {products.length === 0 ? (
                              <h1 className='mt-3'>Please choose food</h1>
                            ) : (
                              products?.map((product: Product) => {
                                return (
                                  <li key={product.id} className='flex py-6'>
                                    <Badge
                                      badgeContent={product.amount}
                                      sx={{
                                        '& .MuiBadge-badge': {
                                          color: 'white',
                                          backgroundColor: 'rgb(24 24 27)',
                                        },
                                      }}
                                    >
                                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                        <img
                                          src={product.image}
                                          alt={product.type}
                                          className='h-full w-full object-cover object-center'
                                        />
                                      </div>
                                    </Badge>

                                    <div className='ml-4 flex flex-1 flex-col'>
                                      <div>
                                        <div className='flex justify-between text-base font-medium text-gray-900'>
                                          <h3>
                                            <a href='#'>{product.name}</a>
                                          </h3>
                                          <p className='ml-4'>
                                            {product.value *
                                              parseInt(product.amount) +
                                              " so'm"}
                                          </p>
                                        </div>
                                        <p className='mt-1 text-sm text-gray-500'>
                                          {product.description}
                                        </p>
                                      </div>
                                      <div className='flex flex-1 items-end justify-between text-sm'>
                                        <div className='flex'>
                                          <button
                                            type='button'
                                            id={product.id + ''}
                                            onClick={removeProduct}
                                            className='font-medium text-indigo-600 hover:text-indigo-500'
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Order price</p>
                        <p>{totalPrice + " so'm"}</p>
                      </div>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>delivery</p>
                        <p>{deliveryPrice + " so'm"}</p>
                      </div>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Total price</p>
                        <p>
                          {totalPrice > 0
                            ? totalPrice + deliveryPrice + " so'm"
                            : 0 + " so'm"}
                        </p>
                      </div>
                      {/* <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p> */}

                      {/* <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          or
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500 ml-1'
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p> 
                      </div> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
