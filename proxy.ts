import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await createClient(request)
}

export const config = {
  matcher: ["/:path*"],
};