import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image";

interface UserDetails {
  id: string;
  name?: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
  streak?: number;
  totalHabits?: number;
  completedHabits?: number;
}

export const Profile = async ({ userDetails }: { userDetails: UserDetails | null }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>No such User</div>
    )
  }

  if (!userDetails) {
    return (
      <div>No User Details</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-shrink-0">
            <Image
              src={userDetails?.avatar || "/habitude.png"}
              alt={userDetails.name || "User"}
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-2">{userDetails.name || "User"}</h2>
            <p className="text-gray-600 mb-6">{userDetails.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#f69fa9] p-4 rounded-lg text-center">
                <p className="text-white text-3xl font-bold">{userDetails?.streak || 0}</p>
                <p className="text-white">Day Streak</p>
              </div>
              <div className="bg-[#f69fa9] p-4 rounded-lg text-center">
                <p className="text-white text-3xl font-bold">{userDetails?.totalHabits || 0}</p>
                <p className="text-white">Active Habits</p>
              </div>
              <div className="bg-[#f69fa9] p-4 rounded-lg text-center">
                <p className="text-white text-3xl font-bold">{userDetails?.completedHabits || 0}</p>
                <p className="text-white">Completed</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Account Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Member since</span>
                    <span>{new Date(userDetails.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </p>
                  <p className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subscription</span>
                    <span className="text-[#f69fa9] font-medium">Premium</span>
                  </p>
                  <p className="flex justify-between py-2">
                    <span className="text-gray-600">Next billing date</span>
                    <span>June 15, 2025</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-[#f69fa9] text-white rounded-lg hover:bg-[#fc7e8d] transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}