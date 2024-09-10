import { Client, Databases, Account } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const collections = [
    {
        name: "notes",
        id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_NOTES_ID,
        dbid: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    }
];

export { client, databases, collections };
