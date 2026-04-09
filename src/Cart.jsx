import React, { useState } from 'react';

function Cart() {
  // ข้อมูลจำลองในตะกร้า
  const [cartItems, setCartItems] = useState([
    { id: 'c1', name: "สติกเกอร์ไดคัท", variation: "ลายแมวส้ม", price: 40, quantity: 2, stock: 15, checked: false, image: "https://placehold.co/100x100/fbcfe8/ec4899" },
    { id: 'c2', name: "พวงกุญแจอะคริลิค", variation: "Ploy", price: 80, quantity: 1, stock: 30, checked: false, image: "https://placehold.co/100x100/bfdbfe/3b82f6" },
  ]);

  const toggleItem = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleAll = (e) => {
    const isChecked = e.target.checked;
    setCartItems(cartItems.map(item => ({ ...item, checked: isChecked })));
  };

  const selectedItems = cartItems.filter(item => item.checked);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto pb-32"> {/* เว้นที่ให้แถบด้านล่าง */}
      
      {/* ส่วนหัวตะกร้า */}
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <button className="text-pink-500 font-medium hover:underline flex items-center gap-1">
          <span>🕒</span> History
        </button>
      </div>

      {/* หัวตาราง */}
      <div className="bg-white p-4 rounded-t-lg border border-gray-200 hidden md:grid grid-cols-12 gap-4 text-gray-500 font-medium text-sm">
        <div className="col-span-5 flex items-center gap-4">
          <input type="checkbox" onChange={toggleAll} checked={cartItems.length > 0 && selectedItems.length === cartItems.length} className="w-4 h-4 accent-pink-500"/>
          <span>Product</span>
        </div>
        <div className="col-span-2 text-center">In Stock</div> {/* เปลี่ยนจาก Unit Price */}
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Total Price</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {/* รายการสินค้า */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-lg mb-4">
        {cartItems.map(item => (
          <div key={item.id} className="p-4 border-b border-gray-100 last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="col-span-5 flex items-center gap-4">
              <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} className="w-4 h-4 accent-pink-500" />
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover border rounded" />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Variations: {item.variation}</p>
              </div>
            </div>
            
            {/* สต็อกที่มี */}
            <div className="col-span-2 text-center text-gray-600">
              {item.stock} pieces
            </div>

            <div className="col-span-2 flex justify-center">
              <div className="flex items-center border border-gray-300 rounded">
                <button className="px-2 py-1 hover:bg-gray-100">-</button>
                <input type="text" value={item.quantity} readOnly className="w-10 text-center text-sm border-x outline-none py-1" />
                <button className="px-2 py-1 hover:bg-gray-100">+</button>
              </div>
            </div>

            <div className="col-span-2 text-center font-medium text-pink-500">
              ฿{item.price * item.quantity}
            </div>

            <div className="col-span-1 text-center">
              <button className="text-gray-500 hover:text-red-500 transition text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          แถบด้านล่าง (Fixed Bottom Bar)
          ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* ฝั่งซ้าย: Select All / Delete */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" onChange={toggleAll} checked={cartItems.length > 0 && selectedItems.length === cartItems.length} className="w-4 h-4 accent-pink-500" />
              <span className="text-gray-700">Select All ({cartItems.length})</span>
            </label>
            <button className="text-gray-500 hover:text-red-500">Delete</button>
          </div>

          {/* ฝั่งขวา: ยอดรวม และ ปุ่มกด */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-gray-600 mr-2">Total ({totalQuantity} item):</span>
              <span className="text-2xl font-bold text-pink-500">฿{totalPrice}</span>
            </div>
            
            {/* 2 ปุ่มตามที่รีเควส */}
            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 font-medium transition shadow-sm">
                Reserved
              </button>
              <button className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600 font-medium transition shadow-sm">
                Purchased
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Cart;