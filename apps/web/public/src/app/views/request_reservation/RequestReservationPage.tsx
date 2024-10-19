import { useState } from 'react';
import Stage1 from './components/stages/Stage1';
import Stage2 from './components/stages/Stage2';
import Stage3 from './components/stages/Stage3';
import StageNavigator from './components/StageNavigator';
import useOrgInfoForm from '../../hooks/request_reservation/useOrgInfoForm';
import useTestListForm from '../../hooks/request_reservation/useTestListForm';

export default function RequestReservationPage() {
  const [stage, setStage] = useState(1);
  const { orgForm, onOrgSubmit } = useOrgInfoForm(setStage);
  const { testListForm, onTestListSubmit } = useTestListForm(setStage);
  return (
    <div className="flex flex-col items-center gap-8">
      <StageNavigator currentStage={stage} />
      {
        {
          1: <Stage1 orgForm={orgForm} onSubmit={onOrgSubmit} />,
          2: (
            <Stage2
              testListForm={testListForm}
              onSubmit={onTestListSubmit}
              setStage={setStage}
            />
          ),
          3: <Stage3 />,
        }[stage]
      }
    </div>
  );
}
