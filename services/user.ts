import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user;
  } catch (error) {
    console.error("GET_CURRENT_USER_ERROR:", error);
    return null;
  }
};
