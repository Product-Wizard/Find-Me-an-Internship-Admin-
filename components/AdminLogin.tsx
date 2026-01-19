import React, { useState } from "react";
import {
  Building2,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";
import AuthFormValidator from "@/FormValidators/AuthFormValidators";
import AuthService from "@/ApiService/AuthService";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import FormErrorMessage from "./FormErrorMessage";
import { Login } from "@/types/model/Auth.model";
import toast from "react-hot-toast";
import UserStore from "@/store/User.store";
interface AdminLoginProps {}

export const AdminLogin: React.FC<AdminLoginProps> = ({}) => {
  const loginMutation = AuthService.loginServiceMutation();
  const loginForm = AuthFormValidator.createLoginForm();
  const { setToken, setUser } = UserStore();
  const handleSubmit = (data: Login) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message || "login succesful");
        setUser(data.data);
        setToken(data.token);
      },
      onError: (data: any) => {
        toast.error(
          data?.response?.data?.message || data?.message || "login error"
        );
      },
    });

    // Simulate API delay
  };

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4'>
      {/* {loginMutation.isPending ? <BlockLoadingIndicator /> : null} */}
      <div className='mb-8 text-center'>
        <div className='inline-flex items-center justify-center bg-brand-teal/10 p-4 rounded-2xl mb-4'>
          <GraduationCap className='w-8 h-8 text-brand-dark' />
          <Building2 className='w-8 h-8 text-brand-teal ml-[-8px]' />
        </div>
        <h1 className='text-3xl font-bold text-brand-dark'>Admin Portal</h1>
        <p className='text-slate-500'>Manage opportunities and resources</p>
      </div>

      <div className='bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md'>
        <form
          onSubmit={loginForm.handleSubmit(handleSubmit)}
          className='space-y-6'
        >
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Email Address
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
              <input
                type='email'
                className='w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all'
                placeholder='admin@findmeaninternship.org'
                {...loginForm.register("email")}
              />
              <FormErrorMessage
                message={loginForm?.formState?.errors?.email?.message}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
              <input
                type='password'
                className='w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all'
                placeholder='••••••••'
                {...loginForm.register("password")}
              />
              <FormErrorMessage
                message={loginForm?.formState?.errors?.password?.message}
              />
            </div>
          </div>

          {/* {loginMutation.isError && (
            <div className='p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2'>
              <div className='w-1.5 h-1.5 rounded-full bg-red-600'></div>
              {loginMutation.data!?.message || ""}
            </div>
          )} */}

          <button
            type='submit'
            disabled={loginMutation?.isPending}
            className='w-full bg-brand-dark hover:bg-brand-teal text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70'
          >
            {loginMutation?.isPending ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <>
                Sign In <ArrowRight className='w-5 h-5' />
              </>
            )}
          </button>
        </form>

        <div className='mt-6 text-center text-xs text-slate-400'>
          Protected System. Authorized Access Only.
        </div>
      </div>
    </div>
  );
};
