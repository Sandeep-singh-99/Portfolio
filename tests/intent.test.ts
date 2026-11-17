import { describe, it, expect } from "vitest";
import { detectIntent } from "../lib/intent";

describe("AI Intent Detection (detectIntent)", () => {
  describe("Fast-path rule based matching", () => {
    it("routes greetings to general", async () => {
      expect(await detectIntent("hi")).toBe("general");
      expect(await detectIntent("hello")).toBe("general");
      expect(await detectIntent("hey")).toBe("general");
      expect(await detectIntent("how are you")).toBe("general");
    });

    it("routes project inquiries to project", async () => {
      expect(await detectIntent("tell me about your projects")).toBe("project");
      expect(await detectIntent("show me your work")).toBe("project");
      expect(await detectIntent("what apps have you built?")).toBe("project");
      expect(await detectIntent("what websites you built")).toBe("project");
    });

    it("routes skills and tech stack inquiries to skill", async () => {
      expect(await detectIntent("what is your tech stack?")).toBe("skill");
      expect(await detectIntent("what technologies do you use?")).toBe("skill");
      expect(await detectIntent("what programming languages and frameworks?")).toBe("skill");
      expect(await detectIntent("what skills do you have?")).toBe("skill");
    });

    it("routes contact and social inquiries to contact", async () => {
      expect(await detectIntent("how can I contact you?")).toBe("contact");
      expect(await detectIntent("what is your email address?")).toBe("contact");
      expect(await detectIntent("can I see your linkedin or github?")).toBe("contact");
      expect(await detectIntent("I want to hire you")).toBe("contact");
    });

    it("routes biography and background inquiries to about", async () => {
      expect(await detectIntent("who is sandeep?")).toBe("about");
      expect(await detectIntent("tell me about yourself")).toBe("about");
      expect(await detectIntent("what is your background and education?")).toBe("about");
      expect(await detectIntent("what is your experience?")).toBe("about");
    });
  });
});
