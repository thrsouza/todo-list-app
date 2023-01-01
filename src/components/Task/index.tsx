import { Circle, CheckCircle, Trash } from 'phosphor-react'

import styles from './styles.module.css'

interface TaskProps {
  id: string
  description: string
  isCompleted?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function Task({ id, description, isCompleted = false, onDelete, onToggle }: TaskProps) {
  function handleToggleTask() {
    onToggle(id)
  }

  function handleDeleteTask() {
    onDelete(id)
  }

  return (
    <div className={isCompleted ? styles.taskDone : styles.task}>
      <button className={styles.toggle} onClick={handleToggleTask}>
        {isCompleted ? <CheckCircle size={20} weight="fill" /> : <Circle size={20} />}
      </button>
      <p>{description}</p>
      <button className={styles.delete} onClick={handleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  )
}