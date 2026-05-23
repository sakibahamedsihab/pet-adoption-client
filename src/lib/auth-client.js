// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Vercel-এর কথা মাথায় রেখে আমরা এখানে একটি ডায়নামিক URL দিচ্ছি
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
