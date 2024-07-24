'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label, Project, Task } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import { PenBoxIcon, SquareCheckIcon } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { editTaskAction } from '@/actions/task/edit'
import { EditTaskSchema, TEditTaskData } from '@/actions/task/edit/schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { customToast } from '@/lib/custom-toast'

import { TimePicker } from '../time-picker'
import { Badge } from '../ui/badge'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { BadgeTask } from './badge-task'
import { dataPriority, FormCreateSelectTask } from './form-create-select-task'

interface FormEditTaskProps {
  task: Task
  labels: Label[]
  projects: Project[]
}
export function FormEditTask({ task, labels, projects }: FormEditTaskProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [time, setTime] = useState(false)
  const [isStartAt, setIsStartAt] = useState<string>(task.startAt || '')
  const [isEndAt, setIsEndAt] = useState<string>(task.endAt || '')
  const [selectingStartAt, setSelectingStartAt] = useState(true)
  const [isPending, startTransition] = useTransition()
  const editTaskActionById = editTaskAction.bind(null, task.userId, task.id)
  const defaultValues = {
    taskName: task.taskName,
    priority: task.priority,
    projectId: task.projectId || 'clyt0n1w8000013m3fnxk04t7',
    labelId: task.labelId || 'clyq8srh90000btmrqf8vad9g',
    dueDate: task.dueDate,
    startAt: task.startAt || '',
    endAt: task.endAt || '',
  }
  const form = useForm<TEditTaskData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues,
  })

  const { watch, setValue, reset } = form
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDate = watch('dueDate')

  function handleTimeClick(time: string) {
    if (selectingStartAt) {
      handleTimeChange(time, 'startAt')
      setSelectingStartAt(false)
    } else {
      handleTimeChange(time, 'endAt')
      setSelectingStartAt(true)
    }
  }
  function handleTimeChange(time: string, fieldName: string) {
    if (fieldName === 'startAt') {
      setIsStartAt(time)
      setValue('startAt', time)
    } else {
      setIsEndAt(time)
      setValue('endAt', time)
    }
  }
  useEffect(() => {
    // Atualiza os valores do formulário sempre que a tarefa, os rótulos ou os projetos mudarem
    reset({
      taskName: task.taskName,
      priority: task.priority,
      projectId: task.projectId || 'clyt0n1w8000013m3fnxk04t7',
      labelId: task.labelId || 'clyq8srh90000btmrqf8vad9g',
      dueDate: task.dueDate,
      startAt: task.startAt || '',
      endAt: task.endAt || '',
    })
    setIsStartAt(task.startAt || '')
    setIsEndAt(task.endAt || '')
  }, [task, labels, projects, reset])

  async function onEditTask(formData: TEditTaskData) {
    startTransition(() => {
      editTaskActionById(formData).then((data) => {
        customToast(data)
        setOpen(false)
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="size-8 p-1">
          <span className="sr-only">Excluir</span>
          <PenBoxIcon size={16} className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex-row-reverse gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditTask)}
              className="relative w-full max-w-lg space-y-3 overflow-hidden"
            >
              <FormField
                control={form.control}
                name="taskName"
                defaultValue={task.taskName}
                render={({ field }) => (
                  <FormItem className="relative !m-0 flex h-12 items-center overflow-hidden rounded-lg border border-border">
                    <SquareCheckIcon
                      size={24}
                      className="absolute left-2 text-primary"
                    />
                    <FormControl className="!m-0">
                      <Input
                        className="flex-1 px-9"
                        placeholder="Nome da tarefa"
                        {...field}
                      />
                    </FormControl>
                    <BadgeTask
                      dueDate={dueDate}
                      isEndAt={isEndAt}
                      isStartAt={isStartAt}
                    />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-2">
                <FormCreateSelectTask
                  name="labelId"
                  placeholder="Labels"
                  items={labels}
                  defaultValue={task.labelId}
                />
                <FormCreateSelectTask
                  name="projectId"
                  placeholder="Projetos"
                  items={projects}
                  defaultValue={task.projectId}
                />
                <FormCreateSelectTask
                  name="priority"
                  placeholder="Prioridade"
                  items={dataPriority}
                  defaultValue={task.priority}
                />
              </div>
              {time && (
                <div
                  className={`${time && isStartAt ? 'translate-x-0 opacity-100' : 'invisible absolute translate-x-full opacity-0'} flex flex-1 items-center gap-2 rounded-md p-2 shadow-shape transition-all duration-700`}
                >
                  <Badge
                    className={`flex-1 items-center justify-center p-1 text-base transition-all duration-700 ease-in-out`}
                  >
                    {isStartAt}
                  </Badge>
                  <Badge
                    className={`${isEndAt ? 'flex-1 translate-x-0' : 'invisible absolute translate-x-full'} items-center justify-center p-1 text-base transition-all duration-700 ease-in-out`}
                  >
                    {isEndAt}
                  </Badge>
                </div>
              )}
              <div
                className={`${time ? 'min-h-[410px]' : ''} relative min-h-[350px] w-full flex-1 space-y-3 transition-all duration-700`}
              >
                <FormField
                  control={form.control}
                  name="dueDate"
                  defaultValue={task.dueDate}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl className="">
                        <Calendar
                          className="p-0 capitalize"
                          classNames={{
                            table: `${time ? 'origin-left translate-x-full opacity-0 z-0 invisible ' : 'origin-right translate-x-0 opacity-100 visible'} w-full transition-all duration-700 border-collapse space-y-1 h-[286px] ease-in-out absolute`,
                          }}
                          disabled={{ before: today }}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div
                  className={`${time ? 'visible origin-left translate-x-0 opacity-100' : 'invisible absolute z-0 origin-right -translate-x-full opacity-0'} absolute flex w-full flex-1 flex-col gap-2 transition-all duration-700 ease-in-out`}
                >
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const hour = i.toString().padStart(2, '0')
                      const time = `${hour}:00`
                      return (
                        <Button
                          key={i}
                          variant={
                            isStartAt === time || isEndAt === time
                              ? 'default'
                              : 'outline'
                          }
                          type="button"
                          onClick={() => handleTimeClick(time)}
                        >
                          {time}
                        </Button>
                      )
                    })}
                  </div>
                  <div className="mb-auto grid grid-cols-2 gap-3">
                    <TimePicker
                      name="startAt"
                      onTimeChanged={handleTimeChange}
                      time={isStartAt}
                      defaultValue={isStartAt}
                    />
                    <TimePicker
                      name="endAt"
                      onTimeChanged={handleTimeChange}
                      time={isEndAt}
                      defaultValue={isEndAt}
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 items-center gap-2 md:grid-cols-1">
                <Button
                  onClick={() => setTime(!time)}
                  variant={'secondary'}
                  type="button"
                  className="h-8 w-full fade-out-0 md:h-10"
                  disabled={!task.dueDate}
                >
                  <span>{time ? 'Definir Data' : 'Definir Horário'}</span>
                </Button>
                <Button
                  type="submit"
                  className="h-8 w-full md:h-10"
                  disabled={isPending}
                >
                  Salvar Tarefa
                </Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
