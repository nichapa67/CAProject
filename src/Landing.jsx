import React from 'react';

function Landing({ setCurrentPage }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Welcome to Art List</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button 
          onClick={() => setCurrentPage('login')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium"
        >
          เข้าสู่ระบบผู้ซื้อ (Buyer Login)
        </button>
        
        <button 
          onClick={() => setCurrentPage('login')}
          className="w-full py-3 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 font-medium"
        >
          เข้าสู่ระบบผู้ขาย (Creator Zone)
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <button 
          onClick={() => setCurrentPage('home')}
          className="w-full py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 font-medium"
        >
          เข้าชมแบบธรรมดา (Guest View)
        </button>
      </div>
    </div>
  );
}

export default Landing;