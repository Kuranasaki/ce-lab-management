import { Button } from '@ce-lab-mgmt/shared-ui';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import IMAGES from '../../../assets/images';
import {
  Cuboid,
  Drill,
  FileBadge,
  FilePen,
  Flame,
  PackageCheck,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <NavBar variant="transparent" />
      <div className="w-full text-slate-50 text-center">
        <div className="flex flex-col w-full h-fit pt-28 pb-14 px-20 gap-2 bg-gradient-to-br from-[#0F172A] to-primary-500">
          <div className="w-full px-5 py-3">
            <h1>การบริการวิชาการ</h1>
          </div>
          <div className="w-full px-5 py-2">
            <h5>
              การบริการวิชาการแก่ชุมชนเป็นภารกิจหลักตัวหนึ่งของภาควิชาวิศวกรรมโยธา
              <br />
              ซึ่งถือเป็นวิธีการถ่ายทอดความรู้โดยมุ่งเน้นให้เกิดประโยชน์โดยตรงต่อสังคมและชุมชน
              <br />
              และเพิ่มประสบการแก่บุคคลที่ประกอบวิชาชีพด้านวิศวกรรมโยธา
            </h5>
          </div>
          <div className="flex justify-center gap-6 py-3">
            <Link to="/pricing">
              <Button variant="outlinelight" size="lg">
                ตรวจสอบราคา
              </Button>
            </Link>
            <Link to="/reservation/request">
              <Button variant="defaultlight" size="lg">
                ขอรับบริการ
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex p-12 gap-12">
          <img
            src={IMAGES.home}
            alt=""
            className="w-[600px] max-w-[40%] object-contain rounded-xl"
          />
          <div className="flex flex-col">
            <div className="gap-y-8 flex flex-col mb-8">
              <p className="text-secondary-700 text-3xl font-medium text-start">
                งานที่ให้บริการ
              </p>
              <p className="text-slate-700 text-start text-xl">
                งานบริการวิชาการด้านวิศวกรรมโยธา
                ดำเนินการภายใต้หลักเกณฑ์ที่ถูกต้องตามหลักวิชาการ
                ยึดมั่นในคุณภาพและมีอัตราค่าบริการที่เหมาะสม
                จึงได้รับความไว้วางใจจากภาครัฐและเอกชนด้วยดีมาตลอด
                โดยงานบริการวิชาการด้านวิศวกรรมโยธาของภาควิชา ได้แก่
              </p>
            </div>
            <div className="flex flex-1 gap-x-8 h-full">
              <div className="flex flex-col flex-1 h-full items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-secondary-100">
                <div className="flex gap-y-4 flex-col">
                  <Cuboid
                    strokeWidth={1}
                    className="text-secondary-700 w-16 h-16"
                  />
                  <p className="text-slate-700 text-start text-2xl font-medium">
                    บริการทดสอบวัสดุ
                  </p>
                  <p className="text-slate-700 text-start text-xl underline">
                    เรียนรู้เพิ่มเติม
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1 h-full items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-secondary-100">
                <div className="flex gap-y-4 flex-col">
                  <Drill
                    strokeWidth={1}
                    className="text-secondary-700 w-16 h-16"
                  />
                  <p className="text-slate-700 text-start text-2xl font-medium">
                    บริการทดสอบเทียบ
                  </p>
                  <p className="text-slate-700 text-start text-xl underline">
                    เรียนรู้เพิ่มเติม
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1 h-full items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-secondary-100">
                <div className="flex gap-y-4 flex-col">
                  <Flame
                    strokeWidth={1}
                    className="text-secondary-700 w-16 h-16"
                  />
                  <p className="text-slate-700 text-start text-2xl font-medium">
                    บริการทดสอบทนไฟ
                  </p>
                  <p className="text-slate-700 text-start text-xl underline">
                    เรียนรู้เพิ่มเติม
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary-100 gap-y-12 flex flex-col py-8 justify-center items-center">
          <p className="text-slate-700 text-3xl font-medium">
            ขั้นตอนการขอรับบริการ
          </p>
          <div className="flex w-full justify-center gap-x-8 h-full">
            <div className="flex flex-col p-12 w-[30%] items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-slate-100">
              <div className="flex gap-y-4 flex-col">
                <FilePen
                  strokeWidth={1}
                  className="text-primary-500 w-16 h-16"
                />
                <p className="text-slate-700 text-start text-2xl font-medium">
                  ส่งคำขอ
                </p>
                <p className="text-slate-700 text-start text-xl mb-1">
                  ส่งคำขอรับบริการผ่านทางหน้าเว็บไซต์
                </p>
                <p className="text-slate-700 text-start text-xl underline">
                  เรียนรู้เพิ่มเติม
                </p>
              </div>
            </div>
            <div className="flex flex-col p-12 w-[30%] items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-slate-100">
              <div className="flex gap-y-4 flex-col">
                <PackageCheck
                  strokeWidth={1}
                  className="text-primary-500 w-16 h-16"
                />
                <p className="text-slate-700 text-start text-2xl font-medium">
                  ชำระค่าธรรมเนียมและส่งมอบของ
                </p>
                <p className="text-slate-700 text-start text-xl mb-1">
                  ชำระค่าธรรมเนียมและส่งมอบของเพื่อรับการอนุมัติ
                </p>
                <p className="text-slate-700 text-start text-xl underline">
                  เรียนรู้เพิ่มเติม
                </p>
              </div>
            </div>
            <div className="flex flex-col p-12 w-[30%] items-center justify-center bg-white shadow-md rounded-xl transition-colors hover:bg-slate-100">
              <div className="flex gap-y-4 flex-col">
                <FileBadge
                  strokeWidth={1}
                  className="text-primary-500 w-16 h-16"
                />
                <p className="text-slate-700 text-start text-2xl font-medium">
                  รอรับผลการทดสอบ
                </p>
                <p className="text-slate-700 text-start text-xl mb-1">
                  รอรับใบรับรองเมื่อการทดสอบเสร็จสิ้น
                </p>
                <p className="text-slate-700 text-start text-xl underline">
                  เรียนรู้เพิ่มเติม
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
