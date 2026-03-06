import { NextResponse } from "next/server";
import axios from "axios";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Invalid data provided",
  403: "Admin registration is not allowed",
  409: "An account with this email already exists",
  422: "Invalid data provided",
  429: "Too many attempts. Please try again later",
  500: "Server error. Please try again later",
};

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      body,
    );

    return NextResponse.json(data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 500;
      const message =
        STATUS_MESSAGES[status] ??
        "Something went wrong. Please try again later";

      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 },
    );
  }
}
