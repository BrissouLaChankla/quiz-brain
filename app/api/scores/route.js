import { NextResponse } from "next/server";
import Score from "@/Model/Score";
import connectDB from "@/lib/connectDB"

export async function GET() {
    await connectDB();

    try {
        const scores = await Score.find().sort({ 'createdAt': "desc" });

        return NextResponse.json({ scores });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error', error: true },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    const { pseudo, score, category } = await req.json();

    await connectDB();

    try {
        const newScore = new Score({ pseudo, score, category })
        const save = await newScore.save();

        return NextResponse.json({ result: true, message: 'Score bien enregistré', save });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error', error: true },
            { status: 500 }
        );
    }
}
