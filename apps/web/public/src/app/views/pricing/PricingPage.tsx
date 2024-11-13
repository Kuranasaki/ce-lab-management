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
import { usePricingTable } from '../../hooks/view_pricing/usePricingTable';

import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import {
  PricingGroup,
  PricingType,
} from '../../domain/entity/view_pricing/pricingTableItem';

const PricingPage: FC = () => {
  const { data, loading } = usePricingTable();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    console.log(data);
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredData(data);
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

    const filtered: PricingType[] = data.map((type) => {
      return {
        type: type.type,
        categories: filterData(type.categories),
      };
    });
    setFilteredData(filtered);
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
          if (group.category !== 'Uncategorized') {
            rows.push(
              <TableRow key={group.category}>
                {group.note ? (
                  <TableCell colSpan={4}>
                    <div className="flex w-full items-center gap-x-3">
                      <p className="font-bold text-base">{group.category}</p>
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
                    {group.category}
                  </TableCell>
                )}
              </TableRow>
            );

            group.tests.forEach((data, catIdx) => {
              if (data.sub_tests) {
                if (data.test_name !== 'Uncategorized') {
                  rows.push(
                    <>
                      <TableRow key={data.test_name}>
                        <TableCell className="flex w-full overflow-x-visible items-center gap-x-3">
                          <div className="font-semibold pl-6 whitespace-nowrap">
                            {catIdx + 1}. {data.test_name}
                          </div>
                          {data.note && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoCircledIcon className="text-primary-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm font-light">
                                    {data.note}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                      </TableRow>
                      {data.sub_tests.map(
                        (subTest, subIdx) =>
                          subTest.prices &&
                          subTest.prices.map((price) => (
                            <TableRow key={subTest.sub_test_name}>
                              <TableCell className="pl-12">
                                {subIdx + 1} {subTest.sub_test_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.price
                                  ? price.price.toLocaleString()
                                  : ''}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.amount ? price.amount : ''}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.unit ? price.unit : ''}
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </>
                  );
                } else {
                  rows.push(
                    <>
                      {data.sub_tests.map(
                        (subTest, subIdx) =>
                          subTest.prices &&
                          subTest.prices.map((price) => (
                            <TableRow key={subTest.sub_test_name}>
                              <TableCell className="pl-12">
                                {subIdx + 1} {subTest.sub_test_name}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.price
                                  ? price.price.toLocaleString()
                                  : ''}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.amount ? price.amount : ''}
                              </TableCell>
                              <TableCell className="text-center">
                                {price.unit ? price.unit : ''}
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </>
                  );
                }
              } else {
                rows.push(
                  data.prices &&
                    data.prices.map((price, priceIdx) => (
                      <TableRow key={data.test_name}>
                        {priceIdx === 0 && (
                          <TableCell
                            className="pl-6"
                            rowSpan={data.prices?.length || 1}
                          >
                            {catIdx + 1}. {data.test_name}
                          </TableCell>
                        )}
                        <TableCell className="text-center">
                          {price.price ? price.price.toLocaleString() : ''}
                        </TableCell>
                        <TableCell className="text-center">
                          {price.amount ? price.amount : ''}
                        </TableCell>
                        <TableCell className="text-center">
                          {price.unit ? price.unit : ''}
                        </TableCell>
                      </TableRow>
                    ))
                );
              }
            });
          } else {
            rows.push(
              <>
                {group.tests.map(
                  (test, testIdx) =>
                    test.prices &&
                    test.prices.map((price, priceIdx) => (
                      <TableRow key={test.test_name}>
                        {priceIdx === 0 && (
                          <TableCell
                            className="pl-6"
                            rowSpan={test.prices?.length || 1}
                          >
                            {test.test_name}
                          </TableCell>
                        )}
                        <TableCell className="text-center">
                          {price.price ? price.price.toLocaleString() : ''}
                        </TableCell>
                        <TableCell className="text-center">
                          {price.amount ? price.amount : ''}
                        </TableCell>
                        <TableCell className="text-center">
                          {price.unit ? price.unit : ''}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </>
            );
          }

          return rows; // Return all rows for this group
        })}
      </TableBody>
    </Table>
  );

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
      {filteredData.length > 0 &&
        filteredData.map((data) => (
          <div>
            <p className="font-bold">{data.type}</p>
            <RenderPricingTable dataList={data.categories} />
          </div>
        ))}
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
        </>
      )}
    </div>
  );
};

export default PricingPage;
