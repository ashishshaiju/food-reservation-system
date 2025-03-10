import Link from "next/link"
import { Button } from "@/../components/ui//button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/../components/ui//card"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Food Reservation System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Make a Reservation</CardTitle>
            <CardDescription>Reserve your food and get a QR code for pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create a new food reservation and receive a QR code that you can present when picking up your order.</p>
          </CardContent>
          <CardFooter>
            <Link href="/reserve" className="w-full">
              <Button className="w-full">Make Reservation</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Manage reservations and scan QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View all reservations, scan QR codes, and mark orders as completed.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin" className="w-full">
              <Button variant="outline" className="w-full">
                Admin Panel
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

