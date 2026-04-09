// ProductDetail.jsx
import React, { useState } from 'react';

function ProductDetail({ product, onBack }) { 
  // 1. ดึงข้อมูลสินค้าที่ส่งมา หรือใช้ค่าเริ่มต้นเผื่อไว้กันพัง
  const currentProduct = product || { 
    name: "สติกเกอร์", 
    price: 40, 
    images: ["https://placehold.co/600x600/fbcfe8/ec4899?text=Product"],
    variations: []
  };

  // 2. ประกาศ State ต่างๆ ที่ต้องใช้ในหน้านี้
  const [mainImage, setMainImage] = useState(currentProduct.images?.[0] || `https://placehold.co/600x600/fbcfe8/ec4899?text=Product`);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 3. คำนวณสต็อกที่จะแสดง
  const displayStock = selectedVariation 
    ? selectedVariation.stock 
    : currentProduct.variations?.reduce((sum, v) => sum + v.stock, 0) || 0;

  // 4. ฟังก์ชันจัดการการกดปุ่ม + และ - สินค้า
  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'increase' && quantity < displayStock) setQuantity(q => q + 1);
  };

  // 5. โครงสร้าง UI (มี return เดียวแล้ว)
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-5xl mx-auto">
      
      {/* ====================================
          ปุ่มย้อนกลับ (จัดให้อยู่ด้านบนสุดของกล่อง)
          ==================================== */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-gray-500 hover:text-pink-500 font-bold transition"
      >
        <span className="mr-2">←</span> กลับไปหน้าร้านค้า
      </button>

      {/* ====================================
          ส่วนเนื้อหา แบ่งเป็น 2 ฝั่ง ซ้าย/ขวา
          ==================================== */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* ฝั่งซ้าย: รูปภาพ */}
        <div className="w-full md:w-5/12 flex flex-col gap-4">
          <img src={mainImage} alt={currentProduct.name} className="w-full aspect-square object-cover rounded-md border" />
          <div className="flex gap-2 overflow-x-auto">
            {currentProduct.images?.map((img, idx) => (
              <img 
                key={idx} src={img} alt="thumbnail" 
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${mainImage === img ? 'border-pink-500' : 'border-transparent'}`}
                onMouseEnter={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* ฝั่งขวา: รายละเอียด */}
        <div className="w-full md:w-7/12 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{currentProduct.name}</h1>
          
          {/* ราคา */}
          <div className="bg-gray-50 p-4 mt-4 rounded-md">
            <span className="text-3xl font-bold text-pink-500">฿{currentProduct.price}</span>
          </div>

          {/* ตัวเลือกสินค้า (Variations) */}
          {currentProduct.variations && currentProduct.variations.length > 0 && (
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-gray-500 font-medium">ตัวเลือก ({currentProduct.variations.length} แบบ):</span>
              <div className="flex flex-wrap gap-2">
                {currentProduct.variations.map((v) => (
                  <button
                    key={v.id}
                    disabled={v.stock === 0}
                    onClick={() => setSelectedVariation(v)}
                    className={`px-4 py-2 border rounded-md text-sm transition
                      ${v.stock === 0 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 
                        selectedVariation?.id === v.id ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400'
                      }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* จำนวน และ สต็อก */}
          <div className="mt-8 flex items-center gap-6">
            <span className="text-gray-500 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => handleQuantityChange('decrease')} className="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
              <input type="text" value={quantity} readOnly className="w-12 text-center border-x border-gray-300 py-1 outline-none" />
              <button onClick={() => handleQuantityChange('increase')} className="px-3 py-1 hover:bg-gray-100 text-gray-600">+</button>
            </div>
            <span className="text-gray-500 text-sm">
              {displayStock} pieces available {selectedVariation ? `(ลาย ${selectedVariation.name})` : ''}
            </span>
          </div>

          {/* ปุ่มกด */}
          <div className="mt-auto pt-8 flex gap-4">
            <button className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-md font-bold hover:bg-pink-50 transition flex items-center justify-center gap-2">
              <span>🔖</span> Reserved item
            </button>
            <button className="flex-1 bg-pink-500 text-white py-3 rounded-md font-bold hover:bg-pink-600 transition flex items-center justify-center gap-2 shadow-md">
              <span>🛒</span> Add to cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;