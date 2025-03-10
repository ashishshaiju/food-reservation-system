import type { Reservation } from "./types"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export const db = {
  reservations: {
    create: async (reservation: Reservation): Promise<Reservation> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      const result = await collection.insertOne(reservation)
      return { ...reservation }
    },

    findAll: async (): Promise<Reservation[]> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      return collection.find().sort({ createdAt: -1 }).toArray() as Promise<Reservation[]>
    },

    findById: async (id: string): Promise<Reservation | null> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      return collection.findOne({ id: id }) as Promise<Reservation | null>
    },

    findByUniqueCode: async (code: string): Promise<Reservation | null> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      return collection.findOne({ uniqueCode: code }) as Promise<Reservation | null>
    },

    update: async (id: string, data: Partial<Reservation>): Promise<Reservation | null> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      const result = await collection.findOneAndUpdate(
        { id: id },
        { $set: data },
        { returnDocument: "after" }
      )
      return result?.value as Reservation | null
    },

    delete: async (id: string): Promise<boolean> => {
      const client = await clientPromise
      const collection = client.db().collection("reservations")
      const result = await collection.deleteOne({ id: id })
      return result.deletedCount === 1
    },
  },
}

