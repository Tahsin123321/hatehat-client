import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
const client =
  globalForMongo.__hatehatMongo ??
  new MongoClient(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017");
if (process.env.NODE_ENV !== "production") globalForMongo.__hatehatMongo = client;

const db = client.db(process.env.MONGODB_DB || "hatehat");
const baseURL = (process.env.BETTER_AUTH_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

export const auth = betterAuth({
  baseURL,
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  socialProviders:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {},
  plugins: [
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        expirationTime: "1h",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      },
    }),
  ],
});
