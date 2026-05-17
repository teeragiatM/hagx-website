import { PageSection } from '@layout';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <>
      <PageSection>
        <div className="px-(--homepage-padding-inset)">
          <p className="mb-4 text-xs font-light text-accent-500 uppercase">
            Legal
          </p>
          <h1 className="mb-12 text-4xl font-light text-foreground-100 sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <div className="space-y-8 text-sm leading-8 font-light text-foreground-300">
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                1. การยอมรับข้อกำหนด
              </h2>
              <p>
                การเข้าใช้งานเว็บไซต์ hagx.co
                ถือว่าท่านยอมรับข้อกำหนดและเงื่อนไขการใช้งานฉบับนี้ทุกประการ
                หากท่านไม่ยอมรับ กรุณางดเว้นการใช้งานเว็บไซต์
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                2. ทรัพย์สินทางปัญญา
              </h2>
              <p>
                เนื้อหา รูปภาพ โลโก้
                และสื่อทุกรูปแบบบนเว็บไซต์นี้เป็นทรัพย์สินของ HAGX Co., Ltd.
                ห้ามทำซ้ำ ดัดแปลง
                หรือเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                3. ข้อจำกัดความรับผิดชอบ
              </h2>
              <p>
                HAGX Co., Ltd. ไม่รับผิดชอบต่อความเสียหายใดๆ
                ที่เกิดจากการใช้งานหรือการไม่สามารถใช้งานเว็บไซต์
                รวมถึงความไม่ถูกต้องของข้อมูลที่ปรากฏ
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                4. การเปลี่ยนแปลงข้อกำหนด
              </h2>
              <p>
                บริษัทสงวนสิทธิ์ในการแก้ไขข้อกำหนดนี้ได้ทุกเมื่อโดยไม่ต้องแจ้งล่วงหน้า
                การใช้งานเว็บไซต์ต่อเนื่องหลังการเปลี่ยนแปลงถือเป็นการยอมรับข้อกำหนดฉบับใหม่
              </p>
            </section>
            <section>
              <h2 className="mb-3 text-base font-normal text-foreground-200">
                5. กฎหมายที่ใช้บังคับ
              </h2>
              <p>
                ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทใดๆ
                ให้อยู่ในเขตอำนาจศาลไทย
              </p>
            </section>
            <p className="pt-4 text-xs text-foreground-400">
              อัปเดตล่าสุด: มกราคม 2026 · HAGX Co., Ltd.
            </p>
          </div>
        </div>
      </PageSection>
    </>
  );
}
