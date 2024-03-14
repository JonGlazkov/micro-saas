/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ReactNode, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { upsertTodo } from '../actions'
import { upsertTodoSchema } from '../schema'
import { Todo } from '../types'

type TodoUpsertSheetProps = {
  children?: ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(upsertTodoSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data)
    router.refresh()

    ref.current?.click()

    toast({
      title: 'Success',
      description: 'Your todo has been updated successfully.',
    })
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-8 h-screen flex flex-col"
          >
            <SheetHeader>
              <SheetTitle>Upsert Todo</SheetTitle>
              <SheetDescription>
                Make changes to your todo here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your todo title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the publicity displayed name for the task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
