import { CheckCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Icon } from '@iconify/react';
import { useToast } from '../../hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='flex gap-3 items-center'>
              {props.variant === 'success' ? <CheckCircledIcon className='size-6 text-success-500' /> : null}
              {props.variant === 'destructive' ? <Icon icon="mi:circle-warning" className='size-6 text-error-500' /> : null}
              {props.variant === 'warning' ? <Icon icon="cuida:warning-outline" className='size-6 text-warning-500' /> : null}
              {props.variant === 'info' ? <InfoCircledIcon className='size-6 text-primary-500' /> : null}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
