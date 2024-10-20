import { useState } from 'react';
import { RequestReservationEntity } from '../../domain/entity/request_reservation/reqReservRequestEntity';
import postRequestReservationUsecase from '../../domain/usecase/request_reservation/postRequestReservationUsecase';

export default function usePostRequestReservation() {
  const [loading, setLoading] = useState(false);

  const postRequestReservation = async (data: RequestReservationEntity) => {
    setLoading(true);
    const result = await postRequestReservationUsecase(data);
    setLoading(false);
    if (result.type === 'error') {
      // Show toast using redux?
      console.log(result.description);
    } else {
      // Redirect to view reservation page
    }
  };

  return { post: postRequestReservation, loading };
}
