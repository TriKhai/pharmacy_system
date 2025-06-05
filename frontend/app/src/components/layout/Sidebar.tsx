import { NavLink } from "react-router-dom";

interface NavLink {
    path: string,
    label: string,
    icon: string
}

const Sidebar:React.FC = () => {

    const navLinks: NavLink[] = [
        { path: "/api/v1/khach-hang", label: "Khách hàng", icon: '+ '},
        { path: "/api/v1/thuoc", label: "Thuốc", icon: '+ '},
        { path: "/api/v1/hoa-don", label: "Hóa Đơn", icon: '+ '},
        { path: "/api/v1/thong-ke", label: "Thống Kê", icon: '+ '},
        { path: "/api/v1/xuat-file", label: "Xuất file", icon: '+ '},
    ];

    // CSS variable
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 ${isActive ? "active bg-[#0E8DA1] p-5 text-white " : "p-5 hover:bg-[#12B0C2] hover:text-white"}`;

    return (
      <div className="h-screen w-[15vw] bg-gray-100 text-black flex flex-col justify-between">
        <div>
          <div className="">
            {navLinks.map(({ path, label, icon }) => (
              <div className="text-xl " key={path}>
                <NavLink
                  to={path}
                  className={getLinkClass}
                >
                  {icon}
                  {label}
                </NavLink>
              </div>
            ))}
            <div className="text-xl">
              <button className="p-4">Đăng xuất</button> 
            </div>
          </div>
        </div>

        <div className="border-t py-2 text-center">© 2025 Pharmacy System</div>
    </div>
  );
}

export default Sidebar;