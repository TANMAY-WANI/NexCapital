'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null)
  const [isLoading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>)=> {
    setLoading(true);

    try {
      if (type === 'sign-up'){
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          email: data.email,
          password: data.password
        }
        const newUser = await signUp(userData);
        console.log(newUser);
        
        setuser(newUser);
      }

      if (type === 'sign-in'){
        const userData = {
          email:data.email,
          password:data.password
        }

        const response = await signIn(userData)
        if (response) router.push("/")
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false);
    }
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer items-center gap-1 flex'>
          <Image src="/icons/logo.svg" height={34} width={34} alt='NexCapital Logo' />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>NexCapital</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900' >
            {user ? 'Link Account' : type === "sign-in" ? " Sign In" : "Sign Up"}
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {user ? "Link your account to get started" : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>

        </div>
      ) : (<>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {type === 'sign-up' &&
              (
                <>

                  <div className='flex gap-4'>
                    <CustomInput control={form.control}
                      name='firstName' label="First Name" placeholder='ex: John' />
                    <CustomInput control={form.control}
                      name='lastName' label="Last Name" placeholder='ex: Doe' />
                  </div>


                  <CustomInput control={form.control}
                    name='address1' label="Address" placeholder='Enter your specific address' />

                  <div className='flex gap-4'>

                    <CustomInput control={form.control}
                      name='state' label="State" placeholder='ex: Gujarat' />
                    <CustomInput control={form.control}
                      name='postalCode' label="Postal Code" placeholder='ex: 396002' />

                  </div>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control}
                      name='dateOfBirth' label="Date of Birth" placeholder='yyyy-mm-dd' />

                    <CustomInput control={form.control}
                      name='city' label="City" placeholder='ex: Ahemdabad' />
                  </div>
                </>
              )
            }
            <CustomInput control={form.control}
              name='email' label="Email" placeholder='Enter your email' />
            <CustomInput control={form.control}
              name='password' label="Password" placeholder='Enter your password' />
            <div className='flex flex-col gap-4'>
              <Button className='form-btn ' type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2
                      className='animate-spin'
                    /> &nbsp; Loading...
                  </>
                ) : type === "sign-in" ? "Sign In" : "Sign Up"}
              </Button>
            </div>
            <footer className='flex justify-center gap-1'>
              <p className='text-14 font-normal text-gray-600'>{type === "sign-in"
                ? "Don\'t have an account?"
                : "Already have an account?"}</p>
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>
            </footer>
          </form>
        </Form>
      </>)}
    </section>
  )
}

export default AuthForm