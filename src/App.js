import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './ScrollToTop';
import 'simplebar-react/dist/simplebar.min.css';

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