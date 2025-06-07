import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './components/layout/MainLayout';
import KhachHang from './pages/KhachHang/KhachHang';
import DangNhap from './pages/DangNhap/DangNhap';
import "./icon"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/khach-hang" replace />} />

          <Route element={<MainLayout />}>
            {/* <Route path="/admin" element={<Home />} /> */}
            <Route path="/admin/khach-hang" element={<KhachHang />} />
            <Route path="/admin/thuoc" element={<About />} />
          </Route>

          <Route path="/admin/dang-nhap" element={<DangNhap />}/>
          <Route path="/admin/dang-ky" element={<NotFound />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </> 
  )
}

export default App
