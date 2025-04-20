import { gql, GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm9jlxiqt033v07waitosen26/master";




  export async function POST(req: NextRequest) {
    try {
      const { doctorId, userName, email, date, time } = await req.json();
  

      const mutation = gql`
        mutation CreateAppointment(
          $doctorId: ID!
          $userName: String!
          $email: String!
          $date: String!
          $time: String!
        ) {
          createAppoitment(
            data: {
              doctor: { connect: { id: $doctorId } }
              date: $date
              email: $email
              time: $time
              userName: $userName
            }
          ) {
            id
          }
          publishManyAppoitmentsConnection {
            aggregate {
              count
            }
          }
        }
      `;
  
      const graphQLClient = new GraphQLClient(MASTER_URL, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_ACCESS_TOKEN}`,
        },
      });
  
      const variables = {
        doctorId,
        userName,
        email,
        date,
        time,
      };
  
      const result = await graphQLClient.request(mutation, variables);
  
      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      console.error("GraphQL Error:", error);
      return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
    }
  }