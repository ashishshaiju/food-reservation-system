import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/../components/ui//card"
import { Button } from "@/../components/ui//button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Successfully Redeemed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <p>Your food reservation has been successfully redeemed.</p>
            <p className="mt-2">Thank you for using our service!</p>
          </CardContent>
          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

