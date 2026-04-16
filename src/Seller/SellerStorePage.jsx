// src/Seller/SellerStorePage.jsx
import React, { useState } from 'react';
import ProductDetail from '../ProductDetail'; 

function SellerStorePage({ user, eventData }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State สำหรับตัวกรองชื่อคนวาด (เริ่มที่ "ทั้งหมด")
  const [selectedCreator, setSelectedCreator] = useState("ทั้งหมด");

  // --- ฟังก์ชันค้นหาบูธที่รองรับทั้ง Main Creator และ Co-Creators ---
  const findMyBooth = () => {
    for (const date in eventData) {
      const booth = eventData[date].find(b => {
        const isMainCreator = b.mainCreator?.trim().toLowerCase() === user.username?.trim().toLowerCase();
        const isCoCreator = b.coCreators?.some(name => name.trim().toLowerCase() === user.username?.trim().toLowerCase());
        return isMainCreator || isCoCreator;
      });
      if (booth) return booth;
    }
    return null;
  };

  const myBooth = findMyBooth();

  // กรณีหาบูธไม่เจอ
  if (!myBooth) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <span className="text-5xl mb-4">🏪</span>
        <h2 className="text-xl font-bold text-gray-500">ไม่พบข้อมูลบูธของคุณในระบบ</h2>
        <p className="text-gray-400">โปรดติดต่อเจ้าหน้าที่เพื่อลงทะเบียนบูธ</p>
      </div>
    );
  }

  // --- เตรียมข้อมูลสำหรับตัวกรอง (Filter) ---
  // รวมรายชื่อนักวาดทุกคนในบูธนี้ (Main + Co-Creators)
  const allCreators = ["ทั้งหมด", myBooth.mainCreator, ...(myBooth.coCreators || [])];
  
  // กรองสินค้าตามชื่อที่เลือก
  const filteredProducts = myBooth.products?.filter(p => 
    selectedCreator === "ทั้งหมด" ? true : p.creator === selectedCreator
  ) || [];

  // หากกดดูรายละเอียดสินค้า
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        // แจ้งเตือนเมื่อ Seller พยายามกดซื้อ/จอง
        onRequireAuth={() => alert('ต้องเข้าเป็น Buyer Login หรือ Guest View เท่านั้น จึงจะสามารถทำรายการนี้ได้')} 
      />
    );
  }

  return (
    <div className="bg-gray-50 rounded-3xl animate-fade-in w-full min-h-[800px] shadow-sm border border-purple-100 overflow-hidden relative">
      
      {/* Header ส่วนของร้านค้า (ธีมสีม่วงสำหรับ Seller) */}
      <div className="bg-white pb-6 shadow-sm mb-4">
        <div className="h-72 md:h-96 bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 w-full relative">
          <img 
            src={myBooth.coverImage || "https://placehold.co/1200x400/e9d5ff/9333ea?text=Cover"} 
            alt="Cover" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute -bottom-12 left-8 w-32 h-32 bg-white rounded-2xl p-1 shadow-md border-2 border-purple-500 bg-white">
            <img 
              src={myBooth.profileImage || "https://placehold.co/700x700/ffffff/9333ea?text=Logo"} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
        </div>

        <div className="pt-16 px-8 flex flex-col items-start gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
              {myBooth.boothName || myBooth.mainCreator}
            </h1>
            <span className="bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
              YOUR BOOTH
            </span>
          </div>
          <p className="text-gray-600 mt-1 max-w-2xl">{myBooth.description}</p>
          <div className="mt-2 flex gap-2">
             <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
               Booth: {myBooth.boothNumbers.join(', ')}
             </span>
          </div>
        </div>
      </div>

      {/* ส่วนจัดการแสดงสินค้า */}
      <div className="p-4 md:p-8">
        
        {/* แถบตัวกรอง (Filter) แบบเดียวกับที่ผู้ซื้อเห็น แต่ลบปุ่มเพิ่มสินค้าออก */}
        <div className="flex flex-col mb-8 gap-4 sticky top-[72px] bg-gray-50 z-10 py-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center shrink-0">
            <span className="bg-purple-500 w-2 h-6 rounded-full mr-3"></span> 
            สินค้าในบูธ ({myBooth.products?.length || 0} รายการ)
          </h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
            {allCreators.map(creator => (
              <button
                key={creator}
                onClick={() => setSelectedCreator(creator)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition border-2 ${
                  selectedCreator === creator 
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
                }`}
              >
                {creator === "ทั้งหมด" ? "🌟 รวมทั้งหมด" : `🎨 ${creator}`}
              </button>
            ))}
          </div>
        </div>
        
        {/* ตารางแสดงสินค้าทั้งหมดในบูธ */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedProduct(item)} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img 
                    src={item.images?.[0] || `https://placehold.co/400x400/f3f4f6/9ca3af?text=Product`} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  {/* ป้ายชื่อคนวาดมุมขวาบนเหมือนฝั่งผู้ซื้อ */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-purple-600 shadow-sm border border-purple-100">
                    {item.creator}
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base line-clamp-2 leading-tight h-10">
                    {item.name}
                  </h3>
                  <p className="text-purple-600 font-black text-xl mt-3">฿{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold bg-white rounded-2xl border-2 border-dashed border-gray-200">
            ไม่มีสินค้าของ {selectedCreator} ในบูธนี้
          </div>
        )}

      </div>
    </div>
  );
}

export default SellerStorePage;