import Image from "next/image"
import Link from "next/link"
import FeatureCarousel from "@/components/FeatureCarousel"

export default function LandingPage() {
  const features = [
    {
      id: 1,
      title: "Habit Tracking",
      description: "Track your daily habits with our intuitive interface and stay consistent with your goals.",
      image: "/simple-and-fast.png",
    },
    {
      id: 2,
      title: "Progress Analytics",
      description: "Visualize your progress with detailed analytics and charts to keep you motivated.",
      image: "/bigger-picture.png",
    },
    {
      id: 3,
      title: "Reminders & Notifications",
      description: "Never miss a habit with customizable reminders and notifications.",
      image: "/stay.png",
    },
    {
      id: 4,
      title: "Community Support",
      description: "Join a community of like-minded individuals to share your journey and stay accountable.",
      image: "/take-note.png",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/habitude.png"
                alt="Habit Tracking App"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Habits, Transform Your Life</h1>
              <p className="text-lg text-gray-600 mb-6">
                Our habit tracking platform helps you build positive routines, break bad habits, and achieve your goals
                with consistency and focus.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in the power of small, consistent actions to create meaningful change in your life. Our
                mission is to provide you with the tools you need to succeed.
              </p>
              <Link
                href="/signup"
                className="bg-pink-[#f69fa9] hover:bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 inline-block mr-4"
              >
                Start Tracking Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the tools that will help you build better habits and achieve your goals.
            </p>
          </div>

          <FeatureCarousel features={features} />
        </div>
      </section>
    </main>
  )
}