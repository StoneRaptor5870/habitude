# Habitude

<div align="center">
  <img src="/public/habitude.png" alt="Habitude Logo" width="200" />
  <h3>Build Better Habits, One Day at a Time</h3>
</div>

## 📖 About

Habitude is a modern habit tracking application designed to help users build consistent routines and track their progress over time. With a clean, intuitive interface and visual tracking system, Habitude makes it easy to establish and maintain positive habits.

### Key Features

- 📝 Create and manage multiple habits with custom names and colors
- 📅 Interactive calendar interface for tracking daily progress
- 📊 Visual habit streaks to maintain motivation
- 🔄 Drag-and-drop functionality for easy habit logging
- 💪 Simple, clean UI focused on building consistent routines
- 📱 Responsive design that works on desktop and mobile devices

## 🛠️ Tech Stack

Habitude is built with modern technologies:

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Animations**: Custom React animations
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/StoneRaptor5870/habitude
   cd habitude
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/habitude"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database with Prisma:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Or run migrations if you're using migration workflow
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## 📱 Usage

### Creating a New Habit

1. Navigate to the dashboard
2. Use the "Add Habit" form on the left sidebar
3. Enter a habit name and select a color
4. Click "Add Habit"

### Tracking Your Habits

1. From the calendar view, drag a habit to a specific date
2. Alternatively, click on a date cell and select the habit you completed
3. The calendar will update to show your progress
4. Click on a filled date to toggle the habit completion status

### Viewing Your Progress

- The calendar displays all your habits with their assigned colors
- Consecutive days show your streaks
- You can navigate between months to view historical data

## 🧩 Project Structure

```
habitude/
├── app/
│   ├── api/        # API routes
│   ├── auth/       # Authentication routes
│   ├── dashboard/  # Dashboard page
│   ├── landing/    # Landing page
│   ├── signin/     # Sign in page
│   ├── signup/     # Sign up page
│   ├── lib/        # Utility functions and actions
│   └── page.tsx    # Home page
├── components/     # React components
│   ├── Calendar.tsx
│   ├── HabitForm.tsx
│   ├── HabitList.tsx
│   └── ...
├── prisma/         # Database schema
├── public/         # Static assets
└── ...
```