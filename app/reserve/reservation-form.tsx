"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/../components/ui//button"
import { Card } from "@/../components/ui//card"
import { Input } from "@/../components/ui//input"
import { Label } from "@/../components/ui//label"
import { Textarea } from "@/../components/ui//textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/../components/ui//select"
import { createReservation } from "@/action"

export function ReservationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    foodItems: "",
    pickupTime: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const reservationId = await createReservation(formData)
      router.push(`/reserve/confirmation/${reservationId}`)
    } catch (error) {
      console.error("Error creating reservation:", error)
      setIsSubmitting(false)
    }
  }

  // Generate time slots for the next 24 hours
  const generateTimeSlots = () => {
    const slots = []
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Round to the next 30 minute interval
    const startMinute = currentMinute < 30 ? 30 : 0
    let startHour = currentMinute < 30 ? currentHour : currentHour + 1

    if (startHour >= 24) {
      startHour = 0
    }

    for (let i = 0; i < 48; i++) {
      // 48 slots = 24 hours
      const hour = (startHour + Math.floor((startMinute + i * 30) / 60)) % 24
      const minute = (startMinute + i * 30) % 60

      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      const timeString = `${formattedHour}:${formattedMinute}`

      slots.push(timeString)
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foodItems">Food Items</Label>
          <Textarea
            id="foodItems"
            name="foodItems"
            value={formData.foodItems}
            onChange={handleChange}
            placeholder="Enter the food items you want to reserve"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickupTime">Pickup Time</Label>
          <Select onValueChange={(value) => handleSelectChange("pickupTime", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select pickup time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Reservation..." : "Create Reservation"}
        </Button>
      </form>
    </Card>
  )
}

