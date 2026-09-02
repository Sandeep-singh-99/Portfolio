import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/graphql";
const DEFAULT_USER = "Sandeep-singh-99";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME || DEFAULT_USER;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured." },
      { status: 500 }
    );
  }

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          login,
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();

      return NextResponse.json(
        {
          error: "GitHub request failed.",
          detail: text,
        },
        { status: 502 }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        {
          error: "GitHub query error.",
          detail: json.errors,
        },
        { status: 502 }
      );
    }

    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        {
          error: "No GitHub contribution data found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("GitHub API error:", error);

    return NextResponse.json(
      {
        error: "Internal GitHub API error.",
      },
      { status: 500 }
    );
  }
}