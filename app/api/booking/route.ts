import { gql, GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm9jlxiqt033v07waitosen26/master";

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if(!email){
        return NextResponse.json({ error: "Missing 'email' query parameter" }, { status: 400 });

  }

  const query=gql`
  query MyQuery {
  appoitments(where: {email: "${email}"}) {
    date
    time
    id
    doctor {
      name
      about
      address
      category {
        name
        icon {
          url
        }
      }
      startTime
      endTime
      patients
      yearsOfExperaince
      id
      image {
        url
      }
    }
    
  }
}
  `
   const graphQLClient = new GraphQLClient(MASTER_URL, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_ACCESS_TOKEN}`,
        },
      });

      const result = await graphQLClient.request(query);
  
      return NextResponse.json({result});
}