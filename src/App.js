import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <>
    <ScrollToTop>
      <Navbar />
      <Outlet />
    </ScrollToTop>
    </>
  );
}

export default App;
