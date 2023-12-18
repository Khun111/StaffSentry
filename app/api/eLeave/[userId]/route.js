import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const {userId} = params;
    const employeeLeaves = await prisma.leaveRequest.findMany({
        where: {
            userId,
        }
    })
    return NextResponse.json(employeeLeaves)
}