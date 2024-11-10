import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import getCertificate from '../../domain/usecase/get_certificate/getCertificate';
import { Certificate } from '../../domain/entity/get_certificate/certificateEntity';

export function useCertificate(id: string) {
  const [data, setData] = useState<Certificate>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getCertificate(id);

    if (data instanceof ToastEntity) {
      // Show toast using redux?
      console.log((data as ToastEntity).description);
      return;
    }

    if (data) {
      setData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}
