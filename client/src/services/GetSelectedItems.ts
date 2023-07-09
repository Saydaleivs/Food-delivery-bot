import axios from 'axios';

export default async function GetSelectedItems() {
  return await axios({
    method: 'GET',
    url: 'https://food-delivery.saeed.uz/api/selectedItems',
    params: JSON.parse(localStorage.getItem('products') || '{}'),
  });
}
