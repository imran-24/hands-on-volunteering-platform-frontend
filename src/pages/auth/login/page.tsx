"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAuth } from "@/context/auth-provider";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Passwod must be at least 8 characters.",
  }),
});

export function LoginPage() {
  const router = useNavigate();
  const { setToken, setUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BASE_URL}/auth/login`,
        values
      );
      console.log(response.data.accessToken);
      setToken(response.data.accessToken);
      console.log(response.data.user);
      setUser(response.data.user);
      router("/dashboard");
      // window.location.assign('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen bg-gradient-to-r from-red-200/20 to-rose-200 px-4 py-20 lg:px-14 '>
      <div className='grid grid-cols-1 md:grid-cols-2 bg-white h-full rounded-3xl max-w-4xl w-full mx-auto '>
        <div className='hidden md:flex overflow-hidden'>
          <img
            src='/src/assets/images/login.webp'
            alt=''
            className='h-full object-cover object-start overflow-hidden'
          />
        </div>
        <div className='flex flex-1 p-10'>
          <div className='flex flex-col  justify-start  w-full space-y-4'>
            <h2 className='text-3xl font-bold text-center'>Login</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='rounded-full'>
                  Login
                </Button>
              </form>
            </Form>

            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-medium'>Don't have an account? </p>
              <Link to={"/auth/register"} className='underline text-gray-500'>
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
