import { useAuth } from "../../hooks/useAuth";
import { Button, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, Form, useToast, ToastEntity } from "@ce-lab-mgmt/shared-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { registerUser } = useAuth();

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
    });

    const handleSubmit = async () => {
        try {
            await registerUser(form.getValues().email, form.getValues().password);
            toast(new ToastEntity("ลงทะเบียนสำเร็จ", "คุณลงทะเบียนสำเร็จแล้ว", "success"));
            navigate('/');
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    form.setError("email", { type: "manual", message: "อีเมลนี้ถูกใช้งานแล้ว" });
                    return;
                }
            }
            toast(new ToastEntity("เกิดข้อผิดพลาด", "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองอีกครั้ง", "destructive"));
        }
    };


    return (
        <div className="flex max-w-screen-lg w-full h-[670px] bg-white shadow-md rounded-md m-24 overflow-clip">
            <div className='text-white w-full max-w-96 flex flex-col justify-center text-center items-center gap-10 px-16 bg-blue-400 bg-opacity-70'>
                <h2>สำหรับผู้มีบัญชี</h2>
                <p>ลงชื่อเข้าใช้เพื่อจองการทดสอบ</p>
                <Link to="/auth/signin">
                    <Button variant="default" className="bg-white text-primary-500 border border-primary-500 hover:bg-slate-100">
                        ลงชื่อเข้าใช้
                    </Button>
                </Link>
            </div>
            <div className='flex flex-1 flex-col justify-center text-center items-center gap-10 px-28'>
                <h2 className="text-slate-900">สร้างบัญชี</h2>
                <div className='flex flex-col gap-4 w-full'>
                    <p className='text-slate-500'>สร้างบัญชีเพื่อจองการทดสอบ</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                                                <Input type="password" placeholder="" {...field} />
                                            </FormControl>
                                            {error && <FormMessage className="text-error-500 text-sm">{error.message}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                ลงทะเบียน
                            </Button>
                            {form.formState.errors.root && (
                                <FormMessage className="text-error-500 text-sm">{form.formState.errors.root.message}</FormMessage>
                            )}
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
