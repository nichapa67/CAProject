// src/Seller/SellerApp.jsx
import React, { useState } from 'react';
import SellerSidebar from './SellerSidebar';
import SellerStorePage from './SellerStorePage';
import SellerProduct from './SellerProduct';


// รับ eventData มาจาก App.jsx
function SellerApp({ user, isSidebarOpen, setIsSidebarOpen, eventData }) { 
  const [currentPage, setCurrentPage] = useState('homepage');

  const renderContent = () => {
    switch (currentPage) {
      case 'homepage':
        // ส่งทั้ง user และ eventData ให้หน้าร้านค้า
        return <SellerStorePage user={user} eventData={eventData} />;
      
      case 'product':
        return <SellerProduct user={user} eventData={eventData} />;
      
      // ... case อื่นๆ (Calculate, Conclusion, Contact) เหมือนเดิม
      
      default:
        return <SellerStorePage user={user} eventData={eventData} />;
    }
  };

  return (
    <>
      <SellerSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </>
  );
}

export default SellerApp;