"use server"

import { createUTCDate, isSameDate } from "@/app/lib/utils"
import { revalidatePath } from "next/cache"
import { authOptions } from "../auth"
import prisma from "@/prisma/db"
import { getServerSession } from "next-auth"

/**
 * Fetches all habits for the current user
 */
export async function getUserHabits() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: "Unauthorized" }
  }
  
  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    
    return { habits }
  } catch (err) {
    console.error("Failed to fetch habits:", err)
    return { error: "Failed to fetch habits" }
  }
}

/**
 * Adds a new habit for the current user
 */
export async function addHabit(formData: FormData | { name: string; color: string; description?: string }) {
    const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: "Unauthorized" }
  }
  
  // Extract data from FormData or object
  const name = formData instanceof FormData 
    ? formData.get("name") as string 
    : formData.name
  const color = formData instanceof FormData 
    ? formData.get("color") as string 
    : formData.color
  const description = formData instanceof FormData 
    ? formData.get("description") as string 
    : formData.description || ""
  
  if (!name) {
    return { error: "Name is required" }
  }
  
  try {
    const habit = await prisma.habit.create({
      data: {
        name,
        color,
        description,
        userId: session.user.id,
      },
    })
    
    revalidatePath("/dashboard")
    return { habit }
  } catch (err) {
    console.error("Failed to create habit:", err)
    return { error: "Failed to create habit" }
  }
}

/**
 * Deletes a habit and all associated logs
 */
export async function deleteHabit(habitId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: "Unauthorized" }
  }
  
  try {
    // First, delete all associated habit logs
    await prisma.habitLog.deleteMany({
      where: {
        habitId,
        userId: session.user.id,
      },
    })
    
    // Then delete the habit itself
    const habit = await prisma.habit.delete({
      where: {
        id: habitId,
        userId: session.user.id,
      },
    })
    
    revalidatePath("/dashboard")
    return { success: true, habit }
  } catch (err) {
    console.error("Failed to delete habit:", err)
    return { error: "Failed to delete habit" }
  }
}

/**
 * Logs a habit completion event
 */
export async function logHabit(habitId: string, date: string, notes?: string) {
    const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: "Unauthorized" }
  }
  
  try {
    const habitDate = createUTCDate(date)
    
    // Get all logs for this habit
    const habitLogs = await prisma.habitLog.findMany({
      where: {
        habitId,
        userId: session.user.id,
      },
    })
    
    // Find matching log by comparing dates
    const existingLog = habitLogs.find(log => 
      isSameDate(log.date, habitDate)
    )
    
    let habitLog
    
    if (existingLog) {
      // If a log exists, delete it (toggle behavior)
      habitLog = await prisma.habitLog.delete({
        where: {
          id: existingLog.id,
        },
      })
    } else {
      // If no log exists, create a new one
      habitLog = await prisma.habitLog.create({
        data: {
          habitId,
          date: habitDate,
          notes: notes || null,
          userId: session.user.id,
        },
      })
    }
    
    revalidatePath("/dashboard")
    return { habitLog }
  } catch (err) {
    console.error("Failed to log habit:", err)
    return { error: "Failed to log habit" }
  }
}

/**
 * Gets all habit logs for the current user
 */
export async function getHabitLogs() {
    const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: "Unauthorized" }
  }
  
  try {
    const habitLogs = await prisma.habitLog.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        habit: true,
      },
    })
    
    return { habitLogs }
  } catch (err) {
    console.error("Failed to fetch habit logs:", err)
    return { error: "Failed to fetch habit logs" }
  }
}