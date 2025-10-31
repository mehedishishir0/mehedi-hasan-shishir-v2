"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Calendar, GitBranch, Star, GitCommit, Users, Code2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GitHubActivity {
  type: string
  repo: string
  action: string
  timestamp: string
  commits?: number
}

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

async function fetchGitHubData(username: string) {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  if (!GITHUB_TOKEN) throw new Error("GitHub token not set")

  const [reposRes, userRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/events/public`),
  ])

  if (!reposRes.ok || !userRes.ok || !eventsRes.ok) throw new Error("Failed to fetch GitHub data")

  const repos = await reposRes.json()
  const user = await userRes.json()
  const events = await eventsRes.json()

  const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)

  const recentActivity: GitHubActivity[] = events.slice(0, 10).map((e: any) => ({
    type: e.type,
    repo: e.repo.name,
    action:
      e.type === "PushEvent"
        ? "Pushed to"
        : e.type === "WatchEvent"
          ? "Starred"
          : e.type === "ForkEvent"
            ? "Forked"
            : e.type === "PullRequestEvent"
              ? "Pull Request"
              : "Contributed",
    timestamp: e.created_at,
    commits: e.payload?.commits?.length,
  }))

  // GraphQL contribution query
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          totalCommitContributions
        }
      }
    }
  `

  const graphQLRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!graphQLRes.ok) throw new Error("Failed to fetch contributions")
  const graphQLData = await graphQLRes.json()

  const collection = graphQLData.data.user.contributionsCollection
  const weeks = collection.contributionCalendar.weeks

  const contributions: ContributionDay[] = weeks.flatMap((week: any) =>
    week.contributionDays.map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
      level:
        day.contributionCount === 0
          ? 0
          : day.contributionCount <= 2
            ? 1
            : day.contributionCount <= 5
              ? 2
              : day.contributionCount <= 10
                ? 3
                : 4,
    })),
  )

  return {
    totalCommits: collection.totalCommitContributions,
    totalRepos: repos.length,
    totalStars,
    followers: user.followers,
    contributions,
    recentActivity,
  }
}

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) => (
  <Card className="bg-gray-50 border-gray-200 p-4 hover:bg-gray-100 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
    </div>
  </Card>
)

const ContributionGraph = ({ contributions }: { contributions: ContributionDay[] }) => {
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) weeks.push(contributions.slice(i, i + 7))

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col h-full">
      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Contribution Activity
      </h3>
      <div className="flex gap-1 overflow-x-auto flex-1">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1 min-w-[10px]">
            {week.map((day, j) => (
              <div
                key={j}
                className={`w-3 h-3 rounded-sm transition-all hover:scale-110 ${
                  day.level === 0
                    ? "bg-gray-200"
                    : day.level === 1
                      ? "bg-gray-300"
                      : day.level === 2
                        ? "bg-gray-400"
                        : day.level === 3
                          ? "bg-gray-500"
                          : "bg-gray-700"
                }`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const ActivityFeed = ({ activities }: { activities: GitHubActivity[] }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col h-full overflow-y-auto">
    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
      <GitBranch className="w-4 h-4" />
      Recent Activity
    </h3>
    <div className="space-y-3 flex-1">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="bg-gray-100 p-1.5 rounded-full mt-0.5">
            <GitCommit className="w-3 h-3 text-gray-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{a.action}</span>{" "}
              <span className="text-gray-700 font-mono text-xs">{a.repo}</span>
            </p>
            {a.commits && (
              <Badge variant="outline" className="mt-1 text-xs border-gray-300 text-gray-700 bg-gray-50">
                {a.commits} commits
              </Badge>
            )}
            <p className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function GitHubActivityShowcase({ username }: { username: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-activity", username],
    queryFn: () => fetchGitHubData(username),
  })

  if (isLoading) return <p className="text-gray-600 text-center py-24">Loading GitHub Activity...</p>
  if (isError || !data) return <p className="text-gray-600 text-center py-24">Failed to load GitHub Activity</p>

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900">GitHub Activity</h2>
          <p className="text-gray-600 text-lg mt-4">@{username} • Coding activity and contributions</p>
        </div>

        {/* Stats */}
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={GitCommit} label="Total Commits" value={data.totalCommits} />
            <StatCard icon={Code2} label="Repositories" value={data.totalRepos} />
            <StatCard icon={Star} label="Stars Earned" value={data.totalStars} />
            <StatCard icon={Users} label="Followers" value={data.followers} />
          </div>

          {/* Graph + Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col">
              <ContributionGraph contributions={data.contributions} />
            </div>
            <div className="flex flex-col h-64">
              <ActivityFeed activities={data.recentActivity} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
