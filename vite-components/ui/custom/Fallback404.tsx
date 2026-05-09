import { Link } from "react-router-dom";
import { Button } from "../core/button";

const Fallback404 = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
    <p className="text-5xl font-bold text-foreground">404</p>
    <p className="text-lg font-medium text-foreground">ไม่พบหน้าที่ต้องการ</p>
    <p className="text-sm text-muted-foreground">หน้านี้ไม่มีอยู่ในระบบ</p>
    <Button asChild variant="outline">
      <Link to="/dashboard">กลับหน้าหลัก</Link>
    </Button>
  </div>
);

export default Fallback404;
