import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  orgFormSchema,
  OrgInfoFormType,
} from '../../domain/entity/request_reservation/reqReservRequestFormEntity';

export function useOrgInfoForm() {
  const form = useForm<OrgInfoFormType>({
    resolver: zodResolver(orgFormSchema),
    defaultValues: {
      orgName: '',
      orgProjectName: '',
      orgAddress: '',
      orgEmail: '',
      orgPhone: '',
      orgFax: '',
    },
  });

  return { orgForm: form };
}
