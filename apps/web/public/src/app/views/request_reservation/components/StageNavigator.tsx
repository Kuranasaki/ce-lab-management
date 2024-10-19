import { CheckCircledIcon } from '@radix-ui/react-icons';

export default function StageNavigator({
  currentStage,
}: {
  currentStage: number;
}) {
  return (
    <div className="flex flex-row items-center">
      {/* Render all stages on larger screens */}
      <div className="hidden sm:flex flex-row items-center lg:gap-10 md:gap-6 gap-2">
        <StageNavItem
          state={
            currentStage > 1
              ? 'passed'
              : currentStage === 1
              ? 'current'
              : 'future'
          }
          number={1}
          title="ข้อมูลผู้ขอทดสอบ"
        />
        <div className="lg:w-32 h-[2px] bg-slate-500"></div>
        <StageNavItem
          state={
            currentStage > 2
              ? 'passed'
              : currentStage === 2
              ? 'current'
              : 'future'
          }
          number={2}
          title="ข้อมูลการทดสอบ"
        />
        <div className="lg:w-32 h-[2px] bg-slate-500"></div>
        <StageNavItem
          state={
            currentStage > 3
              ? 'passed'
              : currentStage === 3
              ? 'current'
              : 'future'
          }
          number={3}
          title="ยืนยันข้อมูล"
        />
      </div>

      {/* Show only the current stage on smaller screens */}
      <div className="sm:hidden w-full">
        <StageNavItem
          state={'current'}
          number={currentStage}
          title={getStageTitle(currentStage)}
        />
      </div>
    </div>
  );
}

function StageNavItem({
  state,
  number,
  title,
}: {
  state: 'passed' | 'current' | 'future';
  number: number;
  title: string;
}) {
  return (
    <div className="flex flex-row gap-3">
      {(() => {
        if (state === 'passed') {
          return (
            <CheckCircledIcon className="w-8 h-8 rounded-full bg-success-500 text-slate-50" />
          );
        } else if (state === 'current') {
          return (
            <div className="rounded-full w-8 h-8 flex justify-center items-center bg-primary-500 text-slate-50">
              {number}
            </div>
          );
        } else {
          return (
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-slate-500 border-slate-500 border-2">
              {number}
            </div>
          );
        }
      })()}
      <h5>{title}</h5>
    </div>
  );
}

function getStageTitle(stage: number): string {
  switch (stage) {
    case 1:
      return 'ข้อมูลผู้ขอทดสอบ';
    case 2:
      return 'ข้อมูลการทดสอบ';
    case 3:
      return 'ยืนยันข้อมูล';
    default:
      return '';
  }
}
