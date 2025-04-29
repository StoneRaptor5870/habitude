"use client"

import { useState } from "react"
import type { Habit } from "@/app/(dashboard)/dashboard/page"
import { Heart, Trash2 } from "lucide-react"
import { useAnimation } from "@/components/HeartContextProvider"
import { deleteHabit } from "@/app/lib/actions/habits"

interface HabitListProps {
  habits: Habit[]
  onDeleteHabit: (habitId: string) => void
}

export default function HabitList({ habits, onDeleteHabit }: HabitListProps) {
  const { createHeartAnimation } = useAnimation()
  const [deletingHabits, setDeletingHabits] = useState<Set<string>>(new Set())

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, habit: Habit) => {
    e.dataTransfer.setData("habitId", habit.id)
    createHeartAnimation(e.clientX, e.clientY, habit.color)
  }

  const handleDelete = async (habitId: string) => {
    setDeletingHabits(prev => new Set(prev).add(habitId))
    
    try {
      const result = await deleteHabit(habitId)
      
      if (result.success) {
        onDeleteHabit(habitId)
      } else {
        console.error("Error deleting habit:", result.error)
        alert("Failed to delete habit. Please try again.")
      }
    } catch (error) {
      console.error("Failed to delete habit:", error)
      alert("An error occurred while deleting the habit.")
    } finally {
      setDeletingHabits(prev => {
        const newSet = new Set(prev)
        newSet.delete(habitId)
        return newSet
      })
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Your Habits</h2>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No habits added yet</p>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => {
            const isDeleting = deletingHabits.has(habit.id)
            
            return (
              <li
                key={habit.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
              >
                <div 
                  className="flex items-center flex-grow cursor-grab"
                  draggable
                  onDragStart={(e) => handleDragStart(e, habit)}
                >
                  <Heart className="mr-3 flex-shrink-0" size={24} color={habit.color} fill={habit.color}/>
                  <span className="truncate">{habit.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(habit.id)}
                  disabled={isDeleting}
                  className={`ml-2 p-1.5 text-gray-500 hover:text-[#fc7e8d] hover:bg-red-50 rounded-full transition-colors ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={`Delete ${habit.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}