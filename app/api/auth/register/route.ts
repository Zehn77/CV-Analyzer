import { NextResponse } from "next/server";
import axios from "axios";
import { getRegisterErrorMessage } from "@/lib/api-error";

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
      return NextResponse.json(
        { error: getRegisterErrorMessage(status) },
        { status },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 },
    );
  }
}
