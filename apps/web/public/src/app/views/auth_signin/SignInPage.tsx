import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@ce-lab-mgmt/shared-ui';
import { Icon } from '@iconify/react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleSignIn = async () => {
    try {
      await signIn();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="flex max-w-screen-lg w-full h-[670px] bg-white shadow-md rounded-md m-24 overflow-clip">
      <div className='flex flex-1 flex-col justify-center text-center items-center gap-10 px-28'>
        <h2 className="text-slate-900">ลงชื่อเข้าใช้</h2>
        <div className='flex flex-col gap-4 w-full'>
          <p className='text-slate-500'>ลงชื่อเข้าใช้เพื่อจองการทดสอบของคุณ</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <FormLabel className="font-medium">อีเมล</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    {error && <p className="text-error-500 text-sm">{error.message}</p>}
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
                    {error && <p className="text-error-500 text-sm">{error.message}</p>}
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                ลงชื่อเข้าใช้
              </Button>
            </form>
          </Form>

          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="px-4 text-slate-500">หรือ</span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          <Button variant="outline" onClick={handleSignIn} className="">
            <Icon icon="logos:google-icon" className='size-4' />
            ลงชื่อเข้าใช้ด้วย Google
          </Button>
        </div>
      </div>

      <div className='text-white w-full max-w-96 flex flex-col justify-center text-center items-center gap-10 px-16 bg-blue-400 bg-opacity-70'>
        <h2>ล็อกอิน</h2>
        <p>สร้างบัญชีเพื่อจองการทดสอบ</p>
        <Link to="/auth/signup">
          <Button variant="default" onClick={() => { }} className="bg-white text-primary-500 border border-primary-500 hover:bg-slate-100">
            ลงทะเบียน
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;