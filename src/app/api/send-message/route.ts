import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export const revalidate = false;

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, message } = data;
  let done = false;
  let error = false;
  base("Enquiries").create(
    [
      {
        fields: {
          Name: name as string,
          Email: email as string,
          Message: message as string,
        },
      },
    ],
    function (err, records) {
      if (records) {
        done = true;
        return;
      } else if (err) {
        console.error(err);
        error = true;
        done = true;
      }
    }
  );

  while (!done) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  } else {
    return NextResponse.json({
      message: `You have sent a message to John Schlesinger with the email address ${email} and the message ${message}`,
    });
  }
}
