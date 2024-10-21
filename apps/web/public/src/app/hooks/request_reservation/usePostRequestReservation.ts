import { useState } from 'react';
import { RequestReservationEntity } from '../../domain/entity/request_reservation/reqReservRequestEntity';
import postRequestReservationUsecase from '../../domain/usecase/request_reservation/postRequestReservationUsecase';
import { useToast } from '@ce-lab-mgmt/shared-ui';
import { useNavigate } from 'react-router-dom';

export default function usePostRequestReservation() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const postRequestReservation = async (data: RequestReservationEntity) => {
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
