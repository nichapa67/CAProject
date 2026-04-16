// src/Seller/SellerProduct.jsx
import React from 'react';

function SellerProduct({ user, eventData }) {
  // 1. ลอจิกดึงข้อมูลสินค้าเฉพาะของตัวเองจาก eventData
  const getMyProducts = () => {
    let allMyProducts = [];
    
    // วนลูปตามวันที่และบูธทั้งหมด
    for (const date in eventData) {
      eventData[date].forEach(booth => {
        if (booth.products) {
          // กรองเอาเฉพาะสินค้าที่ creator ตรงกับชื่อของคนที่ล็อคอิน
          const myItems = booth.products.filter(p => p.creator?.trim() === user?.username?.trim());
          allMyProducts = [...allMyProducts, ...myItems];
        }
      });
    }

    // ลบสินค้าที่ซ้ำกันออก (ในกรณีที่ลงขายหลายวันแล้ว ID ตรงกัน)
    const uniqueProducts = Array.from(new Map(allMyProducts.map(item => [item.id, item])).values());
    return uniqueProducts;
  };

  const myProducts = getMyProducts();

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Header และปุ่มเพิ่มสินค้า */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">จัดการสินค้า (Inventory)</h1>
          <p className="text-gray-500 mt-1">สินค้าทั้งหมดของ {user.username}</p>
        </div>
        <button className="bg-purple-600 text-white border-2 border-purple-600 px-5 py-2.5 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition duration-300 shadow-sm w-full md:w-auto whitespace-nowrap flex justify-center items-center gap-2">
          <span className="text-xl leading-none">+</span> เพิ่มสินค้าใหม่
        </button>
      </div>

      {/* ตารางรายการสินค้า */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-200 overflow-hidden">
        
        {/* ใส่ overflow-x-auto เพื่อให้ตารางเลื่อนซ้ายขวาได้ในมือถือ ไม่ล้นจอ */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="bg-purple-50 p-4 border-b-2 border-purple-400 text-purple-700 font-bold text-sm whitespace-nowrap">สินค้า (Product)</th>
                <th className="bg-purple-50 p-4 border-b-2 border-purple-400 text-purple-700 font-bold text-sm whitespace-nowrap">ราคา (Price)</th>
                <th className="bg-purple-50 p-4 border-b-2 border-purple-400 text-purple-700 font-bold text-sm whitespace-nowrap">รายละเอียด / สต็อก (Stock)</th>
                <th className="bg-purple-50 p-4 border-b-2 border-purple-400 text-purple-700 font-bold text-sm whitespace-nowrap text-center">จัดการ (Actions)</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400 font-medium">
                    คุณยังไม่มีสินค้าในระบบ กรุณากด "เพิ่มสินค้าใหม่"
                  </td>
                </tr>
              ) : (
                myProducts.map(product => {
                  // คำนวณสต็อกรวม ถ้ามี variations
                  const totalStock = product.variations 
                    ? product.variations.reduce((sum, v) => sum + v.stock, 0)
                    : "ไม่ระบุ";

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      
                      {/* คอลัมน์: รูปภาพและชื่อ */}
                      <td className="p-4 border-b border-gray-100 align-middle">
                        <div className="flex items-center gap-4">
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover border border-gray-200 shadow-sm shrink-0" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 rounded shrink-0 text-center leading-tight">
                              No<br/>Image
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800 text-sm md:text-base">{product.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* คอลัมน์: ราคา */}
                      <td className="p-4 border-b border-gray-100 align-middle">
                        <span className="font-bold text-purple-600 text-lg">฿{product.price}</span>
                      </td>

                      {/* คอลัมน์: สต็อกและรายละเอียด */}
                      <td className="p-4 border-b border-gray-100 align-middle">
                        {product.variations ? (
                          <div>
                            <span className="text-sm font-medium text-gray-700">มี {product.variations.length} ตัวเลือก</span>
                            <p className="text-xs text-gray-500 mt-1">สต็อกรวม: <span className="font-bold text-gray-800">{totalStock}</span> ชิ้น</p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">สินค้าเดี่ยว</span>
                        )}
                      </td>

                      {/* คอลัมน์: ปุ่มจัดการ (แก้ไข / ลบ) */}
                      <td className="p-4 border-b border-gray-100 align-middle text-center">
                        <div className="flex items-center justify-center gap-3 md:gap-4">
                          <button className="text-blue-500 font-bold text-sm hover:underline hover:text-blue-700 transition">
                            แก้ไข (Edit)
                          </button>
                          <button className="text-red-500 font-bold text-sm hover:underline hover:text-red-700 transition">
                            ลบ (Delete)
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellerProduct;