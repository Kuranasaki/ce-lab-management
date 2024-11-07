import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { FileClock, Trash } from 'lucide-react';
import React, { FC } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface Props {
  isLoading: boolean;
  handleDownload?: () => void;
  fileName: string;
  description: string;
  handleDelete?: () => void;
  deletable?: boolean;
  imgUrl?: string;
}

export const FileCard: FC<Props> = ({
  description,
  fileName,
  handleDelete,
  isLoading,
  deletable,
  handleDownload,
  imgUrl,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center p-6 justify-between">
        {isLoading ? (
          <div className="flex items-center gap-x-4">
            <FileClock color="#6b7280" size={40} strokeWidth={1} />
            <div className="space-y-1 flex items-center h-12">
              <p className="text-sm text-gray-500">กำลังดำเนินการออกใบรับรอง</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-x-4">
              {imgUrl ? (
                <img src={imgUrl} alt="PDF Icon" className="h-10 w-10" />
              ) : (
                <FileClock size={40} strokeWidth={1} />
              )}
              <div className="space-y-1">
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <Button
                variant="link"
                onClick={handleDownload}
                disabled={isLoading}
                size="icon"
                className="hover:no-underline hover:bg-slate-100"
              >
                <DownloadIcon />
              </Button>
              {deletable && handleDelete && (
                <Button
                  variant="link"
                  size="icon"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="hover:no-underline hover:bg-error-100 flex"
                >
                  <Trash color="#DC2626" size={36} />
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
