import { useEffect, useState } from 'react';
import { PricingListProps } from '../../domain/entity/request_reservation/pricingListProps';
import getAllPricingUsecase from '../../domain/usecase/request_reservation/getAllPricingUsecase';

export default function usePricingList() {
  const [pricingList, setPricingList] = useState<PricingListProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPricingList = async () => {
    setLoading(true);
    const props = await getAllPricingUsecase();
    setPricingList(props);
    setLoading(false);
  };

  useEffect(() => {
    fetchPricingList();
  }, []);

  return { pricingList, loading };
}
