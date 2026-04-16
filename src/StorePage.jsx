import { useState } from 'react';
import ProductDetail from './ProductDetail'; // 1. อย่าลืม Import เข้ามา

export default function StorePage({ activeBooth, onBack, onRequireAuth }) {
  const allCreators = ["ทั้งหมด", activeBooth.mainCreator, ...(activeBooth.coCreators || [])];
  const [selectedCreator, setSelectedCreator] = useState("ทั้งหมด");
  
  // 2. สร้าง State เพื่อจำว่ากดสินค้าชิ้นไหนอยู่ (ค่าเริ่มต้นคือ null = ยังไม่ได้กด)
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = activeBooth.products?.filter(p => 
    selectedCreator === "ทั้งหมด" ? true : p.creator === selectedCreator
  ) || [];

  // 3. ถ้ามีการกดเลือกสินค้า ให้แสดงหน้า ProductDetail แทน
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        // ส่งฟังก์ชันไปให้ ProductDetail เพื่อใช้ทำปุ่ม "ย้อนกลับมาร้านค้า"
        onBack={() => setSelectedProduct(null)}
        // ส่งฟังก์ชันไปให้ ProductDetail เพื่อใช้ทำปุ่ม "ย้อนกลับมาร้านค้า"
        onRequireAuth={onRequireAuth}
      />
    );
  }

  // 4. โค้ดส่วนหน้าร้านค้าเดิมของคุณ (เพิ่มแค่ onClick ที่การ์ดสินค้า)
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
        <span className="ml-auto text-black font-black text-lg">บูธ {activeBooth.boothNumbers.join(', ')}</span>
      </div>

      {/* ส่วน Header ร้านค้า (ภาพปกและโปรไฟล์) */}
      <div className="bg-white pb-6 shadow-sm mb-4">
        {/* ... (โค้ด Header เดิมของคุณ) ... */}
        <div className="h-72 md:h-96 bg-gradient-to-r from-pink-300 to-purple-400 w-full relative">
          <img src={activeBooth.coverImage || "https://placehold.co/1200x1000/fbcfe8/ec4899"} alt="Cover" className="w-full h-full object-contain object-cover" />
          <div className="absolute -bottom-12 left-8 w-32 h-32 bg-white rounded-2xl p-1 shadow-md">
            <img src={activeBooth.profileImage || "https://placehold.co/700x700/fbcfe8/ec4899?text=Logo"} alt="Profile" className="w-full h-full object-cover rounded-xl border border-gray-100" />
          </div>
        </div>
        <div className="pt-16 px-8 flex flex-col items-start gap-1">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">{activeBooth.boothName || activeBooth.mainCreator}</h1>
          <p className="text-gray-600">{activeBooth.description}</p>
        </div>
      </div>

      {/* ส่วนตัวกรองและแสดงสินค้า */}
      <div className="p-4 md:p-8">
        <div className="flex flex-col mb-8 gap-4 sticky top-[72px] bg-gray-50 z-10 py-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center shrink-0">
            <span className="bg-pink-500 w-2 h-6 rounded-full mr-3"></span> สินค้าบูธนี้
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
            {allCreators.map(creator => (
              <button
                key={creator}
                onClick={() => setSelectedCreator(creator)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition border-2 ${
                  selectedCreator === creator ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500'
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
              <div 
                key={item.id} 
                // 5. เพิ่ม onClick ตรงนี้! พอกดแล้วให้ Set ข้อมูลสินค้าลง State
                onClick={() => setSelectedProduct(item)} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  {/* ... (โค้ดรูปสินค้าด้านในเหมือนเดิม) ... */}
                  <img src={item.images?.[0] || `https://placehold.co/400x400/f3f4f6/9ca3af?text=Product+${item.id}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-pink-600 shadow-sm border border-pink-100">
                    {item.creator}
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base line-clamp-2 leading-tight h-10">{item.name}</h3>
                  <p className="text-pink-500 font-black text-lg mt-3">฿{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold bg-white rounded-2xl border-2 border-dashed border-gray-200">
            ยังไม่มีสินค้าของ {selectedCreator}
          </div>
        )}
      </div>

    </div>
  );
}