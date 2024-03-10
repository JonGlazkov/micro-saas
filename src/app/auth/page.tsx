import { auth } from '@/services/auth'
import { AuthForm } from './_components/auth-form'

export default async function Page() {
  await auth()
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <AuthForm />
    </main>
  )
}
