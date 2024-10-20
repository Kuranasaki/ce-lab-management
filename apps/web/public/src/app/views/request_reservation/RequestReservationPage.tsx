import { useState } from 'react';
import Stage1 from './components/stages/Stage1';
import Stage2 from './components/stages/Stage2';
import Stage3 from './components/stages/Stage3';
import StageNavigator from './components/StageNavigator';
import { useTestListForm } from '../../hooks/request_reservation/useTestListForm';
import { useOrgInfoForm } from '../../hooks/request_reservation/useOrgInfoForm';
import usePricingList from '../../hooks/request_reservation/usePricingList';
import { Loading } from '@ce-lab-mgmt/shared-ui';
import usePostRequestReservation from '../../hooks/request_reservation/usePostRequestReservation';

export default function RequestReservationPage() {
  const [stage, setStage] = useState(1);
  const { orgForm } = useOrgInfoForm();
  const { testListForm } = useTestListForm();
  const { pricingList, loading: pricingLoading } = usePricingList();
  const { post, loading: postLoadling } = usePostRequestReservation();

  if (pricingLoading || postLoadling) {
    return (
      <div className="w-full h-[50dvh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <StageNavigator currentStage={stage} />
      {
        {
          1: <Stage1 orgForm={orgForm} setStage={setStage} />,
          2: (
            <Stage2
              testListForm={testListForm}
              pricingList={pricingList}
              setStage={setStage}
            />
          ),
          3: (
            <Stage3
              orgForm={orgForm}
              testListForm={testListForm}
              pricingList={pricingList}
              setStage={setStage}
              post={post}
            />
          ),
        }[stage]
      }
    </div>
  );
}
