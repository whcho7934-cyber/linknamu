import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

const validIds = new Set(profile.links.map((link) => link.id));

const noDbResponse = () => NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
const dbErrorResponse = (error: unknown) => {
  console.error("[clicks] MongoDB 오류:", error);
  return NextResponse.json({ error: "클릭 수 저장소에 연결하지 못했습니다." }, { status: 500 });
};

/** 링크별 클릭 수 조회: { counts: { [linkId]: number } } */
export async function GET() {
  try {
    const db = await getDb();
    if (!db) return noDbResponse();

    const docs = await db
      .collection<ClickDoc>("clicks")
      .find({ _id: { $in: Array.from(validIds) } })
      .toArray();
    const counts: Record<string, number> = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return dbErrorResponse(error);
  }
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

  try {
    const db = await getDb();
    if (!db) return noDbResponse();

    // $inc는 DB 안에서 원자적으로 더하므로 동시에 여러 번 눌려도 숫자가 빠지지 않습니다.
    const updated = await db
      .collection<ClickDoc>("clicks")
      .findOneAndUpdate({ _id: id }, { $inc: { count: 1 } }, { upsert: true, returnDocument: "after" });

    return NextResponse.json({ ok: true, count: updated?.count ?? null });
  } catch (error) {
    return dbErrorResponse(error);
  }
}
