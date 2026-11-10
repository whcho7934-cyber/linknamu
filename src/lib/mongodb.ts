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
    // DB에 닿지 않을 때 30초씩 붙잡혀 있지 않도록 대기 시간을 짧게 둡니다.
    global._mongoClientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
      .connect()
      .catch((error) => {
        // 실패한 연결을 캐시에 남기면 이후 요청이 전부 실패하므로 비워서 다음 요청 때 다시 시도합니다.
        global._mongoClientPromise = undefined;
        throw error;
      });
  }
  const client = await global._mongoClientPromise;
  return client.db(dbName);
}
