import prisma from "@/app/db";
import { NextResponse } from "next/server";
export async function GET(req) {
    const dateTime = new Date().toISOString();
    const employees = await prisma.user.findMany({
        where: {
            role: {
                equals: 'EMPLOYEE'
            },
            createdAt: {
                equals: dateTime,
              }
        }
    })
    return NextResponse.json(employees);
}
export async function POST(req) {
    const data = await req.json()
    const employee = await prisma.user.create({data})
    return NextResponse.json(employee)
}