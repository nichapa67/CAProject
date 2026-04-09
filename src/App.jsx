import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import BoothMap from './BoothMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'


function App() {
  // 1. สร้าง State เพื่อเก็บสถานะการเปิด/ปิด (ค่าเริ่มต้นคือ false = ปิดอยู่)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="font-sans relative">
      
      {/* ==========================================
          ส่วนที่ 1: แถบด้านบน (Top Bar) สำหรับใส่ปุ่ม 3 ขีด
          ========================================== */}
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex items-center">
        {/* ปุ่ม 3 ขีด (Hamburger) กดแล้วให้ isSidebarOpen เป็น true */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-white text-black rounded-md hover:bg-gray-100 transition"
        >
          {/* ไอคอน 3 ขีด */}

          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span className="ml-4 font-bold text-pink-500 text-xl">Comic Avenue</span>
      </header>

      {/* ==========================================
          ส่วนที่ 2: ฉากหลังสีดำจางๆ (Overlay)
          ========================================== */}
      {/* จะแสดงก็ต่อเมื่อเปิด Sidebar อยู่ (isSidebarOpen === true) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)} // กดที่พื้นที่สีดำก็ปิดเมนูได้
        ></div>
      )}

      {/* ==========================================
          ส่วนที่ 3: ฝั่งซ้าย (Sidebar) - พับเก็บได้
          ========================================== */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* ปุ่มกากบาท (Close) กดแล้วให้ isSidebarOpen เป็น false */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition"
        >
          {/* ไอคอนกากบาท */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6 mt-10">
          <div className="text-pink-500 font-black text-3xl mb-10 text-center tracking-tighter">
            CA
          </div>

          {/* เมนูนำทาง */}
          <ul className="space-y-2">
             <li>
               <a href="#" className="block bg-pink-500 text-white px-4 py-3 rounded-full text-center font-bold shadow-md hover:bg-pink-600 transition">
                 หน้าแรก
               </a>
             </li>
             <li>
               <a href="#" className="block text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition flex items-center">
                 <span className="mr-3">📅</span> ข้อมูลกิจกรรม
               </a>
             </li>
             <li>
               <a href="#" className="block text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition flex items-center">
                 <span className="mr-3">📌</span> ผังงาน/ข้อมูล
               </a>
             </li>
          </ul>
        </div>
      </aside>

      {/* ==========================================
          ส่วนที่ 4: เนื้อหาหลัก (Main Content)
          ========================================== */}
        <main className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
          <div className="max-w-6xl mx-auto"> {/* ปรับจาก 4xl เป็น 6xl ให้กว้างขึ้นเพื่อรองรับแผนผัง */}
              
            <div className="flex items-center mb-8">
                <h1 className="text-3xl font-bold text-pink-500">
                  ผังงาน / ข้อมูลผู้ออกบูธ
                </h1>
            </div>

            {/* เรียกใช้งานแผนผังตรงนี้ */}
              <BoothMap />
              
          </div>
        </main>
    </div>
  )
}

export default App