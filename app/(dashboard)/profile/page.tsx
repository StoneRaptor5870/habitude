import { authOptions } from "@/app/lib/auth"
import prisma from "@/prisma/db"
import { getServerSession } from "next-auth"
import { Profile } from "@/components/Profile"
import { redirect } from 'next/navigation';

const profileDetails = async () => {
  const session = await getServerSession(authOptions);
  const details = await prisma.user.findUnique({
    where: {
      id: session?.user.id
    },
  });
  return details;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userDetails = await profileDetails();

  if (!session) {
    redirect('/signin');
  }

  // const user = {
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   joinDate: "January 15, 2023",
  //   streak: 42,
  //   totalHabits: 8,
  //   completedHabits: 156,
  //   avatar: "/habitude.png?height=200&width=200",
  // }

  return (
    <Profile userDetails={userDetails} />
  )
}
