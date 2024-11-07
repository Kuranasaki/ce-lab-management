import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ToastEntity,
  useToast,
} from '@ce-lab-mgmt/shared-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import IMAGES from '../../../assets/images';

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    [IMAGES.loginBg].forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
  }, []);

  const formSchema = z.object({
    email: z.string().email({
      message: 'อีเมลไม่ถูกต้อง',
    }),
    password: z.string().min(8, {
      message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSignIn = async (provider?: string) => {
    try {

      // TODO: sigin chula sso

      toast(
        new ToastEntity('ยินดีต้อนรับ', 'ลงชื่อเข้าใช้สำเร็จแล้ว', 'success')
      );
      navigate('/');
    } catch (error) {
      console.log('ไม่สามารถลงชื่อเข้าใช้ได้ กรุณาตรวจสอบข้อมูลของคุณ');
      form.setError('root', {
        type: 'manual',
        message: 'ไม่สามารถลงชื่อเข้าใช้ได้ กรุณาตรวจสอบข้อมูลของคุณ',
      });
    }
  };

  return (
    <div className="flex max-w-screen-sm w-full h-[600px] bg-white shadow-md rounded-md m-24 overflow-clip">
      <div className="flex flex-1 flex-col justify-center text-center items-center gap-10 px-28">
        <h2 className="text-slate-900">ลงชื่อเข้าใช้</h2>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-slate-500">ลงชื่อเข้าใช้ผ่านบัญชีจุฬาของคุณ</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => handleSignIn())}
              className="space-y-4"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex flex-col items-start gap-1">
                      <FormLabel className="font-medium">อีเมล</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {error && (
                        <FormMessage className="text-error-500 text-sm">
                          {error.message === 'Required'
                            ? 'กรุณาระบุอีเมล'
                            : error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex flex-col items-start gap-1">
                      <FormLabel className="font-medium">รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="password" />
                      </FormControl>
                      {error && (
                        <FormMessage className="text-error-500 text-sm">
                          {error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                ลงชื่อเข้าใช้
              </Button>
              {form.formState.errors.root && (
                <FormMessage className="text-error-500 text-sm">
                  {form.formState.errors.root.message}
                </FormMessage>
              )}
            </form>
          </Form>
        </div>
      </div>

    </div>
  );
};

export default SignInPage;
