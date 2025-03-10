import { ReservationForm } from "./reservation-form"

export default function ReservePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Make a Reservation</h1>
      <div className="max-w-2xl mx-auto">
        <ReservationForm />
      </div>
    </div>
  )
}

