import type { ObjectId } from "mongodb"

export interface Reservation {
  _id?: ObjectId
  id: string
  uniqueCode: string
  name: string
  email: string
  phone: string
  foodItems: string
  pickupTime: string
  createdAt: string
  redeemed: boolean
}

