@echo off
title HAGX WEBSITE 
echo =========================================
echo Starting HAGX WEBSITE (Dev Mode)
echo =========================================
echo.

:: ย้ายไปที่โฟลเดอร์โปรเจกต์ปัจจุบัน (โฟลเดอร์ที่ไฟล์นี้อยู่)
cd /d %~dp0

:: รัน dev server + electron พร้อมกัน
npm run dev

echo.
echo =========================================
echo ✅ Process finished. Press any key to exit...
echo =========================================
pause
