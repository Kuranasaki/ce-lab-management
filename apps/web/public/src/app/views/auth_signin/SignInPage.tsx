import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, ToastEntity, useToast } from '@ce-lab-mgmt/shared-ui';
import { Icon } from '@iconify/react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const formSchema = z.object({
    email: z.string().email({
      message: "อีเมลไม่ถูกต้อง",
    }),
    password: z.string().min(8, {
      message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSignIn = async (provider?: string) => {
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithEmail(form.getValues().email, form.getValues().password);
      }

      toast(new ToastEntity("ยินดีต้อนรับ", "ลงชื่อเข้าใช้สำเร็จแล้ว", "success"));
      navigate('/');
    } catch (error) {
      console.log('ไม่สามารถลงชื่อเข้าใช้ได้ กรุณาตรวจสอบข้อมูลของคุณ');
      form.setError("root", { type: "manual", message: "ไม่สามารถลงชื่อเข้าใช้ได้ กรุณาตรวจสอบข้อมูลของคุณ" });
    }
  };


  return (
    <div className="flex max-w-screen-lg w-full h-[670px] bg-white shadow-md rounded-md m-24 overflow-clip">
      <div className='flex flex-1 flex-col justify-center text-center items-center gap-10 px-28'>
        <h2 className="text-slate-900">ลงชื่อเข้าใช้</h2>
        <div className='flex flex-col gap-4 w-full'>
          <p className='text-slate-500'>ลงชื่อเข้าใช้เพื่อจองการทดสอบของคุณ</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => handleSignIn())} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex flex-col items-start gap-1">
                      <FormLabel className="font-medium">อีเมล</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {error && <FormMessage className="text-error-500 text-sm">{error.message}</FormMessage>}
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
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {error && <FormMessage className="text-error-500 text-sm">{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                ลงชื่อเข้าใช้
              </Button>
              {form.formState.errors.root && (
                <FormMessage className="text-error-500 text-sm">{form.formState.errors.root.message}</FormMessage>
              )}
            </form>
          </Form>

          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="px-4 text-slate-500">หรือ</span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          <Button variant="outline" onClick={() => handleSignIn("google")} className="">
            <Icon icon="logos:google-icon" className='size-4' />
            ลงชื่อเข้าใช้ด้วย Google
          </Button>
        </div>
      </div>

      <div className='text-white w-full max-w-96 flex flex-col justify-center text-center items-center gap-10 px-16 bg-blue-400 bg-opacity-70'>
        <h2>ล็อกอิน</h2>
        <p>สร้างบัญชีเพื่อจองการทดสอบ</p>
        <Link to="/auth/signup">
          <Button variant="default" className="bg-white text-primary-500 border border-primary-500 hover:bg-slate-100">
            ลงทะเบียน
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;