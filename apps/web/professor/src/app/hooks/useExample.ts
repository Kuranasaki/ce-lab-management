import { useEffect, useState } from 'react';
import ToBeRenderedData from '../domain/entity/toBeRenderedData';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import exampleUseCase from '../domain/usecase/exampleUseCase';

export function useExample() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await exampleUseCase();

    if (data instanceof ToBeRenderedData) {
      setPrice((data as ToBeRenderedData).totalPrice);
    }

    if (data instanceof ToastEntity) {
      // Show toast using redux?
      console.log((data as ToastEntity).description);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { price, loading };
}
