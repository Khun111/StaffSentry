import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const dateTime = new Date().toISOString();
  try {
    const employeeAttendances = await prisma.attendanceRecord.findMany(
      {
        where: {
          createdAt: {
            equals: dateTime,
          }
        }
      }
      )
      return NextResponse.json(employeeAttendances);
  } catch (error) {
    return NextResponse.json({message: error.message})
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const employeeAttendances = await prisma.attendanceRecord.create({data});
    return NextResponse.json(employeeAttendances);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

