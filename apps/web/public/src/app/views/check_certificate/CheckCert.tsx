import { Button, Card, CardContent, Input } from '@ce-lab-mgmt/shared-ui';
import IMAGES from '../../../assets/images';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const CheckCert = () => {
  const [certId, setCertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!certId.trim()) {
      setError('กรุณากรอกหมายเลขการทดสอบ');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const response = await fetch(`/api/certificates/${certId}`);
      if (response.status === 404) {
        setError(
          'ไม่พบการทดสอบของคุณ โปรดตรวจสอบหมายเลขการทดสอบของคุณอีกครั้ง'
        );
        return;
      }
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      setError('เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/certificates/${certId}/download`);
      if (response.status === 404) {
        setError(
          'ไม่พบการทดสอบของคุณ โปรดตรวจสอบหมายเลขการทดสอบของคุณอีกครั้ง'
        );
        return;
      }
      if (!response.ok) {
        throw new Error('Download Error');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full items-center flex mt-6 lg:mt-54 flex-col">
      <div className="w-full max-w-[350px] flex flex-col gap-y-6 lg:gap-y-8">
        <p className="font-bold text-2xl md:text-3xl text-center">
          ตรวจสอบผลการทดสอบ
        </p>
        <p className="text-center text-sm lg:text-base">
          กรอกหมายเลขการทดสอบลงในช่อง
        </p>

        <div className="space-y-1">
          <Input
            onChange={(e) => {
              setCertId(e.target.value);
              setError('');
            }}
            value={certId}
            className={error ? 'border-red-500' : ''}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-center">
          <Button
            className="w-full"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'กำลังค้นหา...' : 'ตรวจสอบ'}
          </Button>
        </div>

        {(searchResult || true) && (
          <Card className="w-full">
            <CardContent className="flex items-center p-6 justify-between">
              <div className="flex items-center gap-x-4">
                <img
                  src={IMAGES.pdfIcon}
                  alt="PDF Icon"
                  className="h-12 w-12"
                />
                <div className="space-y-1">
                  <p className="font-medium">ชื่อไฟล์</p>
                  <p className="text-sm text-gray-500">รายละเอียด</p>
                </div>
              </div>
              <Button
                variant="link"
                onClick={handleDownload}
                disabled={isLoading}
                className="hover:no-underline"
              >
                <DownloadIcon className="h-6 w-6" />
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="text-center text-gray-500">กำลังดำเนินการ...</div>
        )}
      </div>
    </div>
  );
};

export default CheckCert;
