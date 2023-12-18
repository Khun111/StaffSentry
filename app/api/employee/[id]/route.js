import prisma from "@/app/db";
import { NextResponse } from "next/server";
export async function GET(req, {params}) {
    const id = params.id
    const employee = await prisma.user.findUnique({
        where: {
            id, 
        }
    })
    return NextResponse.json({employee})
}
export async function PATCH(req, {params}) {
    const id = params.id
    const data = await req.json()
    const employee = await prisma.user.update({
        where: {
            id,
        },
        data
    })
    return NextResponse.json({employee})
}


export async function DELETE(req, {params}) {
    const id = params.id
    const employee = await prisma.user.delete({
        where: {
            id,
        }
    })
    return NextResponse.json({employee})
}