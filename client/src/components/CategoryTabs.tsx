import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Category, Product } from '../interfaces';

interface CategoryTabsProptypes {
  getItems: (category: Category) => void;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setItems: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
}

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgb(24 24 27)',
  },
});

export default function CategoryTabs({
  getItems,
  setCategory,
  setItems,
}: CategoryTabsProptypes) {
  const [value, setValue] = React.useState(0);
  const [categories] = React.useState<{ label: string }[]>([
    { label: 'All' },
    { label: 'Lavash' },
    { label: 'Burger' },
    { label: 'Donar' },
    { label: 'Shashlik' },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (!event.currentTarget.textContent) return;

    const selectedCategory: Category =
      event.currentTarget.textContent.toLocaleUpperCase() as Category;

    getItems(selectedCategory);
    setCategory(selectedCategory);
    setValue(newValue);
    setItems(undefined);
  };

  return (
    <Box
      className='mb-6 w-full m-auto'
      sx={{
        maxWidth: { xs: '100%', sm: 'max-content' },
        bgcolor: 'background.paper',
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <AntTabs
        value={value}
        onChange={handleChange}
        style={{
          maxWidth: 'max-content',
          borderRadius: 20,
        }}
        variant='scrollable'
        scrollButtons={false}
        allowScrollButtonsMobile
        aria-label='scrollable force tabs example'
      >
        {categories?.map((label) => {
          return (
            <Tab
              key={label.label}
              label={label.label}
              style={{ color: 'rgb(41 37 36)' }}
            />
          );
        })}
      </AntTabs>
    </Box>
  );
}
