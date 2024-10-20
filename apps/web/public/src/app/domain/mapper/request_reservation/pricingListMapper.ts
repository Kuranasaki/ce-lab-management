import {
  CategoryTestList,
  PricingListProps,
  TestItem,
} from '../../entity/request_reservation/pricingListProps';

export default function pricingListMapper(data: any): PricingListProps {
  return new PricingListProps({
    categoryTestList: new Map<string, CategoryTestList>([
      [
        '1',
        new CategoryTestList({
          testItems: new Map<string, TestItem[]>([
            [
              'Concrete Mix Design',
              [
                new TestItem({
                  id: '1A01',
                  subName: 'กำหนดส่วนผสมให้  (ชุดละ 6 ก้อน)',
                  pricePerUnit: 50,
                  unit: 'ชุด',
                }),
                new TestItem({
                  id: '1A02',
                  subName: 'กำหนดส่วนผสมให้  (ชุดละ 12 ก้อน)',
                  pricePerUnit: 100,
                  unit: 'ชุด',
                }),
              ],
            ],
            [
              'Cement test',
              [
                new TestItem({
                  id: '1B01',
                  subName: 'Fineness Test',
                  pricePerUnit: 2000,
                  unit: 'ตัวอย่าง',
                }),
                new TestItem({
                  id: '1B02',
                  subName: 'Compressive strength of mortar test',
                  pricePerUnit: 900,
                  unit: 'ชุด (3 ตัวอย่าง)',
                }),
              ],
            ],
          ]),
        }),
      ],
      [
        '2',
        new CategoryTestList({
          testItems: new Map<string, TestItem[]>([
            [
              'Others',
              [
                new TestItem({
                  id: '2A01',
                  subName: 'Schmidt Hammer',
                  pricePerUnit: 2000,
                  unit: 'ตัวอย่าง',
                }),
              ],
            ],
          ]),
        }),
      ],
      [
        '3',
        new CategoryTestList({
          testItems: new Map<string, TestItem[]>([
            [
              'Fire-Rating Partition',
              [
                new TestItem({
                  id: '3A01',
                  subName: '0:30 ชั่วโมง',
                  pricePerUnit: 52250,
                  unit: 'ครั้ง',
                }),
                new TestItem({
                  id: '3A02',
                  subName: '1:00 ชั่วโมง',
                  pricePerUnit: 55750,
                  unit: 'ครั้ง',
                }),
              ],
            ],
          ]),
        }),
      ],
    ]),
  });
}
