import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

import { Header } from "./components/Header"
import { Task } from "./components/Task"

import styles from './App.module.css'

interface TaskItem {
  id: string
  description: string
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [newTaskDescription, setNewTaskDescription] = useState<string>('')

  const tasksCount = tasks.length

  const tasksCompletedCount = tasks.reduce((acc, task) => {
    return acc + (task.isCompleted ? 1 : 0)
  }, 0)


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    setTasks([...tasks, {
      id: uuidv4(),
      description: newTaskDescription,
      isCompleted: false,
    }])

    setNewTaskDescription('')
  }

  function handleNewTaskDescriptionChanged(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value)
    event.target.setCustomValidity('')
  }

  function handleNewTaskDescriptionInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function toggleTask(id: string) {
    setTasks(tasks.map(task => {
      if (task.id == id) {
        task.isCompleted = !task.isCompleted
      }
      return task;
    }))
  }
  
  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            value={newTaskDescription} 
            onChange={handleNewTaskDescriptionChanged}
            placeholder="Adicione uma nova tarefa" 
            onInvalid={handleNewTaskDescriptionInvalid}
            required
          />
          <button type="submit">
            Criar <PlusCircle size={18} />
          </button>
        </form>
        <section className={styles.content}>
          <div className={styles.info}>
            <div>
              <strong className={styles.created}>Tarefas criadas</strong>
              <span>{tasksCount}</span>
            </div>
            <div>
              <strong className={styles.done}>Concluídas</strong>
              <span>{tasksCount > 0 ? `${tasksCompletedCount} de ` : '' } {tasksCount}</span>
            </div>
          </div>

          {tasksCount > 0 
            ? 
            <div className={styles.tasks}>
              {tasks.map(task => (
                <Task 
                  key={task.id} 
                  id={task.id} 
                  description={task.description} 
                  isCompleted={task.isCompleted}
                  onDelete={deleteTask} 
                  onToggle={toggleTask}
                />
              ))}
            </div>
           :
            <div className={styles.empty}>
              <ClipboardText size={56} weight="thin" />
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie e organize seus itens a fazer</span>
              </div>
            </div>
          }
        </section>
      </div>
    </>
  )
}
