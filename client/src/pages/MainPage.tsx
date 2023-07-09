import { useEffect, useState } from 'react';
import Products from '../components/Products';
import SideCart from '../components/SideCart';
import TheNavbar from '../components/TheNavbar';
import CategoryTabs from '../components/CategoryTabs';
import TotalPrice from '../components/TotalPrice';
import GetSelectedItems from '../services/GetSelectedItems';
import GetAllItems from '../services/GetAllItems';
import CalculateTotalPrice from '../utils/CalculateTotalPrice';
import { Category, Product } from '../interfaces';

function MainPage() {
  const [items, setItems] = useState<Product[]>();
  const [category, setCategory] = useState<Category>('ALL');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<object>(
    JSON.parse(localStorage.getItem('products') || '{}')
  );
  console.log(selectedProducts);

  const getItems = async (category: Category) => {
    const response = await GetAllItems(category);
    setItems(response.data);
    setSelectedProducts(JSON.parse(localStorage.getItem('products') || '{}'));
  };

  async function fetchMyItems() {
    const response = await GetSelectedItems();
    CalculateTotalPrice(response.data, setTotalPrice);
    setSelectedItems(response.data);
  }

  useEffect(() => {
    if (!items) {
      getItems('ALL');
    }
    fetchMyItems();
  }, []);

  return (
    <>
      <div>
        <TheNavbar open={open} setOpen={setOpen} />
        <div className='mx-auto max-w-2xl px-4 py-3 pb-28 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 flex-wrap'>
          <SideCart
            open={open}
            setOpen={setOpen}
            totalPrice={totalPrice}
            products={selectedItems}
            selectedProducts={selectedProducts}
            getItems={getItems}
            category={category}
            getSelectedItems={fetchMyItems}
          />
          <CategoryTabs
            setCategory={setCategory}
            getItems={getItems}
            setItems={setItems}
          />
          <div
            className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Products
              products={items}
              getSelectedItems={fetchMyItems}
              selectedProducts={selectedProducts || {}}
              setSelectedProducts={setSelectedProducts}
            />

            <TotalPrice setOpen={setOpen} open={open} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
