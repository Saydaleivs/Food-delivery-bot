import { useSearchParams, useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function TheNavbar({ open, setOpen }) {
  const { contact } = useParams();

  const [params] = useSearchParams();
  const name = params.get('name');

  return (
    <>
      <div className='flex items-center justify-between py-2 px-4 text-blue-gray-900'>
        <div className='text-white bg-zinc-800 rounded-2xl py-2 px-3'>
          <Typography
            as='a'
            href={'https://t.me/+' + contact}
            className='cursor-pointer py-1.5 font-medium'
          >
            {!name ? (
              <>
                Order can only be via{' '}
                <span style={{ color: '#7272ff' }}>telegram bot</span>
              </>
            ) : (
              'Logged in as '
            )}

            {name}
          </Typography>
        </div>
        <div
          className='text-white bg-zinc-800 rounded-2xl py-2 px-3'
          onClick={() => setOpen(!open)}
        >
          <ShoppingCartIcon />
        </div>
      </div>
    </>
  );
}
