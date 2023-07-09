import axios from 'axios';
import { Category } from '../interfaces';

export default async function GetAllItems(category: Category) {
  return await axios({
    method: 'GET',
    url: 'https://food-delivery.saeed.uz/api/items',
    params: { category },
  });
}
