import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './components/layout/MainLayout';
import KhachHang from './pages/KhachHang/KhachHang';
import DangNhap from './pages/DangNhap/DangNhap';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/api/v1/khach-hang" replace />} />

          <Route element={<MainLayout />}>
            {/* <Route path="/api/v1" element={<Home />} /> */}
            <Route path="/api/v1/khach-hang" element={<KhachHang />} />
            <Route path="/api/v1/thuoc" element={<About />} />
          </Route>

          <Route path="/api/v1/dang-nhap" element={<DangNhap />}/>
          <Route path="/api/v1/dang-ky" element={<NotFound />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </> 
  )
}

export default App
