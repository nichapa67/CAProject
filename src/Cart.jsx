// Cart.jsx
import React, { useState, useEffect } from 'react';

function Cart({ user }) {
  const [cartItems, setCartItems] = useState(user?.cart || []);

  useEffect(() => {
    if (user && user.cart) {
      setCartItems(user.cart);
    }
  }, [user]);

  const toggleItem = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleAll = (e) => {
    const isChecked = e.target.checked;
    setCartItems(cartItems.map(item => ({ ...item, checked: isChecked })));
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= item.stock) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };

  const selectedItems = cartItems.filter(item => item.checked);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    return <div className="text-center py-20 text-gray-500 font-bold text-xl">Please log in to view your cart.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-40 md:pb-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Shopping Cart of {user.username}</h1>
        <button className="text-pink-500 font-medium hover:underline flex items-center gap-1 text-sm md:text-base">
          <span>🕒</span> History
        </button>
      </div>

      {/* Table Header - Hidden on mobile (< 768px) */}
      <div className="bg-white p-4 rounded-t-lg border border-gray-200 hidden md:grid grid-cols-12 gap-2 text-gray-500 font-medium text-xs lg:text-sm uppercase tracking-wider">
        <div className="col-span-4 flex items-center gap-4">
          <input type="checkbox" onChange={toggleAll} checked={cartItems.length > 0 && selectedItems.length === cartItems.length} className="w-4 h-4 accent-pink-500 cursor-pointer"/>
          <span>Product</span>
        </div>
        <div className="col-span-2 text-center">In Stock</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Total Price</div>
        <div className="col-span-1 text-center">Type</div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Cart Items */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
        {cartItems.length === 0 ? (
          <div className="p-20 text-center text-gray-400">Your cart is empty.</div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="p-4 border-b border-gray-100 last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition">
              
              {/* Product Info */}
              <div className="md:col-span-4 flex items-center gap-4">
                <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} className="w-4 h-4 accent-pink-500 cursor-pointer shrink-0" />
                <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover border rounded shadow-sm" />
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 truncate text-sm md:text-base">{item.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">Var: {item.variation}</p>
                </div>
              </div>
              
              {/* Stock (Label shown on mobile) */}
              <div className="md:col-span-2 text-left md:text-center text-gray-600 text-sm">
                <span className="md:hidden font-medium text-gray-400 mr-2">In Stock:</span>
                {item.stock} pcs
              </div>

              {/* Quantity */}
              <div className="md:col-span-2 flex justify-start md:justify-center items-center">
                <span className="md:hidden font-medium text-gray-400 mr-6">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600 border-r transition">-</button>
                  <input type="text" value={item.quantity} readOnly className="w-10 text-center text-xs md:text-sm outline-none bg-white" />
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600 border-l transition">+</button>
                </div>
              </div>

              {/* Total Price */}
              <div className="md:col-span-2 text-left md:text-center font-bold text-pink-500 text-base md:text-lg">
                <span className="md:hidden font-medium text-gray-400 mr-2">Total:</span>
                ฿{item.price * item.quantity}
              </div>

              {/* Type Badge */}
              <div className="md:col-span-1 flex justify-start md:justify-center">
                <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-tight shadow-sm ${
                  item.type === 'Reserved' 
                    ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                    : 'bg-blue-100 text-blue-600 border border-blue-200'
                }`}>
                  {item.type}
                </span>
              </div>

              {/* Action */}
              <div className="md:col-span-1 text-right md:text-center">
                <button className="text-gray-400 hover:text-red-500 transition text-sm font-medium">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_15px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-6xl mx-auto p-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Select/Delete */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-b sm:border-0 pb-3 sm:pb-0">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" onChange={toggleAll} checked={cartItems.length > 0 && selectedItems.length === cartItems.length} className="w-4 h-4 accent-pink-500" />
              <span className="text-gray-700 font-medium group-hover:text-pink-500 transition text-sm md:text-base">
                Select All ({cartItems.length})
              </span>
            </label>
            <button className="text-gray-400 hover:text-red-500 font-medium text-sm transition">Delete Selected</button>
          </div>

          {/* Right Side: Total & Actions */}
          <div className="flex flex-col xs:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="text-center sm:text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
              <span className="text-gray-500 text-xs md:text-sm">Total ({totalQuantity} items):</span>
              <span className="text-xl md:text-2xl font-black text-pink-500 leading-none">฿{totalPrice}</span>
            </div>
            
            <div className="flex gap-2 w-full xs:w-auto">
              <button disabled={selectedItems.length === 0} className="flex-1 xs:flex-none bg-orange-500 disabled:bg-gray-200 text-white px-4 lg:px-8 py-2 md:py-3 rounded-lg hover:bg-orange-600 font-bold transition shadow-md active:scale-95 text-sm md:text-base">
                Reserved
              </button>
              <button disabled={selectedItems.length === 0} className="flex-1 xs:flex-none bg-pink-500 disabled:bg-gray-200 text-white px-4 lg:px-8 py-2 md:py-3 rounded-lg hover:bg-pink-600 font-bold transition shadow-md active:scale-95 text-sm md:text-base">
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