import { useState } from 'react';

export default function StorePage({ activeBooth, onBack }) {
  // สร้าง Array รวบรวมชื่อผู้สร้างทั้งหมด (เอาไว้ทำปุ่มแท็บ)
  const allCreators = ["ทั้งหมด", activeBooth.mainCreator, ...activeBooth.coCreators];
  
  // State สำหรับจำว่าตอนนี้ผู้ใช้กำลังกดดูสินค้าของ Creator คนไหนอยู่
  const [selectedCreator, setSelectedCreator] = useState("ทั้งหมด");

  // ฟังก์ชันกรองสินค้า: ถ้าเลือก "ทั้งหมด" ให้โชว์ทุกชิ้น ถ้าเลือกชื่อคนให้โชว์เฉพาะของคนนั้น
  const filteredProducts = activeBooth.products?.filter(p => 
    selectedCreator === "ทั้งหมด" ? true : p.creator === selectedCreator
  ) || [];

  return (
    <div className="bg-gray-50 rounded-3xl animate-fade-in w-full min-h-[800px] shadow-sm border border-gray-200 overflow-hidden relative">
      
      {/* แถบเมนูด้านบน (ย้อนกลับ) */}
      <div className="bg-white p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button 
          onClick={onBack} 
          className="flex items-center text-pink-500 hover:text-pink-600 font-bold transition bg-pink-50 px-4 py-2 rounded-full"
        >
          <span className="mr-2">←</span> ย้อนกลับไปแผนผัง
        </button>
        {/* เปลี่ยนเลขบูธเป็นสีดำ */}
        <span className="ml-auto text-black font-black text-lg">บูธ {activeBooth.boothNumbers.join(', ')}</span>
      </div>

      {/* ส่วน Header ร้านค้า (ภาพปกและโปรไฟล์) */}
      <div className="bg-white pb-6 shadow-sm mb-4">
        {/* ภาพปก (Banner) */}
        <div className="h-48 md:h-56 bg-gradient-to-r from-pink-300 to-purple-400 w-full relative">
          <img 
            src={activeBooth.coverImage || "https://placehold.co/1200x400/fbcfe8/ec4899"} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          
          {/* รูปโปรไฟล์ร้านค้า: เปลี่ยนเป็นกล่องสี่เหลี่ยมจัตุรัส */}
          <div className="absolute -bottom-12 left-8 w-32 h-32 bg-white rounded-2xl p-1 shadow-md">
            {/* object-cover จะทำให้ภาพ 700x700 หรือขนาดไหนก็ถูกครอปให้พอดีกรอบอัตโนมัติ */}
            <img 
              src={activeBooth.profileImage || "https://placehold.co/700x700/fbcfe8/ec4899?text=Logo"} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl border border-gray-100"
            />
          </div>
        </div>

        {/* ข้อมูลร้าน */}
        <div className="pt-16 px-8 flex flex-col items-start gap-1">
          {/* ดึงฟิลด์ชื่อบูธมาแสดง */}
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">{activeBooth.boothName || activeBooth.mainCreator}</h1>

          <p className="text-gray-600">{activeBooth.description}</p>
        </div>
      </div>

      {/* ส่วนตัวกรองและแสดงสินค้า (Products Area) */}
      <div className="p-4 md:p-8">
        
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4 sticky top-[72px] bg-gray-50 z-10 py-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center shrink-0">
            <span className="bg-pink-500 w-2 h-6 rounded-full mr-3"></span>
            สินค้าบูธนี้
          </h2>
          
          {/* แถบ Tabs สำหรับเลือกดูตาม Creator */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full xl:justify-end no-scrollbar">
            {allCreators.map(creator => (
              <button
                key={creator}
                onClick={() => setSelectedCreator(creator)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition border-2 ${
                  selectedCreator === creator 
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500'
                }`}
              >
                {creator === "ทั้งหมด" ? "🌟 รวมทั้งหมด" : `🎨 ${creator}`}
              </button>
            ))}
          </div>
        </div>
        
        {/* ตารางแสดงสินค้า */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group">
                
                {/* รูปสินค้า (กรอบจัตุรัส) */}
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img 
                    src={`https://placehold.co/400x400/f3f4f6/9ca3af?text=Product+${item.id}`} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {/* ป้ายกำกับเล็กๆ มุมขวาบน ว่าสินค้านี้เป็นของใคร */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-pink-600 shadow-sm border border-pink-100">
                    {item.creator}
                  </div>
                </div>

                {/* ข้อมูลสินค้า */}
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base line-clamp-2 leading-tight h-10">{item.name}</h3>
                  <p className="text-pink-500 font-black text-lg mt-3">฿{item.price}</p>
                </div>

              </div>
            ))}
          </div>
        ) : (
          // กรณีที่กดแท็บคนไหนแล้วคนนั้นไม่ได้ลงสินค้าไว้
          <div className="text-center py-20 text-gray-400 font-bold bg-white rounded-2xl border-2 border-dashed border-gray-200">
            ยังไม่มีสินค้าของ {selectedCreator}
          </div>
        )}
      </div>

    </div>
  );
}