import {
  Button,
  Card,
  CardContent,
  FileCard,
  Input,
  ToastEntity,
} from '@ce-lab-mgmt/shared-ui';
import IMAGES from '../../../assets/images';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Certificate } from '../../domain/entity/get_certificate/certificateEntity';
import getCertificateUsecase from '../../domain/usecase/get_certificate/getCertificate';
import axios from 'axios';

const CheckCert = () => {
  const [certId, setCertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Certificate | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!certId.trim()) {
      setError('กรุณากรอกหมายเลขการทดสอบ');
      return;
    }
    setIsLoading(true);
    try {
      const cert = await getCertificateUsecase(certId);
      if (cert instanceof Certificate) {
        setSearchResult(cert);
      } else if (cert instanceof ToastEntity) {
        setError((cert as ToastEntity).description);
        return;
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!searchResult) return;
    try {
      setIsLoading(true);
      const link = document.createElement('a');
      link.href = searchResult.url;
      link.target = '_blank';
      link.download = `certificate-${certId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full items-center flex mt-6 lg:mt-54 flex-col">
      <div className="w-full max-w-[500px] flex flex-col gap-y-6 lg:gap-y-8">
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

        {searchResult && (
          <FileCard
            isLoading={isLoading}
            fileName={searchResult.fileName}
            description={searchResult.getDescription()}
            handleDownload={handleDownload}
            imgUrl={
              searchResult.mimeType === 'application/pdf'
                ? IMAGES.pdfIcon
                : searchResult.mimeType === 'application/xlsx'
                ? IMAGES.excelIcon
                : undefined
            }
          />
        )}

        {isLoading && (
          <div className="text-center text-gray-500">กำลังดำเนินการ...</div>
        )}
      </div>
    </div>
  );
};

export default CheckCert;
