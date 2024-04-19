import { connectToDatabase } from '../../../../../lib';
import { NextResponse } from "next/server";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture?: string; // Adding a non-required picture parameter
}

export async function POST(req: Request) {
  try {
    const data = await req.json()


    const { firstname, lastname, email, password, picture } = data as UserData;

    const { db } = await connectToDatabase();

    const userCollection = db.collection("users");
    const userData: UserData = { firstname, lastname, email, password };
    if (picture) {
      userData.picture = picture; // Assigning picture if provided
    }
    const user = await userCollection.insertOne(userData);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: "Failed to process the request", message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Handle other types of errors if needed
      return new NextResponse(JSON.stringify({ error: "Failed to process the request" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}