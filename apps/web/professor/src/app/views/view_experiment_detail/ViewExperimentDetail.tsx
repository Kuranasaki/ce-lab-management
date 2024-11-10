import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button, DetailBox, FileCard } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "lucide-react";
import { useExperimentDetail } from "../../hooks/view_experiment_detail/useExperimentDetail";
import IMAGES from "../../../assets/images";

export default function ViewExperimentDetailPage() {
  const { t } = useTranslation(['common', 'view_experiment_detail', "view_experiments"]);
  const { id } = useParams();

  if (!id) {
    return null;
  }
  const { experimentDetail, loading } = useExperimentDetail(id);

  if (loading) {
    return <p>{t('view_experiment_detail:loading')}...</p>;
  }

  const experimentDetailBox = [
    { title: t('view_experiment_detail:experiment_id'), value: experimentDetail?.id },
    { title: t('view_experiment_detail:assigned_date'), value: experimentDetail?.formatAssignedAt() },
    { title: t('view_experiment_detail:status'), value: t(`view_experiments:${experimentDetail?.status}`) },
    { title: t('view_experiment_detail:test_name'), value: experimentDetail?.testName },
    { title: t('view_experiment_detail:test_amount'), value: experimentDetail?.testAmount },
    { title: t('view_experiment_detail:test_details'), value: experimentDetail?.testDetails },
    { title: t('view_experiment_detail:test_notes'), value: experimentDetail?.testNote },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4>{t('view_experiment_detail:experiment_detail')}</h4>
        <DetailBox data={experimentDetailBox} />
      </div>

      <div className="flex flex-col gap-4">
        <h4>{t('view_experiment_detail:assigned_tester')}</h4>
        <div>{experimentDetail?.assignedProfessorName}</div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex justify-between">
          <h4>{t('view_experiment_detail:experiment_result')}</h4>
          {experimentDetail?.status === 'waiting_for_test' && !experimentDetail?.testFormURL && (
            <Button variant="default" size="sm">
              <PlusIcon aria-label={t('view_experiment_detail:add_icon')} />
              {t('view_experiment_detail:add_new_experiment_form')}
            </Button>
          )}
        </div>

        {experimentDetail?.status === 'waiting_for_test' ? (
          experimentDetail?.testFormURL ? (
            <>
              <div>EXCEL</div>
              <div className="flex justify-end gap-2">
                <Button variant="destructive" size="sm">{t('view_experiment_detail:delete_test_result')}</Button>
                <Button variant="accept" size="sm">{t('view_experiment_detail:submit_test_result')}</Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex rounded-md border border-slate-300 py-24 justify-center items-center bg-white text-slate-500">
              {t('view_experiment_detail:no_experiment_form')}
            </div>
          )
        ) : (
          <div className="max-w-lg w-full space-y-2">
            <FileCard
              isLoading={loading}
              fileName={"searchResult.fileName"}
              description={"searchResult.getDescription()"}
              handleDownload={() => { }}
              imgUrl={IMAGES.excelIcon}
            />
            <p className="text-slate-500">{t('view_experiment_detail:sent_at')} {experimentDetail?.formatMarkedAsDoneAt()}</p>
          </div>
        )}
      </div>

      {experimentDetail?.status !== 'waiting_for_test' && (
        <div className="flex flex-col gap-4">
          <h4>{t('view_experiment_detail:certificate')}</h4>
          <div className="max-w-lg w-full space-y-2">
            {
              experimentDetail?.status !== 'waiting_for_certificate' ?
                <>
                  <FileCard
                    isLoading={loading}
                    fileName={"searchResult.fileName"}
                    description={"searchResult.getDescription()"}
                    handleDownload={() => { }}
                    imgUrl={IMAGES.pdfIcon}
                  />
                  <p className="text-slate-500">{t('view_experiment_detail:upload_at')} {experimentDetail?.formatCertificateUploadedAt()}</p>
                </>
                : <FileCard
                  isLoading
                  fileName=""
                  description=""
                />
            }
          </div>
        </div>
      )}
    </div>
  );
}


// const statusMap: {
//     [key in ReservationStatus]: {
//       text: string;
//       bgColor: string;
//       textColor: string;
//     };
//   } = {
//     [ReservationStatus.Pending]: {
//       text: 'รออนุมัติ',
//       bgColor: 'bg-warning-100',
//       textColor: 'text-warning-700',
//     },
//     [ReservationStatus.Processing]: {
//       text: 'กำลังทดสอบ',
//       bgColor: 'bg-primary-100',
//       textColor: 'text-primary-700',
//     },
//     [ReservationStatus.Success]: {
//       text: 'สำเร็จ',
//       bgColor: 'bg-success-100',
//       textColor: 'text-success-500',
//     },
//     [ReservationStatus.Canceled]: {
//       text: 'ยกเลิก',
//       bgColor: 'bg-error-100',
//       textColor: 'text-error-700',
//     },
//   };

