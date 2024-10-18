import { Button } from "@ce-lab-mgmt/shared-ui";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="w-full text-slate-50 text-center">
            <div className='flex flex-col w-full h-fit pt-28 pb-14 px-20 gap-2 bg-gradient-to-br from-[#0F172A] to-primary-500'>
                <div className="w-full px-5 py-3"><h1>การบริการวิชาการ</h1></div>
                <div className="w-full px-5 py-2">
                    <h5>การบริการวิชาการแก่ชุมชนเป็นภารกิจหลักตัวหนึ่งของภาควิชาวิศวกรรมโยธา<br />
                        ซึ่งถือเป็นวิธีการถ่ายทอดความรู้โดยมุ่งเน้นให้เกิดประโยชน์โดยตรงต่อสังคมและชุมชน<br />
                        และเพิ่มประสบการแก่บุคคลที่ประกอบวิชาชีพด้านวิศวกรรมโยธา</h5>
                </div>
                <div className="flex justify-center gap-6 py-3">
                    <Link to="/pricing">
                        <Button variant="outlinelight" size="lg">ตรวจสอบราคา</Button>
                    </Link>
                    <Link to="/reservation">
                        <Button variant="defaultlight" size="lg">ขอรับบริการ</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
