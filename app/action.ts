"use server"

import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"
import { db } from "@/../lib/db"
import type { Reservation } from "@/../lib/types"

// Create a new reservation
export async function createReservation(formData: {
  name: string
  email: string
  phone: string
  foodItems: string
  pickupTime: string
}): Promise<string> {
  const id = nanoid(10)
  const uniqueCode = nanoid(16)

  const reservation: Reservation = {
    id,
    uniqueCode,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    foodItems: formData.foodItems,
    pickupTime: formData.pickupTime,
    createdAt: new Date().toISOString(),
    redeemed: false,
  }

  const createdReservation = await db.reservations.create(reservation)
  revalidatePath("/admin")

  return createdReservation.id
}

// Get all reservations
export async function getReservations(): Promise<Reservation[]> {
  return db.reservations.findAll()
}

// Get a reservation by ID
export async function getReservationById(id: string): Promise<Reservation | null> {
  return db.reservations.findById(id)
}

// Get a reservation by unique code
export async function getReservationByUniqueCode(code: string): Promise<Reservation | null> {
  return db.reservations.findByUniqueCode(code)
}

// Verify and redeem a QR code
export async function verifyAndRedeemQr(uniqueCode: string): Promise<{ success: boolean; message: string }> {
  const reservation = await db.reservations.findByUniqueCode(uniqueCode)

  if (!reservation) {
    return {
      success: false,
      message: "Invalid QR code. Reservation not found.",
    }
  }

  if (reservation.redeemed) {
    return {
      success: false,
      message: "This QR code has already been redeemed.",
    }
  }

  // Mark as redeemed
  await db.reservations.update(reservation.id, { redeemed: true })
  revalidatePath("/admin")

  return {
    success: true,
    message: `Reservation for ${reservation.name} has been successfully redeemed.`,
  }
}

// Mark a reservation as completed
export async function completeReservation(id: string): Promise<void> {
  const reservation = await db.reservations.findById(id)

  if (!reservation) {
    throw new Error("Reservation not found")
  }

  await db.reservations.update(id, { redeemed: true })
  revalidatePath("/admin")
}

