"use client"

import { useState, useEffect } from "react"
import { Button } from "@/../components/ui//button"
import { Card, CardContent, CardHeader, CardTitle } from "@/../components/ui//card"
import { Badge } from "@/../components/ui//badge"
import type { Reservation } from "@/../lib/types"
import { completeReservation, getReservations } from "@/action"

interface ReservationListProps {
  initialReservations: Reservation[]
}

export function ReservationList({ initialReservations }: ReservationListProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchReservations = async () => {
      const updatedReservations = await getReservations()
      setReservations(updatedReservations)
    }

    fetchReservations()
  }, [refreshKey])

  const handleComplete = async (id: string) => {
    await completeReservation(id)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Reservations</h2>
        <Button variant="outline" size="sm" onClick={() => setRefreshKey((prev) => prev + 1)}>
          Refresh
        </Button>
      </div>

      {reservations.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">No reservations found.</CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{reservation.name}</CardTitle>
                  <Badge variant={reservation.redeemed ? "secondary" : "default"}>
                    {reservation.redeemed ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reservation ID</p>
                    <p className="font-medium">{reservation.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Time</p>
                    <p className="font-medium">{reservation.pickupTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{reservation.email}</p>
                    <p className="font-medium">{reservation.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Food Items</p>
                    <p className="font-medium">{reservation.foodItems}</p>
                  </div>
                </div>

                {!reservation.redeemed && (
                  <Button className="mt-4 w-full" onClick={() => handleComplete(reservation.id)}>
                    Mark as Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

