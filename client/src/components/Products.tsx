import { Loader } from './Loader';
import { Product } from '../interfaces';
import { SingleProduct } from './SingleProduct';

interface SingleProductPropTypes {
  products: Product[] | undefined;
  getSelectedItems: () => void;
  selectedProducts: any;
  setSelectedProducts: React.Dispatch<React.SetStateAction<object>>;
}

const Products = ({
  products,
  getSelectedItems,
  selectedProducts,
  setSelectedProducts,
}: SingleProductPropTypes) => {
  function addToCart(id: string) {
    selectedProducts[id] ? selectedProducts[id]++ : (selectedProducts[id] = 1);
    setSelectedProducts({ ...selectedProducts });
    localStorage.setItem('products', JSON.stringify(selectedProducts));
    getSelectedItems();
  }

  function removeFromCart(id: string) {
    if (selectedProducts[id]) {
      selectedProducts[id] < 2
        ? delete selectedProducts[id]
        : (selectedProducts[id] -= 1);
    }

    setSelectedProducts({ ...selectedProducts });
    localStorage.setItem('products', JSON.stringify(selectedProducts));
    getSelectedItems();
  }

  return (
    <>
      {!products ? (
        <Loader />
      ) : (
        products?.map((product: Product) => {
          if (typeof selectedProducts !== 'object') {
            selectedProducts = JSON.parse(selectedProducts);
          }
          return (
            <SingleProduct
              key={product.id}
              product={product}
              selectedProducts={selectedProducts}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            />
          );
        })
      )}
    </>
  );
};

export default Products;
