import { connectToDatabase } from '../../../../../lib';
import { NextResponse } from "next/server";

interface UserData {
  email: string;
  password: string;
}


export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { email, password } = data;

    const { db } = await connectToDatabase();
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({
      $and: [
        { email: email },
        { password: password }
      ]
    });

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