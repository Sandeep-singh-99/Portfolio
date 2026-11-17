import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockGetServerSession } = vi.hoisted(() => ({
  mockGetServerSession: vi.fn(),
}));

vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

vi.mock("../lib/pinecone", () => ({
  pinecone: {
    listIndexes: vi.fn().mockResolvedValue({ indexes: [{ name: "portfolio-index" }] }),
    Index: vi.fn().mockReturnValue({}),
  },
  indexName: "portfolio-index",
}));

vi.mock("../lib/vectorStore", () => ({
  getVectorStore: vi.fn().mockResolvedValue({
    addDocuments: vi.fn().mockResolvedValue(true),
  }),
}));

vi.mock("../lib/db", () => ({
  ConnectDB: vi.fn().mockResolvedValue(true),
}));

import { POST } from "../src/app/api/ingest/route";

describe("POST /api/ingest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects unauthenticated requests with 401 Unauthorized", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);

    const res = await POST();
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toBe("Unauthorized");
  });
});
