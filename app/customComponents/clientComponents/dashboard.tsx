"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react';
import React from 'react'
const Dashboard = () => {
  const {data,status} = useSession();
  return (
    <div className='m-4 min-h-screen'>
       <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Listings</CardTitle>
        <CardDescription>your Recent listings</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
    </div>
  )
}

export default Dashboard