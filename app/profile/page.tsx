'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function Profile() {
    const {data,status} = useSession();
    const router = useRouter();
    console.log(status);
    
    useEffect(() => {
        if (status == "unauthenticated") {
          router.push("/auth/signin")
        }
      }, [router]);
    let initialProfile = {
        name: data?.user?.name || "",
        email:data?.user?.email ||"",
        avatar:data?.user?.image ||"",
        bio: 'Passionate about e-commerce and technology.',
        isMerchant: true,
        storeName: `${data?.user?.name}\'s Gadgets`,
        storeDescription: 'Selling the latest tech gadgets.',
        shippingAddress: '123 Main St, Anytown, AN 12345',
        paymentMethod: 'Visa ending in 1234'
     }
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(initialProfile)

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }


  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', profile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setProfile(initialProfile)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'View Profile' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Input
                  type="text"
                  name="avatar"
                  value={profile.avatar}
                  onChange={handleInputChange}
                  placeholder="Avatar URL"
                  className="w-full"
                />
              )}
            </div>
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <p>{profile.bio}</p>
                  <p>Account Type: {profile.isMerchant ? 'Merchant' : 'Consumer'}</p>
                </>
              )}
            </div>
          </div>

          <Tabs defaultValue={profile.isMerchant ? "merchant" : "consumer"} className="mt-6">
            <TabsList>
                {profile.isMerchant ? (
                     <TabsTrigger value="merchant">Merchant Info</TabsTrigger>
                ) :(<TabsTrigger value="consumer">Consumer Info</TabsTrigger>)}
              
            </TabsList>
            <TabsContent value="merchant">
              {isEditing ? (
                <>
                  <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={profile.storeName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      name="storeDescription"
                      value={profile.storeDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mt-4">Store Information</h3>
                  <p><strong>Store Name:</strong> {profile.storeName}</p>
                  <p><strong>Description:</strong> {profile.storeDescription}</p>
                </>
              )}
            </TabsContent>
            <TabsContent value="consumer">
              {isEditing ? (
                <>
                  <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="shippingAddress">Shipping Address</Label>
                    <Input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={profile.shippingAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Input
                      type="text"
                      id="paymentMethod"
                      name="paymentMethod"
                      value={profile.paymentMethod}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mt-4">Consumer Information</h3>
                  <p><strong>Shipping Address:</strong> {profile.shippingAddress}</p>
                  <p><strong>Payment Method:</strong> {profile.paymentMethod}</p>
                </>
              )}
            </TabsContent>
          </Tabs>

          {isEditing && (
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}