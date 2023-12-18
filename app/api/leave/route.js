import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const dateTime = new Date().toISOString();
  const leaves = await prisma.leaveRequest.findMany(
    {
      where: {
        createdAt: {
          equals: dateTime,
        }
      }
    }
  )
  return NextResponse.json(leaves);
}
export async function POST(req) {
  try {
    const data = await req.json();
    const employeeLeave = await prisma.leaveRequest.create({ data });
    return NextResponse.json({ employeeLeave });
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}
