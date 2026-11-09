import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

const validIds = new Set(profile.links.map((link) => link.id));

/** 링크별 클릭 수 조회: { counts: { [linkId]: number } } */
export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const docs = await db.collection<ClickDoc>("clicks").find().toArray();
  const counts: Record<string, number> = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
  for (const doc of docs) {
    if (validIds.has(doc._id)) counts[doc._id] = doc.count;
  }
  return NextResponse.json({ counts });
}

/** 클릭 1회 기록: body { id: linkId } */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  await db
    .collection<ClickDoc>("clicks")
    .updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });

  return NextResponse.json({ ok: true });
}
