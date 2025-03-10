import { type NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"
import { getReservationByUniqueCode } from "@/action"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  const code = params.code
  const searchParams = request.nextUrl.searchParams
  const download = searchParams.get("download") === "true"

  try {
    // Verify the code exists
    const reservation = await getReservationByUniqueCode(code)

    if (!reservation) {
      return new NextResponse("QR code not found", { status: 404 })
    }

    // Generate QR code
    const qrUrl = `${request.nextUrl.origin}/redeem/${code}`
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 300,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })

    // Set appropriate headers
    const headers = new Headers()
    headers.set("Content-Type", "image/png")

    if (download) {
      headers.set("Content-Disposition", `attachment; filename="qr-code-${code}.png"`)
    }

    return new NextResponse(qrBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return new NextResponse("Error generating QR code", { status: 500 })
  }
}

