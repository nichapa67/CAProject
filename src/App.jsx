import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import BoothMap from './BoothMap';
import Sidebar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'


function App() {
  // 1. State ควบคุมการเปิด/ปิด Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 2. State ควบคุมหน้าปัจจุบัน (ค่าเริ่มต้นคือ 'home')
  const [currentPage, setCurrentPage] = useState('home');

  // ฟังก์ชันสำหรับเลือกแสดงเนื้อหาหลักตามหน้าปัจจุบัน
  const renderMainContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <div className="flex items-center mb-8">
              <h1 className="text-3xl font-bold text-pink-500">
                ผังงาน / ข้อมูลผู้ออกบูธ
              </h1>
            </div>
            <BoothMap />
          </>
        );
      case 'search':
        return (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl text-gray-500">หน้าค้นหาสินค้า (อยู่ระหว่างการพัฒนา)</h1>
          </div>
        );
      case 'cart':
        return <Cart />;
      case 'contact':
        return (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl text-gray-500">หน้าติดต่อเรา (อยู่ระหว่างการพัฒนา)</h1>
          </div>
        );
      default:
        return <BoothMap />;
    }
  };

  return (
    <div className="font-sans relative">
      
      {/* แถบด้านบน (Top Bar) */}
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex items-center">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-white text-black rounded-md hover:bg-gray-100 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span className="ml-4 font-bold text-pink-500 text-xl">Comic Avenue</span>
      </header>

      {/* เรียกใช้งาน Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* เนื้อหาหลัก (Main Content) */}
      <main className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* นำฟังก์ชันแสดงเนื้อหามาวางตรงนี้ */}
          {renderMainContent()}
        </div>
      </main>

    </div>
  );
}

export default App;