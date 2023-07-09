import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFromTelegram from './pages/NotFromTelegram';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NotFromTelegram />} />
          <Route path='/:contact' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
