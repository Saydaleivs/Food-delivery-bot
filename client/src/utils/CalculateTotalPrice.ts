import { Product } from '../interfaces';

export default function CalculateTotalPrice(
  data: Product[],
  setPrice: React.Dispatch<React.SetStateAction<number>>
) {
  if (data.length === 0) {
    setPrice(0);
    return;
  }

  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total = total + +data[i].amount * data[i].value;
  }

  setPrice(total);
}
