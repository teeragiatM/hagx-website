import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <>
      <div>
        <div className="PageSection_root px-(--homepage-padding-inset)">
          <p className="mb-4 text-xs font-light text-accent-500 uppercase">
            Legal
          </p>
          <h1 className="mb-12 text-4xl font-light text-foreground-100 sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="space-y-8 text-sm leading-8 font-light text-foreground-300">
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <p>
                เราอาจเก็บข้อมูลส่วนบุคคลที่ท่านให้ไว้โดยตรง เช่น ชื่อ อีเมล
                เบอร์โทรศัพท์ และข้อมูลโครงการ
                เมื่อท่านติดต่อผ่านแบบฟอร์มหรือช่องทางอื่นๆ ของเรา
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                2. วัตถุประสงค์การใช้ข้อมูล
              </h2>
              <p>
                ข้อมูลที่เก็บรวบรวมใช้เพื่อตอบคำถาม จัดทำใบเสนอราคา
                ติดตามโครงการ และปรับปรุงบริการของเรา
                เราไม่ขายหรือแชร์ข้อมูลส่วนบุคคลให้บุคคลที่สามโดยไม่ได้รับความยินยอม
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                3. การรักษาความปลอดภัย
              </h2>
              <p>
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อป้องกันการเข้าถึง
                เปิดเผย หรือทำลายข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                4. คุกกี้
              </h2>
              <p>
                เว็บไซต์อาจใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน
                ท่านสามารถปิดการใช้งานคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ได้ตลอดเวลา
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                5. สิทธิ์ของท่าน
              </h2>
              <p>
                ท่านมีสิทธิ์ขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่าน
                โดยติดต่อเราที่ contact@hagx.co
              </p>
            </section>
            <p className="pt-4 text-xs text-foreground-400">
              อัปเดตล่าสุด: มกราคม 2026 · HAGX Co., Ltd.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
