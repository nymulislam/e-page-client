import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("e-page_db");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),

    emailAndPassword: {
        enabled: true,
        customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
            ...coreFields,
            role: additionalFields?.role || "user",
            banned: false,
            banReason: null,
            banExpires: null,
            ...additionalFields,
            id,
        }),
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }
    },

    user: {
        additionalFields: {
            userType: {
                type: "string",
                required: false,
                defaultValue: "Reader",
                input: true,
            },
        },
    },

    plugins: [
        admin()
    ]
});