# Food Reservation System

A modern web application for managing food reservations with QR code-based verification. Built with Next.js, TypeScript, and MongoDB.

## Features

- 🍽️ Create food reservations with user details
- 🎫 Generate unique QR codes for each reservation
- 📱 Mobile-friendly responsive design
- 🔍 Admin panel for managing reservations
- ✅ QR code scanning and verification
- 🔒 Secure reservation redemption process
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Database**: MongoDB
- **Authentication**: (Optional) NextAuth.js
- **QR Code**: QRCode library
- **Deployment**: Vercel (recommended)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or later
- npm or yarn
- MongoDB database (local or Atlas)

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/food-reservation-system.git
cd food-reservation-system
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Database Setup**
- Create a MongoDB database
- Add your MongoDB connection string to `.env.local`
- The application will automatically create the required collections

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
food-reservation-system/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   └── reserve/           # Reservation pages
├── components/            # React components
│   └── ui/               # UI components
├── lib/                   # Utility functions
│   ├── db.ts             # Database operations
│   └── types.ts          # TypeScript types
└── public/               # Static files
```

## API Routes

- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations` - Get all reservations
- `GET /api/qr/:code` - Get QR code image
- `POST /api/redeem/:code` - Redeem a reservation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)

## Support

For support, email your-email@example.com or open an issue in this repository.

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ffood-reservation-system) 