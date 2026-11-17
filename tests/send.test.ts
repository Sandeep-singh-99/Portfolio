import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: mockSend,
    };
  },
}));

import { POST } from "../src/app/api/send/route";

function createPostRequest(body: any): NextRequest {
  return new NextRequest("http://localhost:3000/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/send", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Validation", () => {
    it("returns 400 when name is missing or invalid", async () => {
      const res = await POST(createPostRequest({ email: "test@example.com", message: "Hello" }));
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Name is required");
    });

    it("returns 400 when email is invalid", async () => {
      const res = await POST(
        createPostRequest({ name: "Alice", email: "not-an-email", message: "Hello" })
      );
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("A valid email address is required");
    });

    it("returns 400 when message is missing", async () => {
      const res = await POST(
        createPostRequest({ name: "Alice", email: "alice@example.com", message: "   " })
      );
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Message is required");
    });

    it("returns 400 when phone is not a string", async () => {
      const res = await POST(
        createPostRequest({
          name: "Alice",
          email: "alice@example.com",
          message: "Hello",
          phone: 12345,
        })
      );
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Invalid phone format");
    });

    it("returns 400 when fields exceed maximum length", async () => {
      const longName = "A".repeat(101);
      const resName = await POST(
        createPostRequest({ name: longName, email: "alice@example.com", message: "Hello" })
      );
      expect(resName.status).toBe(400);
      expect((await resName.json()).error).toBe("Name cannot exceed 100 characters");

      const longEmail = "a".repeat(250) + "@example.com";
      const resEmail = await POST(
        createPostRequest({ name: "Alice", email: longEmail, message: "Hello" })
      );
      expect(resEmail.status).toBe(400);
      expect((await resEmail.json()).error).toBe("Email cannot exceed 254 characters");

      const longPhone = "1".repeat(31);
      const resPhone = await POST(
        createPostRequest({
          name: "Alice",
          email: "alice@example.com",
          message: "Hello",
          phone: longPhone,
        })
      );
      expect(resPhone.status).toBe(400);
      expect((await resPhone.json()).error).toBe("Phone cannot exceed 30 characters");

      const longMessage = "M".repeat(5001);
      const resMessage = await POST(
        createPostRequest({ name: "Alice", email: "alice@example.com", message: longMessage })
      );
      expect(resMessage.status).toBe(400);
      expect((await resMessage.json()).error).toBe("Message cannot exceed 5000 characters");
    });
  });

  describe("Sanitization & Dispatch", () => {
    it("escapes HTML entities in body and sanitizes subject line header injection", async () => {
      mockSend.mockResolvedValueOnce({ data: { id: "msg_123" }, error: null });

      const res = await POST(
        createPostRequest({
          name: "Attacker <script>alert(1)</script>\r\nBcc: victim@example.com",
          email: "attacker@example.com",
          message: "<b>Bold</b> & \"quotes\" 'single'",
          phone: "+1 555-0100",
        })
      );

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.id).toBe("msg_123");

      expect(mockSend).toHaveBeenCalledTimes(1);
      const callArgs = mockSend.mock.calls[0][0];

      // Verify subject has newlines stripped
      expect(callArgs.subject).not.toContain("\r");
      expect(callArgs.subject).not.toContain("\n");

      // Verify HTML entities are escaped in html body
      expect(callArgs.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
      expect(callArgs.html).not.toContain("<script>");
      expect(callArgs.html).toContain("&lt;b&gt;Bold&lt;/b&gt; &amp; &quot;quotes&quot; &#39;single&#39;");

      // Verify plain text version is provided
      expect(callArgs.text).toBeDefined();
      expect(callArgs.text).toContain("Name: Attacker <script>alert(1)</script>");
      expect(callArgs.text).toContain("Email: attacker@example.com");
    });
  });
});
