import dns from "node:dns";
// Force Google DNS to prevent connection issues during Google OAuth token exchange
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "https://actuallyayon-athenaeum.vercel.app",
    "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },
});
