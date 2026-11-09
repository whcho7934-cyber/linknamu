import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

declare global {
  // 개발 모드 핫 리로드 때 연결이 계속 늘어나지 않도록 전역에 캐시합니다.
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** MONGODB_URI가 없으면 null을 반환합니다. (클릭 집계만 꺼지고 페이지는 정상 동작) */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  const client = await global._mongoClientPromise;
  return client.db(dbName);
}
