import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/../components/ui//button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/../components/ui//card"
import { getReservationById } from "@/action"

interface PageProps {
  params: { id: string }
}

export default async function ConfirmationPage({ params }: PageProps) {
  const { id } = params
  const reservation = await getReservationById(id)

  if (!reservation) {
    notFound()
  }

  const qrImageUrl = `/api/qr/${reservation.uniqueCode}`
  const downloadUrl = `/api/qr/${reservation.uniqueCode}?download=true`

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Reservation Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="mb-2">
                Your reservation has been confirmed. Please present this QR code when picking up your order.
              </p>
              <div className="flex justify-center my-6">
                <div className="border p-4 bg-white inline-block">
                  <Image
                    src={qrImageUrl || "/placeholder.svg"}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Reservation ID:</strong> {reservation.id}
                </p>
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <a href={downloadUrl} download="qr-code.png" className="w-full">
              <Button className="w-full">Download QR Code</Button>
            </a>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

