import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../../../lib/index';
import { NextResponse } from "next/server";

interface Service {
  service: string;
  // tags: string[];
}

export async function DELETE(req: Request, context: any) {
  try {
    const data = await req.json()
    const { params } = context;

    const { index } = data;

    const { db } = await connectToDatabase();

    const userCollection = db.collection("users");
    const serviceCollection = db.collection("services");

    // Convert params.userId to ObjectId
    const userId = new ObjectId(params.userId);
    const user = await userCollection.findOne({ _id: userId })
    const service = user.services[index]
    user.services.splice(index, 1)

    // Update the array field using $push
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $set: { services: user.services } },
      { returnOriginal: false } // To return the updated document
    );

    const updatedService = await serviceCollection.findOneAndUpdate(
      { service: service },
      { $pull: { users: userId } },
      { returnOriginal: false } // To return the updated document
    );

    return new NextResponse(JSON.stringify(updatedService), {
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