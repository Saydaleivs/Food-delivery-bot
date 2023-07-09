import { Skeleton } from '@mui/material';

export const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
      }}
    >
      <div>
        <Skeleton
          sx={{ bgcolor: 'grey.300', borderRadius: 7 }}
          variant='rectangular'
          width={160}
          height={250}
        />
        <br />
        <Skeleton
          sx={{ bgcolor: 'grey.300', borderRadius: 7 }}
          variant='rectangular'
          width={160}
          height={250}
        />
      </div>
      <div>
        <Skeleton
          sx={{ bgcolor: 'grey.300', borderRadius: 7 }}
          variant='rectangular'
          width={160}
          height={250}
        />
        <br />
        <Skeleton
          sx={{ bgcolor: 'grey.300', borderRadius: 7 }}
          variant='rectangular'
          width={160}
          height={250}
        />
      </div>
    </div>
  );
};
