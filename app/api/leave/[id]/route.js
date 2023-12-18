import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const id = Number(params.id)
    const employeeLeave = await prisma.leaveRequest.findUnique({
        where: {
            id, 
        }
    })
    return NextResponse.json({employeeLeave})
}
export async function PATCH(req, {params}) {
    const id = Number(params.id)
    const data = await req.json()
    const employeeLeave = await prisma.leaveRequest.update({
        where: {
            id,
        },
        data
    })
    return NextResponse.json({employeeLeave})
}


export async function DELETE(req, {params}) {
    const id = Number(params.id)
    const employeeLeave = await prisma.leaveRequest.delete({
        where: {
            id,
        }
    })
    return NextResponse.json({employeeLeave})
}