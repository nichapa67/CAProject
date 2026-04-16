import React, { useState } from 'react';
// Import ฐานข้อมูลจำลองจากไฟล์ mockUsers.js (เช็ค path ให้ตรงกับที่เซฟไฟล์ไว้นะครับ)
import { mockUsers } from './mockUsers'; 

function Login({ setCurrentPage, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ค้นหาอีเมลในระบบจาก mockUsers ที่เรา Import เข้ามา
    const foundUser = mockUsers.find(user => user.email === email);

    if (foundUser) {
      // ตั้งค่า User และเด้งไปหน้าหลัก 
      // (ดึง id และ profileImage มาเก็บไว้ด้วย เผื่อเอาไปแสดงผลในหน้าอื่นๆ)
      setUser({ 
        id: foundUser.id,
        username: foundUser.username, 
        role: foundUser.role,
        profileImage: foundUser.profileImage,
        cart: foundUser.cart
      });
      setCurrentPage('home'); 
    } else {
      alert("ไม่พบอีเมลนี้ในระบบ โปรดตรวจสอบอีกครั้ง");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Please sign in</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>

          <button type="submit" className="w-full py-3 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md transition">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account yet? <span onClick={() => setCurrentPage('signup')} className="text-blue-600 cursor-pointer hover:underline font-bold">Click here</span> to sign up
        </p>

      </div>
    </div>
  );
}

export default Login;