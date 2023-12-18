import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    try {
        const id = Number(params.id)
    const employeeAttendances = await prisma.attendanceRecord.findUnique({
        where: {
            id, 
        }
    })
    return NextResponse.json(employeeAttendances)
    } catch (error) {
        return NextResponse.json({error})
    }
    
}
export async function PATCH(req, {params}) {
    try {
        const id = Number(params.id)
    const data = await req.json()
    const employeeAttendances = await prisma.attendanceRecord.update({
        where: {
            id,
        },
        data
    })
    return NextResponse.json(employeeAttendances)
    } catch (error) {
        return NextResponse.json({error})
    }
    
}


export async function DELETE(req, {params}) {
    try {
        const id = Number(params.id)
    const employeeAttendances = await prisma.attendanceRecord.delete({
        where: {
            id,
        }
    })
    return NextResponse.json(employeeAttendances)
    } catch (error) {
        return NextResponse.json({error})
    }
    
}