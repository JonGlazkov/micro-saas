'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('email', { email: data.email, redirect: false })
      toast({
        title: 'Magic link sent',
        description: 'Check your email for the magic link to login',
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description:
          'An error occurred sending the magic link. Please try again.',
      })
    }
  })

  return (
    <div className="mx-auto max-w-sm max-h-fit space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            {...form.register('email')}
          />
        </div>
        <Button className="w-full">Send Magic Link</Button>
      </form>
    </div>
  )
}
