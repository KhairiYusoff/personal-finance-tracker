import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const requireAuth =
  (handler: (request: NextRequest, userId: string) => Promise<NextResponse>) =>
  async (request: NextRequest) => {
    try {
      const { userId } = getAuth(request);

      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      return handler(request, userId);
    } catch (error) {
      console.error("Error in requireAuth middleware:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };

export default requireAuth;
