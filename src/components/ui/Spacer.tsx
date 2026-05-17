import React from 'react';

interface SpacerProps {
  h?: number | string; // รับได้ทั้งตัวเลข (px) หรือ string (เช่น '2rem', '10vh')
  w?: number | string; // รับได้ทั้งตัวเลข (px) หรือ string (เช่น '50%', 'auto')
  className?: string; // เผื่อต้องการปรับแต่งเพิ่มเอง
}

export const Spacer = ({ h, w, className = '' }: SpacerProps) => {
  // แปลงค่า h/w ให้เป็น CSS value ที่เหมาะสม
  const height =
    h !== undefined ? (typeof h === 'number' ? `${h}px` : h) : undefined;

  const width =
    w !== undefined ? (typeof w === 'number' ? `${w}px` : w) : undefined;

  return (
    <div
      className={`ui-spacer block select-none ${className}`}
      aria-hidden="true"
      style={{
        height: height,
        width: width,
        minHeight: height ? undefined : '1px', // fallback ถ้าไม่มี h
        minWidth: width ? undefined : '1px', // fallback ถ้าไม่มี w
      }}
    />
  );
};