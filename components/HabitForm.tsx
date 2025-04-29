"use client"

import { useState } from "react"
import type { Habit } from "@/app/(dashboard)/dashboard/page"
import { addHabit } from "@/app/lib/actions/habits"

interface HabitFormProps {
  onAddHabit: (habit: Habit) => void
}

export default function HabitForm({ onAddHabit }: HabitFormProps) {
  const [habitName, setHabitName] = useState("")
  const [habitColor, setHabitColor] = useState("#f69fa9") // Default to #f69fa9
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (habitName.trim() && !isSubmitting) {
      setIsSubmitting(true)
      
      try {
        const result = await addHabit({
          name: habitName,
          color: habitColor,
        })
        
        if (result.error) {
          console.error("Error adding habit:", result.error)
        } else if (result.habit) {
          onAddHabit(result.habit as Habit)
          setHabitName("")
        }
      } catch (error) {
        console.error("Failed to add habit:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Add New Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="habitName" className="block text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>
          <input
            type="text"
            id="habitName"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f69fa9]"
            placeholder="e.g., Drink water"
            required
          />
        </div>

        <div>
          <label htmlFor="habitColor" className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="color"
            id="habitColor"
            value={habitColor}
            onChange={(e) => setHabitColor(e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-[#f69fa9] text-white py-2 px-4 rounded-md hover:bg-[#fc7e8d] transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Habit"}
        </button>
      </form>
    </div>
  )
}