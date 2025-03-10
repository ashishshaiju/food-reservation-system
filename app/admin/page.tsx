import { getReservations } from "@/action"
import { ReservationList } from "./reservation-list"
import { QrScanner } from "./qr-scanner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/../components/ui/tabs"

export default async function AdminPage() {
  const reservations = await getReservations()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <Tabs defaultValue="reservations" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
        </TabsList>

        <TabsContent value="reservations" className="mt-6">
          <ReservationList initialReservations={reservations} />
        </TabsContent>

        <TabsContent value="scanner" className="mt-6">
          <QrScanner />
        </TabsContent>
      </Tabs>
    </div>
  )
}

