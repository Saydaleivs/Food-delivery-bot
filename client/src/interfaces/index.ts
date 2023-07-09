export interface Product {
  description: string;
  id: number | string;
  image: string;
  name: string;
  price: string;
  type: string;
  value: number;
  amount: string;
}

export interface SideCartProptypes {
  products: Product[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category;
  getItems: (category: Category) => void;
  getSelectedItems: () => void;
  totalPrice: number;
  selectedProducts: object;
}

export interface Order {
  name: string;
  phone_number: string;
}

export type Category = 'ALL' | 'LAVASH' | 'BURGER' | 'DONAR' | 'SHASHLIK';
