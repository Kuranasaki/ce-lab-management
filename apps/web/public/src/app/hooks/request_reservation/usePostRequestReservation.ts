import { useState } from 'react';
import postRequestReservationUsecase from '../../domain/usecase/request_reservation/postRequestReservationUsecase';
import { useToast } from '@ce-lab-mgmt/shared-ui';
import { useNavigate } from 'react-router-dom';
import {
  OrgInfoFormReturned,
  TestListFormReturned,
} from '../../domain/entity/request_reservation/reqReservRequestFormEntity';

export default function usePostRequestReservation() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const postRequestReservation = async ({
    orgForm,
    testListForm,
  }: {
    orgForm: OrgInfoFormReturned;
    testListForm: TestListFormReturned;
  }) => {
    setLoading(true);
    const result = await postRequestReservationUsecase({
      orgForm,
      testListForm,
    });
    setLoading(false);

    // if (result.variant === 'success') {
    //   navigate('/reservation');
    // }

    toast({
      ...result,
    });
  };

  return { post: postRequestReservation, loading };
}
