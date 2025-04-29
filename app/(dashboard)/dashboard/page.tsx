"use client"

import { useState, useEffect } from "react"
import Calendar from "@/components/Calender"
import { Loader2 } from "lucide-react"
import HabitForm from "@/components/HabitForm"
import HabitList from "@/components/HabitList"
import { getUserHabits, getHabitLogs, logHabit } from "@/app/lib/actions/habits"
import { formatToLocalDate } from "@/app/lib/utils"
import { AnimationProvider } from "@/components/HeartContextProvider"

export interface Habit {
  id: string
  name: string
  color: string
}

export interface HabitLog {
  id: string
  date: Date
  habitId: string
  habit?: Habit
}

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch habits and logs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch habits
      const habitsResult = await getUserHabits()
      if (!habitsResult.error && habitsResult.habits) {
        setHabits(habitsResult.habits)
      }
      
      // Fetch habit logs
      const logsResult = await getHabitLogs()
      if (!logsResult.error && logsResult.habitLogs) {
        setHabitLogs(logsResult.habitLogs)
      }
      
      setLoading(false)
    }
    
    fetchData()
  }, [])

  // Add a new habit locally and to the server
  const handleAddHabit = async (habit: Habit) => {
    // Update local state immediately for a responsive UI
    setHabits([...habits, habit])
    
    // Send to server
    await logHabit(habit.id, new Date().toISOString().split('T')[0])
  }

  // Delete a habit locally
  const handleDeleteHabit = (habitId: string) => {
    // Update habits state
    setHabits(habits.filter(habit => habit.id !== habitId))
    
    // Also remove any habit logs for this habit
    setHabitLogs(habitLogs.filter(log => log.habitId !== habitId))
  }

  // Handle habit drop on calendar
  const handleDrop = async (habitId: string, date: string) => {
    // Find the habit
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return
    
    // Check if a log already exists for this date and habit
    const existingLogIndex = habitLogs.findIndex(
      log => log.habitId === habitId && new Date(log.date).toISOString().split('T')[0] === date
    )
    
    let updatedLogs
    
    if (existingLogIndex >= 0) {
      // If log exists, remove it (toggle behavior)
      updatedLogs = [
        ...habitLogs.slice(0, existingLogIndex),
        ...habitLogs.slice(existingLogIndex + 1)
      ]
    } else {
      // If no log exists, add it
      const newLog: HabitLog = {
        id: `temp-${Date.now()}`,
        date: new Date(date),
        habitId,
        habit
      }
      updatedLogs = [...habitLogs, newLog]
    }
    
    // Update local state immediately
    setHabitLogs(updatedLogs)
    
    // Send to server
    await logHabit(habitId, date)
  }

  const calendarEvents = habitLogs.map(log => ({
    date: formatToLocalDate(log.date),
    habitId: log.habitId
  }))

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-[#f69fa9] animate-spin" />
      </div>
    )
  }

  return (
    <AnimationProvider>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 space-y-6">
          <HabitForm onAddHabit={handleAddHabit} />
          <HabitList 
            habits={habits} 
            onDeleteHabit={handleDeleteHabit} 
          />
        </div>

        <div className="w-full md:w-3/4">
          <Calendar habits={habits} events={calendarEvents} onDrop={handleDrop} />
        </div>
      </div>
    </AnimationProvider>
  )
}