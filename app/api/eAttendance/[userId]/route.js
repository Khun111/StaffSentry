import prisma from "@/app/db";
import { NextResponse } from "next/server";
export async function GET(req, {params}) {
    const { userId } = params
    const employeeAttendances = await prisma.attendanceRecord.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(employeeAttendances);
  }