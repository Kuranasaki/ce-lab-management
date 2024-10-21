import React, { FC, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Input,
  Button,
  Loading,
} from '@ce-lab-mgmt/shared-ui';
import { usePricingTable } from '../../hooks/usePricingTable';

import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { PricingGroup } from '../../domain/entity/pricingTableItem';

// interface Test {
//   test_name: string;
//   price?: number; // Price can be optional
//   amount?: number; // Amount can be optional
//   unit?: string; // Unit can be optional
//   sub_tests?: SubTest[]; // Optional array for sub-tests
//   note?: string;
// }

// interface SubTest {
//   sub_test_name: string;
//   price?: number; // Price can be optional
//   amount?: number; // Amount can be optional
//   unit?: string; // Unit can be optional
// }

// interface PricingGroup {
//   category: string; // Name of the category
//   note?: string; // Optional note for the category
//   tests: Test[]; // Array of tests for this category
// }

// const testData: PricingGroup[] = [
//   {
//     category: 'Cement test',
//     tests: [
//       { test_name: 'Fineness test', price: 2000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Specific gravity test',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive strength of mortar test',
//         price: 900,
//         amount: 3,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'Tensile strength test',
//         price: 900,
//         amount: 3,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'Nomal consistency & Initial setting time test',
//         price: 1300,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Flow table test',
//         price: 1000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Soundness test (by autoclave test)',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Fine & coarse aggregate test',
//     tests: [
//       {
//         test_name: 'Percentage passing sieve no.200',
//         price: 1000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Sieve analysis', price: 2000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Specific gravity & absorption test',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Organic impurity test',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Unit weight', price: 2000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Flakiness index',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Elongation index',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Sand equivalent test',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Stripping test', price: 3000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Los Angeles Abrasion test',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Crushing value ตาม BS',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: '10 percent fine value ตาม BS',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Soundness test', price: 5000, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'Clay lumps', price: 3000, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'Soft particles', price: 3000, amount: 1, unit: 'ตัวอย่าง' },
//     ],
//   },
//   {
//     category: 'Concrete test',
//     tests: [
//       {
//         test_name: 'Compressive test (Cubes < 15 cm)',
//         price: 300,
//         amount: 1,
//         unit: 'ก้อนตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive test (Standard cube 15 cm)',
//         price: 300,
//         amount: 1,
//         unit: 'ก้อนตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive test (Standard cylinder ø 15×3 cm)',
//         price: 300,
//         amount: 1,
//         unit: 'ก้อนตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive test (Cylinder core ≤ 4″)',
//         price: 300,
//         amount: 1,
//         unit: 'ก้อนตัวอย่าง',
//       },
//       {
//         test_name: 'Concrete bond test',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Splitting tensile strength',
//         price: 1000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Modulus of rupture',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Modulus of elasticity',
//         price: 6000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Concrete block test , คอนกรีตมวลเบา (ผนัง)',
//     tests: [
//       {
//         test_name: 'Compressive strength',
//         price: 3000,
//         amount: 5,
//         unit: 'ชุด',
//       },
//       { test_name: 'Water Absorption', price: 3000, amount: 5, unit: 'ชุด' },
//     ],
//   },
//   {
//     category: 'Concrete mix design',
//     note: 'กรณีที่ไม่ได้กำหนดส่วนผสม ให้คิดค่าบริการทดสอบเพิ่มขึ้นอีก 1,500 บาท ต่อการทดสอบ 1 ชุด',
//     tests: [
//       {
//         test_name: 'กำหนดส่วผสมให้ (ชุดละ 6 ก้อน)',
//         price: 5000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'กำหนดส่วผสมให้ (ชุดละ 9 ก้อน)',
//         price: 6000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'กำหนดส่วผสมให้ (ชุดละ 12 ก้อน)',
//         price: 7000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'กำหนดส่วผสมให้ (ชุดละ 15 ก้อน)',
//         price: 9000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//     ],
//   },
//   {
//     category: 'Concrete admixture test',
//     tests: [{ test_name: 'ชุดละ', price: 8000, amount: 1, unit: 'ชุด' }],
//   },
//   {
//     category: 'Concrete pipes test (ท่อระบายน้ำ)',
//     tests: [
//       {
//         test_name: 'ขนาด ø 0.30 m – ขนาด ø 1.50 m ยาว 1.00 m',
//         price: 80000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Tensile Test of Structural Steel',
//     tests: [
//       {
//         test_name: 'เหล็กเส้น (SR24 / SD30 / SD40 / SD40T / SD50)',
//         note: '1. Plot stess – strain curve ให้คิดค่าบริการ เพิ่มตัวอย่างละ 5,000 บาท\n2. กรณีของ Welded joint ให้คิดอัตราตามขนาดเท่าเหล็กเส้น',
//         sub_tests: [
//           { sub_test_name: 'ø 6 mm', price: 300, amount: 1, unit: 'ตัวอย่าง' },
//           {
//             sub_test_name: 'ø 9 mm และ 10 mm',
//             price: 400,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           { sub_test_name: 'ø 12 mm', price: 600, amount: 1, unit: 'ตัวอย่าง' },
//           {
//             sub_test_name: 'ø 15 mm และ 16 mm',
//             price: 700,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ø 19 mm และ 20 mm',
//             price: 800,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ø 25 mm',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//       {
//         test_name: 'แรงดึงเหล็กแผ่น',
//         sub_tests: [
//           {
//             sub_test_name: 'พื้นที่หน้าตัดไม่เกิน 2 ตร.ซม.',
//             price: 500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'พื้นที่หน้าตัดมากกว่า 2 – 5 ตร.ซม.',
//             price: 700,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'พื้นที่หน้าตัดมากกว่า 5 – 16 ตร.ซม.',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//       {
//         test_name: 'แรงดึง Bolt + Nut',
//         sub_tests: [
//           {
//             sub_test_name: 'ขนาด ø ไม่เกิน 10 mm',
//             price: 500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด ø มากกว่า 10 – 15 mm',
//             price: 800,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด ø มากกว่า 15 – 20 mm',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด ø มากกว่า 20 – 25 mm',
//             price: 1500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด ø มากกว่า 25 – 30 mm',
//             price: 5000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด ø มากกว่า 30 – 35 mm',
//             price: 6000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Steel and cast iron test',
//     tests: [
//       {
//         test_name: 'Direct shear test',
//         sub_tests: [
//           {
//             sub_test_name: 'Single shear test',
//             price: 500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Double shear test',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//       {
//         test_name: 'Brinell hardness test',
//         price: 1000,
//         amount: 1,
//         unit: 'จุด',
//       },
//       {
//         test_name: 'Bending test รวม Plot curve',
//         price: 6000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Tensile test of prestressed wire and prestressed strand',
//     tests: [
//       { test_name: 'wire ø 4 mm', price: 600, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'wire ø 5 mm', price: 800, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'wire ø 7 mm', price: 1000, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'strand ø 9 mm', price: 1200, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'strand ø 12 mm', price: 1500, amount: 1, unit: 'ตัวอย่าง' },
//       { test_name: 'strand ø 15 mm', price: 2000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'มากกว่า ø 15 mm',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//     note: 'Plot Stress – Strain Curve ให้คิดค่าบริการ เพิ่มตัวอย่างละ 1,000 บาท',
//   },
//   {
//     category: 'Brick test',
//     tests: [
//       {
//         test_name: 'Transverse & Compressive test (1ชุด 5 ก้อน)',
//         price: 3000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'absorption test (1ชุด 5 ก้อน)',
//         price: 3000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//     ],
//   },
//   {
//     category: 'Wood test',
//     tests: [
//       {
//         test_name: 'Shear test of wood',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Tensile and clevage test of wood',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Hardness test of wood',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Specific gravity and moisture test of wood',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Impact test of wood',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Bending test of wood',
//         price: 6000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive test of wood // to grain',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Compressive test of wood ^ to grain',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Withdrawal resistance',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Calibration of hydraulic jack, testing machine, and load',
//     tests: [
//       {
//         test_name: 'ขนาดไม่เกิน 20 ตัน',
//         price: 3000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 20 – 40 ตัน',
//         price: 4000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 40 – 200 ตัน',
//         price: 6000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 200 – 300 ตัน',
//         price: 8000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 300 – 500 ตัน',
//         price: 9000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//     ],
//   },
//   {
//     category: 'Calibration of proving ring and dynamometer',
//     tests: [
//       {
//         test_name: 'ขนาดไม่เกิน 20 ตัน',
//         price: 3000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 20 – 40 ตัน',
//         price: 4000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 40 – 200 ตัน',
//         price: 6000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 200 – 300 ตัน',
//         price: 8000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 300 – 500 ตัน',
//         price: 9000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//     ],
//   },
//   {
//     category:
//       'Calibration of prestressing machine (เครื่องดึงลวด) & Quick Check',
//     tests: [
//       {
//         test_name: 'ขนาดไม่เกิน 20 ตัน',
//         price: 3000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//       {
//         test_name: 'ขนาดมากกว่า 20 – 40 ตัน',
//         price: 4000,
//         amount: 1,
//         unit: 'เครื่อง',
//       },
//     ],
//   },
//   {
//     category: 'Soil test',
//     tests: [
//       {
//         test_name: 'Strength test (Sand cone)',
//         price: 3000,
//         amount: 1,
//         unit: 'หลุม',
//       },
//       {
//         test_name: 'Unconfined compression test',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Direct shear test', price: 7500, amount: 1, unit: 'ชุด' },
//       {
//         test_name: 'Triaxial UU test (3 ตัวอย่าง)',
//         price: 10000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'Triaxial CU test (3 ตัวอย่าง)',
//         price: 30000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'Triaxial CD test (3 ตัวอย่าง)',
//         price: 45000,
//         amount: 1,
//         unit: 'ชุด',
//       },
//       {
//         test_name: 'Unit weight & Water content',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       { test_name: 'Sieve analysis', price: 3000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Atterberg limits test',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Specific gravity',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Relative density of sand',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Bulk density and dry density',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Permeability of sand (constant head)',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'hydrometer test',
//         price: 8000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Permeability of clay (falling head)',
//         price: 15000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Standard proctor',
//         price: 3000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Modified proctor',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'CBR (with compaction)',
//         price: 5000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Consolidation test',
//         price: 10000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Asphalt test',
//     tests: [
//       {
//         test_name: 'แอลฟัลท์ติกคอนกรีต',
//         sub_tests: [
//           { sub_test_name: 'Density', price: 600, amount: 1, unit: 'ตัวอย่าง' },
//           {
//             sub_test_name: 'Stability and flow',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Bitumen content',
//             price: 1500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ออกแบบส่วนผสม',
//             price: 6000,
//             amount: 1,
//             unit: 'ชุด',
//           },
//         ],
//       },
//       {
//         test_name: 'วัสดุแอสฟัลท์',
//         sub_tests: [
//           {
//             sub_test_name: 'Loss on heating',
//             price: 500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Specific gravity',
//             price: 800,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Furol Viscosity',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Flash point – Fire point',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Solubility',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Penetration',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Ductility',
//             price: 1500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Softening Point',
//             price: 1500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Settlement',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Float test',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Sieve test',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Distillation of cutback asphalt',
//             price: 2000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Distillation of emulsion',
//             price: 2000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Others',
//     tests: [
//       { test_name: 'เสาค้ำยัน', price: 10000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'Schmidt hammer test (10 จุด)',
//         price: 5000,
//         amount: 1,
//         unit: 'ตำแหน่ง',
//       },
//       {
//         test_name: 'Schmidt Hammer (สอบเทียบ)',
//         price: 2000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Ultrasonic test of concrete',
//         price: 10000,
//         amount: 1,
//         unit: 'จุด',
//       },
//       {
//         test_name: 'การทำ rebar location สำหรับพื้น',
//         price: 10000,
//         amount: 1,
//         unit: 'เมตร',
//       },
//       {
//         test_name: 'Precast slab bending test',
//         price: 200000,
//         amount: 1,
//         unit: 'ครั้ง',
//       },
//       { test_name: 'นั่งร้าน', price: 200000, amount: 1, unit: 'ชุด' },
//       {
//         test_name:
//           'การทดสอบแบบอัดโดยใช้ Instron Universal Testing Machine (1000/5000 kN)',
//         sub_tests: [
//           {
//             sub_test_name: 'Max load 0 – 20 ตัน',
//             price: 5000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 40 ตัน',
//             price: 6000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 60 ตัน',
//             price: 7000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 80 ตัน',
//             price: 8000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 100 ตัน',
//             price: 10000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 300 ตัน',
//             price: 15000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Max load 500 ตัน',
//             price: 20000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
// ];
// const extraTestData: PricingGroup[] = [
//   {
//     category: 'Coupler Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบแรงดึงของเหล็กเส้น (ใช้เครื่อง Instron)',
//         sub_tests: [
//           {
//             sub_test_name: 'เหล็กขนาด ø20 mm',
//             price: 5000,
//             amount: 1,
//             unit: 'เส้น',
//           },
//           {
//             sub_test_name: 'เหล็กขนาด ø25 mm',
//             price: 6000,
//             amount: 1,
//             unit: 'เส้น',
//           },
//           {
//             sub_test_name: 'เหล็กขนาด ø28 mm',
//             price: 7000,
//             amount: 1,
//             unit: 'เส้น',
//           },
//           {
//             sub_test_name: 'เหล็กขนาด ø32 mm',
//             price: 8000,
//             amount: 1,
//             unit: 'เส้น',
//           },
//           {
//             sub_test_name: 'เหล็กขนาด ø40 mm',
//             price: 10000,
//             amount: 1,
//             unit: 'เส้น',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Electrical Insulator Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบลูกถ้วยไฟฟ้า',
//         sub_tests: [
//           {
//             sub_test_name: 'ชิ้นใหญ่ > 50 cm.',
//             price: 10000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ชิ้นเล็ก < 50 cm.',
//             price: 8000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Surface Treatment Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบ Sandblasting (ASTM C418)',
//         price: 8000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Railway Component Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบรางรถไฟ, หมอนรถไฟ',
//         sub_tests: [
//           {
//             sub_test_name: 'Fatigue “ทดสอบต่อ 3 ล้านรอบ” (INSTRON)',
//             price: 200000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Slow bending',
//             price: 40000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'Fatigue “ทดสอบต่อ 3 ล้านรอบ” (SERVO PULSER)',
//             price: 200000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Concrete Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบแผ่นพื้นคอนกรีตมวลเบาเสริมแรง',
//         price: 200000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Stud Pull Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบแรงดึง stud (พุกเหล็ก)',
//         sub_tests: [
//           {
//             sub_test_name: 'ขนาด M 8',
//             price: 1500,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด M 10',
//             price: 1600,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด M 12',
//             price: 1700,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด M 16',
//             price: 1800,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด M 20',
//             price: 1900,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           {
//             sub_test_name: 'ขนาด M 24',
//             price: 2000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Fiber Tube Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบท่อไฟเบอร์ (สีส้ม)',
//         sub_tests: [
//           {
//             sub_test_name: 'Tensile',
//             price: 1000,
//             amount: 1,
//             unit: 'ตัวอย่าง',
//           },
//           { sub_test_name: 'อื่นๆ', price: 500, amount: 1, unit: 'ตัวอย่าง' },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Dimensional Tests',
//     tests: [
//       {
//         test_name: 'ทดสอบมิติแผ่นพื้น , ทดสอบมิติเสาเข็มคอนกรีต (สมอ.)',
//         price: 30000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Calibration Tests',
//     tests: [
//       {
//         test_name: 'Calibration bottom sand cone',
//         price: 1500,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Hydraulic Cylinder Tests',
//     tests: [
//       {
//         test_name: 'Hydraulic Cylinder System 30 + ค่าใช้เครื่อง',
//         price: 1500,
//         amount: 1,
//         unit: 'ชิ้น',
//       },
//       {
//         test_name: 'Hydraulic Cylinder System 100 + ค่าใช้เครื่อง',
//         price: 1500,
//         amount: 1,
//         unit: 'ชิ้น',
//       },
//     ],
//   },
//   {
//     category: 'Special Tests',
//     tests: [
//       {
//         test_name: 'รายการทดสอบ special test',
//         price: 1000000,
//         amount: 1,
//         unit: 'รายการ',
//       },
//       {
//         test_name: 'High-cycle fatigue',
//         price: 80000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'Cyclic แผ่นยางรองเสาสะพาน',
//         price: 200000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'ลวดตีเกลียวอัดแรงในคานคอนกรีต',
//         price: 30000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'เสาเหล็ก , คานเหล็กโครงสร้างจริง',
//         price: 200000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//       {
//         test_name: 'คานคอนกรีตโครงสร้างจริง ยาว 4-6 เมตร',
//         price: 200000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
//   {
//     category: 'Miscellaneous Tests',
//     tests: [
//       { test_name: 'แรงดึงโซ่', price: 5000, amount: 1, unit: 'ตัวอย่าง' },
//       {
//         test_name: 'ความแข็งแรงของทุ่นลอย',
//         price: 6000,
//         amount: 1,
//         unit: 'ตัวอย่าง',
//       },
//     ],
//   },
// ];

// const railwaySleepersTestData: Test[] = [
//   {
//     test_name: 'Dimension check of sleeper',
//     price: 40000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Static Loading Test',
//     sub_tests: [
//       {
//         sub_test_name: 'Positive Moment @Midspan',
//         price: 21250,
//         amount: 1,
//         unit: 'test',
//       },
//       {
//         sub_test_name: 'Negative Moment @Midspan',
//         price: 21250,
//         amount: 1,
//         unit: 'test',
//       },
//       {
//         sub_test_name: 'Postive Moment @Midspan',
//         price: 21250,
//         amount: 1,
//         unit: 'test',
//       },
//       {
//         sub_test_name: 'Negative Moment @Midspan',
//         price: 21250,
//         amount: 1,
//         unit: 'test',
//       },
//     ],
//   },
//   {
//     test_name: 'Bond Development',
//     price: 20000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Creep Resistance',
//     price: 45000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Fastener Uplift',
//     price: 20000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Lateral Resistance',
//     price: 45000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Clamping Force',
//     price: 20000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Insert Resistance (Pull out)',
//     price: 20000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Track Gauge Measurement',
//     price: 15000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Electrical Resistance',
//     price: 40000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Repeated Loading Test',
//     price: 200000,
//     amount: 1,
//     unit: 'test',
//   },
//   {
//     test_name: 'Fatigue Resistance',
//     price: 200000,
//     amount: 1,
//     unit: 'test',
//   },
// ];

const PricingPage: FC = () => {
  const { data, loading } = usePricingTable();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  // const [filterExtraData, setFilterExtraData] = useState(extraTestData);
  // const [filterRailwaySleepersData, setFilterRailwaySleepersData] = useState(
  //   railwaySleepersTestData
  // );
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredData(data);
      // setFilterExtraData(extraTestData);
      // setFilterRailwaySleepersData(railwaySleepersTestData);
      setIsFiltered(false);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    const filterData = (data: PricingGroup[]) =>
      data
        .map((group) => {
          const matchingTests = group.tests.filter((test) => {
            const testMatches = test.test_name
              .toLowerCase()
              .includes(lowerSearchTerm);
            const subTestMatches = test.sub_tests?.some((subTest) =>
              subTest.sub_test_name.toLowerCase().includes(lowerSearchTerm)
            );

            return testMatches || subTestMatches;
          });

          const expandedTests = matchingTests.map((test) => {
            if (test.sub_tests) {
              const matchingSubTests = test.sub_tests.filter((subTest) =>
                subTest.sub_test_name.toLowerCase().includes(lowerSearchTerm)
              );
              return {
                ...test,
                sub_tests:
                  matchingSubTests.length > 0
                    ? matchingSubTests
                    : test.sub_tests,
              };
            }
            return test;
          });

          if (expandedTests.length > 0) {
            return {
              ...group,
              tests: expandedTests,
            };
          }

          return null;
        })
        .filter((group): group is PricingGroup => group !== null);

    // Filter railwaySleepersTestData separately since it's a flat array of Test[]
    // const filterRailwaySleepers = (data: Test[]) =>
    //   data.filter((test) => {
    //     const testMatches = test.test_name
    //       .toLowerCase()
    //       .includes(lowerSearchTerm);
    //     const subTestMatches = test.sub_tests?.some((subTest) =>
    //       subTest.sub_test_name.toLowerCase().includes(lowerSearchTerm)
    //     );

    //     return testMatches || subTestMatches;
    //   });

    // Filter each dataset
    const newFilteredData = filterData(data);
    // const newFilterExtraData = filterData(extraTestData);
    // const newFilterRailwaySleepersData = filterRailwaySleepers(
    //   railwaySleepersTestData
    // );

    setFilteredData(newFilteredData);
    // setFilterExtraData(newFilterExtraData);
    // setFilterRailwaySleepersData(newFilterRailwaySleepersData);
    setIsFiltered(true);
  };

  if (loading) {
    return (
      <div className="w-full h-[50dvh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const RenderPricingTable: FC<{ dataList: PricingGroup[] }> = ({
    dataList,
  }) => (
    <Table className="mb-6">
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/3">รายการ</TableHead>
          <TableHead className="text-center">ราคา (บาท)</TableHead>
          <TableHead className="text-center">จำนวน</TableHead>
          <TableHead className="text-center">หน่วย</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList.map((group, groupIdx) => {
          const rows = [];
          rows.push(
            <TableRow key={group.category}>
              {group.note ? (
                <TableCell colSpan={4}>
                  <div className="flex w-full items-center gap-x-3">
                    <p className="font-bold text-base">
                      {groupIdx + 1}. {group.category}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircledIcon className="text-primary-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm font-light">{group.note}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              ) : (
                <TableCell className="font-bold text-base" colSpan={4}>
                  {groupIdx + 1}. {group.category}
                </TableCell>
              )}
            </TableRow>
          );

          group.tests.forEach((data, catIdx) => {
            if (data.sub_tests) {
              rows.push(
                <TableRow key={data.test_name}>
                  {data.note ? (
                    <TableCell className="flex w-full overflow-x-visible items-center gap-x-3">
                      <div className="font-semibold pl-6 whitespace-nowrap">
                        {groupIdx + 1}.{catIdx + 1} {data.test_name}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoCircledIcon className="text-primary-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm font-light">{data.note}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  ) : (
                    <TableCell className="font-semibold pl-6" colSpan={4}>
                      {groupIdx + 1}.{catIdx + 1} {data.test_name}
                    </TableCell>
                  )}
                </TableRow>
              );
              data.sub_tests.forEach((subTest, subIdx) => {
                rows.push(
                  <TableRow key={subTest.sub_test_name}>
                    <TableCell className="pl-12">
                      {groupIdx + 1}.{catIdx + 1}.{subIdx + 1}{' '}
                      {subTest.sub_test_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {subTest.price ? subTest.price.toLocaleString() : ''}
                    </TableCell>
                    <TableCell className="text-center">
                      {subTest.amount ? subTest.amount : ''}
                    </TableCell>
                    <TableCell className="text-center">
                      {subTest.unit ? subTest.unit : ''}
                    </TableCell>
                  </TableRow>
                );
              });
            } else {
              rows.push(
                <TableRow key={data.test_name}>
                  <TableCell className="pl-6">
                    {groupIdx + 1}.{catIdx + 1} {data.test_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.price ? data.price.toLocaleString() : ''}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.amount ? data.amount : ''}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.unit ? data.unit : ''}
                  </TableCell>
                </TableRow>
              );
            }
          });

          return rows; // Return all rows for this group
        })}
      </TableBody>
    </Table>
  );

  // const RenderSleeperTest = () => (
  //   <Table className="mb-6">
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead className="w-2/3">รายการ</TableHead>
  //         <TableHead className="text-center">ราคา (บาท)</TableHead>
  //         <TableHead className="text-center">จำนวน</TableHead>
  //         <TableHead className="text-center">หน่วย</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {filterRailwaySleepersData.map((data, testIdx) =>
  //         data.sub_tests ? (
  //           <>
  //             <TableRow key={data.test_name}>
  //               {data.note ? (
  //                 <TableCell className="flex w-full overflow-x-visible items-center gap-x-3">
  //                   <div className="font-semibold pl-6 whitespace-nowrap">
  //                     {testIdx + 1}. {data.test_name}
  //                   </div>
  //                   <TooltipProvider>
  //                     <Tooltip>
  //                       <TooltipTrigger asChild>
  //                         <InfoCircledIcon className="text-primary-500" />
  //                       </TooltipTrigger>
  //                       <TooltipContent>
  //                         <p className="text-sm font-light">{data.note}</p>
  //                       </TooltipContent>
  //                     </Tooltip>
  //                   </TooltipProvider>
  //                 </TableCell>
  //               ) : (
  //                 <TableCell className="font-semibold pl-6" colSpan={4}>
  //                   {testIdx + 1}. {data.test_name}
  //                 </TableCell>
  //               )}
  //             </TableRow>
  //             {data.sub_tests.map((subTest, subIdx) => (
  //               <TableRow key={subTest.sub_test_name}>
  //                 <TableCell className="pl-12">
  //                   {testIdx + 1}.{subIdx + 1} {subTest.sub_test_name}
  //                 </TableCell>
  //                 <TableCell className="text-center">
  //                   {subTest.price ? subTest.price.toLocaleString() : ''}
  //                 </TableCell>
  //                 <TableCell className="text-center">
  //                   {subTest.amount ? subTest.amount : ''}
  //                 </TableCell>
  //                 <TableCell className="text-center">
  //                   {subTest.unit ? subTest.unit : ''}
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </>
  //         ) : (
  //           <TableRow key={data.test_name}>
  //             <TableCell className="pl-6">
  //               {testIdx + 1}. {data.test_name}
  //             </TableCell>
  //             <TableCell className="text-center">
  //               {data.price ? data.price.toLocaleString() : ''}
  //             </TableCell>
  //             <TableCell className="text-center">
  //               {data.amount ? data.amount : ''}
  //             </TableCell>
  //             <TableCell className="text-center">
  //               {data.unit ? data.unit : ''}
  //             </TableCell>
  //           </TableRow>
  //         )
  //       )}
  //     </TableBody>
  //   </Table>
  // );

  return (
    <div>
      <div className="ml-auto flex max-w-[50%]">
        <Input
          placeholder="ค้นหา"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!e.target.value) {
              setFilteredData(data);
            }
          }}
          className="mb-4 rounded-r-none"
        />
        <Button
          onClick={() => {
            handleSearch();
          }}
          className="rounded-l-none"
        >
          <MagnifyingGlassIcon />
        </Button>
      </div>
      {filteredData.length > 0 && (
        <RenderPricingTable dataList={filteredData} />
      )}
      {!isFiltered && (
        <>
          <p className="mb-2 font-bold text-lg">หมายเหตุ</p>
          <ol className="list-decimal px-4 text-sm space-y-2 mb-12">
            <li>
              กรณีที่มีการนำเสนอผลการทดสอบแตกต่างไปจากแบบฟอร์มที่ใช้ประจำ
              ให้คิดค่าจัดทำรายงานเพิ่มจากค่าทดสอบอีกตามอัตราของหน่วยบริการทดสอบวัสดุ
            </li>
            <li>
              กรณีที่ต้องออกไปทำการทดสอบนอกสถานที่ (ไป-กลับภายในวันเดียวกัน)
              ให้คิดค่าบริการพาหนะในการเดินทางและคิดค่าบริการเพิ่มจากค่าทดสอบอีกวันละ
              3,000 บาท (ภายในพื้นที่ กทม. ) 6,000 บาท (นอกพื้นที่ กทม. )
            </li>
            <li>
              กรณีที่ขอใช้บริการทดสอบเร่งด่วนเพื่อขอรับรายงานผลทดสอบภายในวันเดียวกันกับวันที่ทดสอบ
              ให้คิดค่าบริการทดสอบเป็น 2 เท่าของอัตราค่าทดสอบปกติ
            </li>
            <li>
              รายการทดสอบอื่น หรือการทดสอบที่ต้องดัดแปลงไปจากการทดสอบตามปกติ
              หรือผลิตภัณฑ์ใหม่ที่มิได้กำหนดราคาไว้ให้อยู่ในดุลพินิจของหัวหน้าภาควิชา
              ซึ่งจะได้กำหนดอัตราค่าทดสอบเป็นกรณีๆ ไป
            </li>
            <li>
              ศูนย์ทดสอบวัสดุขอสงวนสิทธ์ไม่ทำการทดสอบให้จนกว่าผู้ขอใช้บริการได้ชำระค่าทดสอบเต็มจพนวนเสียก่อน
            </li>
          </ol>
          {/* <p>ราคาค่าทดสอบเพิ่มเติม</p> */}
        </>
      )}

      {/* {filterExtraData.length > 0 && (
        <>
          <p className="font-medium">ราคาค่าทดสอบเพิ่มเติม</p>
          <RenderPricingTable dataList={filterExtraData} />
        </>
      )}
      {filterRailwaySleepersData.length > 0 && <RenderSleeperTest />}
      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="w-1/3">
              ขนาดพื้นที่ (ตารางเมตร)
            </TableHead>
            <TableHead colSpan={2} className="w-1/3">
              น้ำหนักบรรทุกทดสอบ (กก./ตร.ม.)
            </TableHead>
            <TableHead rowSpan={2}>ค่าทดสอบ (บาท)</TableHead>
            <TableHead rowSpan={2}>จำนวนเกจไม่เกิน (ตำแหน่ง)</TableHead>
          </TableRow>
          <TableRow>
            <TableHead>ไม่น้อยกว่า</TableHead>
            <TableHead>ไม่เกิน</TableHead>
            <TableHead>ไม่น้อยกว่า</TableHead>
            <TableHead>ไม่เกิน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table> */}
    </div>
  );
};

export default PricingPage;
