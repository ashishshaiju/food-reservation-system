"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/../components/ui//card"
import { Alert, AlertDescription, AlertTitle } from "@/../components/ui//alert"
import { CheckCircle, XCircle, Camera } from "lucide-react"
import { verifyAndRedeemQr } from "@/action"

export function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)

  const startScanner = async () => {
    setResult(null)
    setScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      setCameraPermission(true)
      scanQRCode()
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraPermission(false)
      setScanning(false)
    }
  }

  const stopScanner = () => {
    setScanning(false)

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const scanQRCode = () => {
    if (!scanning) return

    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Only process frames if video is playing
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Here we would normally use a QR code scanning library
      // For this example, we'll simulate finding a QR code after a few seconds

      // In a real implementation, you would use a library like jsQR:
      // const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      // const code = jsQR(imageData.data, imageData.width, imageData.height)
      // if (code) { handleQrCode(code.data) }
    }

    // For demo purposes, simulate finding a QR code after 3 seconds
    const simulateQrDetection = () => {
      // In a real app, this would be replaced with actual QR detection
      const urlParams = new URLSearchParams(window.location.search)
      const simulateCode = urlParams.get("simulateCode")

      if (simulateCode && scanning) {
        handleQrCode(`https://example.com/qr/${simulateCode}`)
        return
      }

      if (scanning) {
        requestAnimationFrame(scanQRCode)
      }
    }

    requestAnimationFrame(simulateQrDetection)
  }

  const handleQrCode = async (qrData: string) => {
    try {
      // Extract the unique code from the URL
      const urlPattern = /\/qr\/([a-zA-Z0-9_-]+)/
      const match = qrData.match(urlPattern)

      if (!match) {
        setResult({ success: false, message: "Invalid QR code format" })
        stopScanner()
        return
      }

      const uniqueCode = match[1]
      const response = await verifyAndRedeemQr(uniqueCode)

      setResult({
        success: response.success,
        message: response.message,
      })

      stopScanner()
    } catch (error) {
      console.error("Error processing QR code:", error)
      setResult({
        success: false,
        message: "Error processing QR code",
      })
      stopScanner()
    }
  }

  useEffect(() => {
    return () => {
      // Clean up on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Scanner</CardTitle>
        <CardDescription>Scan a reservation QR code to verify and redeem it</CardDescription>
      </CardHeader>
      <CardContent>
        {cameraPermission === false && (
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Camera access denied</AlertTitle>
            <AlertDescription>Please allow camera access to scan QR codes.</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
            {result.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {scanning ? (
            <>
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary rounded-lg"></div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="h-12 w-12 mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Camera preview will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={scanning ? stopScanner : startScanner}
          className="w-full"
          variant={scanning ? "destructive" : "default"}
        >
          {scanning ? "Stop Scanner" : "Start Scanner"}
        </Button>
      </CardFooter>
    </Card>
  )
}

