"use client"

import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/../components/ui//card"
import { Button } from "@/../components/ui//button"
import { getReservationByUniqueCode, verifyAndRedeemQr } from "../../action"

export default async function RedeemPage({ params }: { params: { code: string } }) {
  const reservation = await getReservationByUniqueCode(params.code)

  if (!reservation) {
    notFound()
  }

  // If already redeemed, show a message
  if (reservation.redeemed) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Already Redeemed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">This QR code has already been redeemed.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => redirect("/")} className="w-full">
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {reservation.name}
              </p>
              <p>
                <strong>Food Items:</strong> {reservation.foodItems}
              </p>
              <p>
                <strong>Pickup Time:</strong> {reservation.pickupTime}
              </p>
            </div>
            <form
              action={async () => {
                "use server"
                await verifyAndRedeemQr(params.code)
                redirect("/redeem/success")
              }}
            >
              <Button type="submit" className="w-full">
                Redeem Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

