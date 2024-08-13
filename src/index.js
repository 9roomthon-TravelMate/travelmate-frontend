import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/HomePage';
import NotFound from './pages/NotFound';
import InfoMain from './pages/InfoMain';
import InfoArea from './pages/InfoArea';
import InfoPlace from './pages/InfoPlace';
import ScrollToTop from './ScrollToTop';
import LoginPage from './pages/UserLoginPage';
import TestPage from './pages/TestPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegionPage from './pages/RegionPage';
import DateRangePicker from './pages/DateRangePicker';
import PreferencesPage from './pages/PreferencesPage';
import SummaryPage from './pages/SummaryPage';
import Community from './pages/Community';
import  CreatePost from './pages/CreatePost';
import MyPage from './pages/MyPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/loginPage', element: <LoginPage /> },
      {
        path: '/InfoMain',
        element: <InfoMain />,
      },
      {
        path: '/InfoArea',
        element: <InfoArea />,
      },
      {
        path: '/InfoPlace/:id',
        element: <InfoPlace />,
      },
      { path: '/testpage', element: <ProtectedRoute element={<TestPage />} /> },
      {
        path: '/regionpage',
        element: <ProtectedRoute element={<RegionPage />} />,
      },
      {
        path: '/daterangepicker',
        element: <ProtectedRoute element={<DateRangePicker />} />,
      },
      {
        path: '/preferencespage',
        element: <ProtectedRoute element={<PreferencesPage />} />,
      },
      {
        path: '/summarypage',
        element: <ProtectedRoute element={<SummaryPage />} />,
      },
      {
        path: '/community',
        element: <ProtectedRoute element={<Community />} />,
      },
      {
        path: '/create-post',
        element: <ProtectedRoute element={<CreatePost />} />,
      },
      { 
        path: '/mypage', 
        element: <MyPage /> 
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
