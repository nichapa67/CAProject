import { useState, useEffect, useRef } from 'react';
import { eventData } from './mockData';

export default function BoothMap() {
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [activeBooth, setActiveBooth] = useState(null);
  
  // State สำหรับจัดการการซูม และ Ref สำหรับดึงขนาดหน้าจอ
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);

  const currentDayData = eventData[selectedDate] || [];

  const getBoothData = (boothNumber) => {
    return currentDayData.find(booth => booth.boothNumbers.includes(boothNumber));
  };

  const handleBoothClick = (boothNumber) => {
    const data = getBoothData(boothNumber);
    if (data) {
      setActiveBooth(data);
    } else {
      alert(`บูธ ${boothNumber} ยังว่างอยู่ครับ!`);
    }
  };

  // ========================================================
  // ฟังก์ชันคำนวณ Auto-Zoom ให้เห็นภาพรวมทั้งหมดเมื่อเปิดหน้าเว็บ
  // ========================================================
  useEffect(() => {
    const fitToScreen = () => {
      if (containerRef.current) {
        // ความกว้างของพื้นที่หน้าจอ ณ ตอนนั้น ลบขอบนิดหน่อย
        const containerWidth = containerRef.current.clientWidth;
        const mapIdealWidth = 1300; // ความกว้างล็อกตายตัวของแผนผังที่เราวาดไว้
        
        if (containerWidth < mapIdealWidth) {
          // ถ้าย่อจอเล็กกว่า 1300px ให้คำนวณสัดส่วนซูมออกอัตโนมัติ
          setZoomLevel(containerWidth / mapIdealWidth);
        } else {
          setZoomLevel(1);
        }
      }
    };

    fitToScreen(); // ทำงานครั้งแรกตอนโหลดเว็บ
    window.addEventListener('resize', fitToScreen); // ทำงานเวลาผู้ใช้ลากย่อ/ขยายหน้าต่างเบราว์เซอร์
    return () => window.removeEventListener('resize', fitToScreen);
  }, []);

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.3));
  const resetZoom = () => setZoomLevel(1);

  // ========================================================
  // ฟังก์ชัน 1: สร้างแถว "แนวนอน" (สำหรับแถว A)
  // ========================================================
  const renderRowHorizontal = (letter, start, end) => {
    let booths = [];
    for (let i = start; i <= end; i++) {
      const numStr = i.toString().padStart(2, '0');
      const boothId = `${letter}${numStr}`;
      const isOccupied = getBoothData(boothId);
      
      booths.push(
        <button
          key={boothId}
          onClick={() => handleBoothClick(boothId)}
          className={`w-8 h-8 text-[10px] border border-gray-400 rounded flex items-center justify-center transition-all shadow-sm shrink-0
            ${isOccupied ? 'bg-pink-300 hover:bg-pink-400 font-bold text-gray-800' : 'bg-white hover:bg-gray-100 text-gray-500'}
          `}
        >
          {numStr}
        </button>
      );

      // เงื่อนไขการเว้นช่องว่างของแถว A
      if (i === 16) {
        booths.push(<div key={`gap-${i}`} className="w-20 shrink-0" />); // เว้นเยอะตรงกลาง
      } else if ([4, 8, 12, 20, 24, 28].includes(i)) {
        booths.push(<div key={`gap-${i}`} className="w-4 shrink-0" />); // เว้นนิดนึง
      }
    }
    return (
      // ปรับแก้ตรงนี้: ให้กินพื้นที่ w-full และใช้ justify-between จัดให้ตัวอักษร A ดันไปติดขอบสุด
      <div className="flex items-center justify-between bg-cyan-50 p-4 rounded-xl border border-cyan-200 mb-6 shadow-sm w-full">
        <span className="text-3xl font-black text-cyan-800 w-10 shrink-0 text-left">{letter}</span>
        <div className="flex gap-1 flex-nowrap justify-center flex-1">
          {booths}
        </div>
        <span className="text-3xl font-black text-cyan-800 w-10 shrink-0 text-right">{letter}</span>
      </div>
    );
  };

  // ========================================================
  // ฟังก์ชัน 2: สร้างแถว "แนวตั้ง" (สำหรับ B, O และ C ถึง N)
  // ========================================================
  const renderColumnVertical = (letter, start, end, type = 'center') => {
    let booths = [];
    for (let i = end; i >= start; i--) { 
      const numStr = i.toString().padStart(2, '0');
      const boothId = `${letter}${numStr}`;
      const isOccupied = getBoothData(boothId);
      
      booths.push(
        <button
          key={boothId}
          onClick={() => handleBoothClick(boothId)}
          className={`w-10 h-7 text-[10px] border border-gray-400 rounded flex items-center justify-center transition-all shadow-sm shrink-0
            ${isOccupied ? 'bg-pink-300 hover:bg-pink-400 font-bold text-gray-800' : 'bg-white hover:bg-gray-100 text-gray-500'}
          `}
        >
          {numStr}
        </button>
      );

      // เงื่อนไขการเว้นช่องว่างแนวตั้ง
      if (type === 'side') {
        if (i === 17) {
          booths.push(<div key={`gap-${i}`} className="h-20 shrink-0" />); // เว้นเยอะระหว่าง 17 กับ 16
        } else if ([29, 25, 21, 13, 9, 5].includes(i)) {
          booths.push(<div key={`gap-${i}`} className="h-4 shrink-0" />); // เว้นนิดนึง
        }
      } 
      else if (type === 'center') {
        // กลุ่ม C-N ตามเงื่อนไขเป๊ะๆ
        if ([31, 27, 21, 15, 9, 5].includes(i)) {
          booths.push(<div key={`gap-${i}`} className="h-4 shrink-0" />); 
        }
      }
    }

    return (
      <div className="flex flex-col gap-1 items-center bg-cyan-50 px-2 py-3 rounded-xl border border-cyan-200 shadow-sm shrink-0">
        <span className="text-xl font-black text-cyan-800 mb-2">{letter}</span>
        {booths}
        <span className="text-xl font-black text-cyan-800 mt-2">{letter}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
      
      {/* ส่วนเลือกวันที่ */}
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={() => setSelectedDate("2026-05-30")}
          className={`px-6 py-2 rounded-full font-bold transition ${selectedDate === "2026-05-30" ? "bg-pink-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          Day 1: 30 May 2026
        </button>
        <button 
          onClick={() => setSelectedDate("2026-05-31")}
          className={`px-6 py-2 rounded-full font-bold transition ${selectedDate === "2026-05-31" ? "bg-pink-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          Day 2: 31 May 2026
        </button>
      </div>

      {/* แผงควบคุมการซูม */}
      <div className="flex justify-end gap-2 mb-2">
        <span className="text-sm text-gray-500 flex items-center mr-2 hidden sm:flex">🔍 ย่อ/ขยาย ผังงาน:</span>
        <button onClick={zoomOut} className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 font-bold text-xl">-</button>
        <button onClick={resetZoom} className="px-4 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 text-sm font-bold">{Math.round(zoomLevel * 100)}%</button>
        <button onClick={zoomIn} className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 font-bold text-xl">+</button>
      </div>

      {/* พื้นที่แผนผังที่ครอบด้วย Ref สำหรับจับขนาดหน้าจอ */}
      <div 
        ref={containerRef}
        className="relative bg-cyan-100 rounded-2xl shadow-inner border border-cyan-300 overflow-auto h-[600px] sm:h-[750px] w-full"
      >
        {/* กล่องที่เก็บแผนผังจริง ตั้งความกว้างล็อกไว้ที่ 1300px และขยาย/ย่อด้วย CSS Transform */}
        <div 
          className="p-4 md:p-8 transition-transform duration-300 origin-top-left"
          style={{ 
            transform: `scale(${zoomLevel})`,
            width: '1550px' // บังคับให้ใหญ่พอที่จะจัดแถวเรียงกันได้สวยงาม1300
          }}
        > 
          
          {/* แถว A ด้านบนสุด */}
          {renderRowHorizontal('A', 1, 32)}

          {/* โซนหลักแนวตั้ง (ใช้ justify-between ดัน B กับ O ไปชิดขอบให้ตรงกับตัว A ด้านบน) */}
          <div className="flex justify-between items-start mt-2 w-full px-1">
             
             {/* ฝั่งซ้ายสุด */}
             {renderColumnVertical('B', 1, 32, 'side')}

             {/* โซนตรงกลาง: ใช้ justify-evenly ดันทางเดินให้กว้างออกโดยอัตโนมัติ */}
             <div className="flex flex-1 justify-evenly px-4 lg:px-8">
               <div className="flex gap-2">{renderColumnVertical('C', 1, 34, 'center')}{renderColumnVertical('D', 1, 34, 'center')}</div>
               <div className="flex gap-2">{renderColumnVertical('E', 1, 34, 'center')}{renderColumnVertical('F', 1, 34, 'center')}</div>
               <div className="flex gap-2">{renderColumnVertical('G', 1, 34, 'center')}{renderColumnVertical('H', 1, 34, 'center')}</div>
               <div className="flex gap-2">{renderColumnVertical('I', 1, 34, 'center')}{renderColumnVertical('J', 1, 34, 'center')}</div>
               <div className="flex gap-2">{renderColumnVertical('K', 1, 34, 'center')}{renderColumnVertical('L', 1, 34, 'center')}</div>
               <div className="flex gap-2">{renderColumnVertical('M', 1, 34, 'center')}{renderColumnVertical('N', 1, 34, 'center')}</div>
             </div>

             {/* ฝั่งขวาสุด */}
             {renderColumnVertical('O', 1, 32, 'side')}

          </div>
        </div>
      </div>

      {/* UI ส่วนแสดงข้อมูลเมื่อคลิกบูธ */}
      {activeBooth && (
        <div className="mt-8 p-6 bg-pink-50 border border-pink-200 rounded-2xl animate-fade-in shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-pink-400"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-pink-600">
              บูธ {activeBooth.boothNumbers.join(', ')}
            </h3>
            <button onClick={() => setActiveBooth(null)} className="text-gray-400 hover:text-red-500 font-bold p-2 bg-white rounded-full shadow-sm">✕</button>
          </div>
          <h4 className="text-xl font-bold mb-2 text-gray-800">{activeBooth.mainCreator}</h4>
          <p className="text-gray-600 mb-4">{activeBooth.description}</p>
          
          <div className="bg-white p-3 rounded-lg text-sm border border-pink-100 inline-block shadow-sm">
             <span className="font-bold text-gray-700">Co-Creators: </span>
             {activeBooth.coCreators.length > 0 ? activeBooth.coCreators.join(', ') : '- ไม่มี -'}
          </div>

          <button className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition shadow-md flex items-center justify-center gap-2">
            <span>ดูสินค้าทั้งหมดของบูธนี้</span>
            <span className="text-lg">➔</span>
          </button>
        </div>
      )}

    </div>
  );
}