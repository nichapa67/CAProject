// src/mockData.js

export const eventData = {
  // ข้อมูลวันที่ 1
  "2026-05-30": [
    {
      id: "b_001",
      boothNumbers: ["A01", "A02"], // บูธควบ 2 เลข
      mainCreator: "CA Studio",
      coCreators: ["Ploy", "Ken"], // Co-creators มีกี่คนก็ได้
      coverImage: "https://via.placeholder.com/150",
      description: "ขายโดจินชิและกู๊ดส์น่ารักๆ",
    },
    {
      id: "b_002",
      boothNumbers: ["B08"], // เลขเดียวแต่คนเยอะ
      mainCreator: "Manga Master",
      coCreators: ["Artist1", "Artist2", "Artist3"],
      coverImage: "https://via.placeholder.com/150",
      description: "รับวาดคอมมิชชั่นสด",
    }
  ],
  // ข้อมูลวันที่ 2 (บางบูธอาจจะไม่อยู่ หรือลดขนาดบูธ)
  "2026-05-31": [
    {
      id: "b_003",
      boothNumbers: ["A01"], // วันที่ 2 เหลือแค่บูธเดียว
      mainCreator: "CA Studio",
      coCreators: [], 
      coverImage: "https://via.placeholder.com/150",
      description: "ขายของที่เหลือจากเมื่อวาน",
    }
  ]
};