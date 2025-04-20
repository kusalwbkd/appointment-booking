import { gql, GraphQLClient } from "graphql-request";
import { NextResponse } from "next/server";

export async function DELETE(req:NextResponse) {
    const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm9jlxiqt033v07waitosen26/master";

    try {
        const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Appointment ID is required" }, { status: 400 });
    }

     const mutation=gql`
     mutation MyQuery {
  deleteAppoitment(where: {id: "${id}"}) {
    id
  }
}
     `
      const graphQLClient = new GraphQLClient(MASTER_URL, {
             headers: {
               Authorization: `Bearer ${process.env.NEXT_ACCESS_TOKEN}`,
             },
           });
       
           
       
           const result = await graphQLClient.request(mutation);
       
           return NextResponse.json({ success: true, data: result });
    }
     catch (error) {
        console.error("GraphQL Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
    }
}