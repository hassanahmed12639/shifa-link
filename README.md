# SHIFA LINK

Pakistan's first real-time emergency hospital bed availability platform.

## Overview

SHIFA LINK is a UI/UX prototype designed to help people quickly find available hospital beds during emergencies. This phase focuses exclusively on the frontend experience with mock data.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI** components
- **Lucide Icons**
- **Framer Motion** (light animations)

## Features

- 🏥 Real-time bed availability status (Available/Limited/Full)
- 🔍 Search hospitals by name, area, or address
- 🎯 Filter by bed availability status
- 📍 Distance-based sorting
- 📞 One-tap calling
- 🗺️ Quick directions to hospitals
- 🚨 Always-visible emergency CTA
- 📱 Mobile-first responsive design
- ♿ Accessible UI components

## Design Principles

- **Emergency-first UX**: Critical actions are always visible
- **Large tap targets**: Minimum 44x44px for mobile
- **High contrast**: Clear visual hierarchy
- **Minimal text**: Quick scanning and decision-making
- **Status indicators**: Color-coded badges (Green/Yellow/Red)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
shifa-link/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Shadcn/UI base components
│   ├── EmergencyCTA.tsx     # Fixed emergency button
│   ├── HospitalCard.tsx     # Hospital information card
│   ├── StatusBadge.tsx      # Bed status indicator
│   ├── SearchBar.tsx        # Search input
│   └── FilterBar.tsx        # Status filter buttons
├── lib/
│   ├── mock-data.ts         # Mock hospital data
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Mock Data

The app uses mock data for 10 hospitals in Karachi, Pakistan. Each hospital includes:
- Name and address
- Bed availability (total, available, occupied)
- Status (Available/Limited/Full)
- Distance from city center
- Specialties
- Contact information

## Current Limitations

- **No backend**: All data is static/mock
- **No real-time updates**: Data doesn't refresh automatically
- **No authentication**: UI-only implementation
- **No API calls**: All interactions are simulated

## Future Enhancements

- Real-time data integration
- Backend API development
- User authentication
- Hospital admin dashboard
- Push notifications
- Geolocation-based sorting
- Multi-city support

## License

This project is a prototype for demonstration purposes.

