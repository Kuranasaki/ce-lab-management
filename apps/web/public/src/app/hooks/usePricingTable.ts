import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { PricingGroup } from '../data/models/Pricing';
import getPricingTable from '../domain/usecase/getPricingTable';

export function usePricingTable() {
  const [data, setData] = useState<PricingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getPricingTable();
    if (Array.isArray(data)) {
      setData(data);
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

  return { data, loading };
}
