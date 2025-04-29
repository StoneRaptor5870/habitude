"use client"

import { useState, useEffect } from "react"
import type { Habit } from "@/app/(dashboard)/dashboard/page"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { formatToLocalDate } from "@/app/lib/utils"
import { useAnimation } from "@/components/HeartContextProvider"

interface CalendarProps {
  habits: Habit[]
  events: { date: string; habitId: string }[]
  onDrop: (habitId: string, date: string) => void
}

export default function Calendar({ habits, events, onDrop }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const { createHeartAnimation } = useAnimation()

  useEffect(() => {
    const days = generateCalendarDays(currentDate)
    setCalendarDays(days)
  }, [currentDate])

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek

    // Calculate total days to show (previous month days + current month days)
    const totalDays = daysFromPrevMonth + lastDay.getDate()

    // Calculate rows needed (7 days per row)
    const rows = Math.ceil(totalDays / 7)

    // Calculate total cells in the calendar
    const totalCells = rows * 7

    // Generate array of dates
    const days: Date[] = []

    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0)
    const prevMonthLastDay = prevMonth.getDate()

    for (let i = 0; i < daysFromPrevMonth; i++) {
      days.push(new Date(year, month - 1, prevMonthLastDay - daysFromPrevMonth + i + 1))
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    // Add days from next month
    const remainingCells = totalCells - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return formatToLocalDate(date)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, date: Date) => {
    e.preventDefault()
    const habitId = e.dataTransfer.getData("habitId")
    if (habitId) {
      // Get the habit to get its color
      const habit = habits.find(h => h.id === habitId)
      if (habit) {
        // Create animation at the drop position using the global animation provider
        createHeartAnimation(e.clientX, e.clientY, habit.color)
      }

      onDrop(habitId, formatDate(date))
    }
  }

  // Function to handle heart clicks (also triggers animation)
  const handleHeartClick = (habitId: string, date: Date, e: React.MouseEvent<SVGElement, MouseEvent>) => {
    // Get the habit to get its color
    const habit = habits.find(h => h.id === habitId)
    if (habit) {
      // Create animation at the click position using the global animation provider
      createHeartAnimation(e.clientX, e.clientY, habit.color)
    }

    onDrop(habitId, formatDate(date))
  }

  const getHabitsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return events
      .filter((event) => event.date === dateStr)
      .map((event) => habits.find((habit) => habit.id === event.habitId))
      .filter(Boolean) as Habit[]
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-white p-4 rounded-lg shadow relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex space-x-2">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-medium py-2 text-gray-600">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dayHabits = getHabitsForDate(day)

          return (
            <div
              key={index}
              className={`min-h-24 border rounded-md p-1 ${isCurrentMonth(day) ? "bg-white" : "bg-gray-50 text-gray-400"
                } ${isToday(day) ? "border-[#f69fa9]" : "border-gray-200"}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className="text-right p-1">{day.getDate()}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {dayHabits.map((habit, habitIndex) => (
                  <Heart
                    key={`${habit.id}-${habitIndex}`}
                    size={20}
                    color={habit.color}
                    fill={habit.color}
                    className="cursor-pointer"
                    onClick={(e) => handleHeartClick(habit.id, day, e)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}