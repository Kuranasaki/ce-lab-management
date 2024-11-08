import CustomerDetailProps from '../../../domain/entity/view_reservation_detail/CustomerDetailProps';
import { DetailBox } from '@ce-lab-mgmt/shared-ui';

export default function CustomerDetail({
  data,
}: {
  data: CustomerDetailProps;
}) {
  if (data != null) {
    const organizationDetails = [
      { title: 'บริษัท/หน่วยงาน:', value: data.orgName },
      { title: 'โครงการ:', value: data.orgProjectName },
      { title: 'ที่อยู่:', value: data.orgAddress },
      { title: 'อีเมล:', value: data.orgEmail },
      { title: 'โทรศัพท์:', value: data.formatPhone() },
      { title: 'โทรสาร:', value: data.orgFax },
    ];
    return <DetailBox data={organizationDetails} />;
  }

  return null;
}
