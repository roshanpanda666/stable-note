import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export const getSessionEmail = async (req) => {
  const session = await getServerSession(authOption);
  return session?.user?.email || null;
};
