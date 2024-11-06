# Car Dealer App

A Next.js application that allows users to browse vehicles by make and year.

## Features

- Filter vehicles by make and model year
- View detailed vehicle model information
- Responsive design using Tailwind CSS
- Server-side rendering and static site generation
- Type safety with TypeScript

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- NHTSA Vehicle API

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd car-dealer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app directory containing pages and layouts
- `/components` - Reusable UI components
- `/types` - TypeScript type definitions
- `/api` - API utility functions

## API Integration

The application uses the NHTSA Vehicle API to fetch:
- Vehicle makes
- Vehicle models by make ID and year

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Run production build: `npm start`
- Run linter: `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request