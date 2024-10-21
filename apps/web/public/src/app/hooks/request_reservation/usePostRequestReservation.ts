import { useState } from 'react';
import postRequestReservationUsecase from '../../domain/usecase/request_reservation/postRequestReservationUsecase';
import { useToast } from '@ce-lab-mgmt/shared-ui';
import { useNavigate } from 'react-router-dom';
import { TestListFormReturned } from '../../domain/entity/request_reservation/reqReservRequestFormEntity';

export default function usePostRequestReservation() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const postRequestReservation = async (data: TestListFormReturned) => {
    setLoading(true);
    const result = await postRequestReservationUsecase(data);
    setLoading(false);

    if (result.variant === 'success') {
      navigate('/reservation');
    }

    toast({
      ...result,
    });
  };

  return { post: postRequestReservation, loading };
}
