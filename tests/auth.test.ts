import { describe, it, expect, vi, beforeEach } from "vitest";
import { authOptions } from "../lib/auth";

vi.mock("../lib/db", () => ({
  ConnectDB: vi.fn().mockResolvedValue(true),
}));

vi.mock("../models/user.model", () => ({
  default: {
    findOne: vi.fn(),
  },
}));

import User from "../models/user.model";

describe("NextAuth authOptions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const credentialsProvider = authOptions.providers.find(
    (p: any) => p.id === "credentials" || p.name === "Credentials"
  ) as any;
  const authorizeFn = credentialsProvider.options?.authorize || credentialsProvider.authorize;

  describe("Credentials Provider authorize()", () => {
    it("should throw error when username or password is missing", async () => {
      await expect(
        authorizeFn({ username: "", password: "password123" })
      ).rejects.toThrow("Please enter a username and password");

      await expect(
        authorizeFn({ username: "admin", password: "" })
      ).rejects.toThrow("Please enter a username and password");
    });

    it("should throw error when user is not found in database", async () => {
      vi.mocked(User.findOne).mockResolvedValueOnce(null);

      await expect(
        authorizeFn({ username: "admin", password: "password123" })
      ).rejects.toThrow("User not found");
    });

    it("should throw error when password is incorrect", async () => {
      vi.mocked(User.findOne).mockResolvedValueOnce({
        _id: "user123",
        username: "admin",
        password: "correctpassword",
      });

      await expect(
        authorizeFn({ username: "admin", password: "wrongpassword" })
      ).rejects.toThrow("Incorrect password");
    });

    it("should return user object when credentials match", async () => {
      vi.mocked(User.findOne).mockResolvedValueOnce({
        _id: "user123",
        username: "admin",
        password: "password123",
      });

      const user = await authorizeFn({
        username: "admin",
        password: "password123",
      });

      expect(user).toEqual({
        id: "user123",
        username: "admin",
      });
    });
  });

  describe("Callbacks", () => {
    it("jwt callback maps user id to token", async () => {
      const token = await authOptions.callbacks!.jwt!({
        token: { name: "admin" },
        user: { id: "user123", username: "admin" } as any,
        account: null,
      });

      expect(token).toEqual({ name: "admin", id: "user123" });
    });

    it("session callback maps token id to session user", async () => {
      const session = await authOptions.callbacks!.session!({
        session: {
          user: { id: "old-id", name: "admin", email: "admin@example.com" },
          expires: "1",
        },
        token: { id: "user123" },
        user: {} as any,
        newSession: undefined,
        trigger: "update",
      });

      expect((session as any).user?.id).toBe("user123");
    });
  });

  describe("Admin Proxy protection", () => {
    it("config matcher covers admin panel routes excluding login", async () => {
      const { config } = await import("../src/proxy");
      expect(config.matcher).toContain("/admin-panel/((?!login).*)$");
    });
  });
});
