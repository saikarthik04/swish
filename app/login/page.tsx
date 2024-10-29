"use client"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const page = () => {
  return (
    <>
    <div className='h-screen flex justify-center items-center '>
    <Button onClick={()=> signIn('google',{callbackUrl:"/",redirect:true})}><FcGoogle /> sign in with google</Button>
    </div>
    </>
  )
}

export default page