// "use client"

// import React from "react"
// import { useQuery } from "@tanstack/react-query"
// import { Calendar, GitBranch, Star, GitCommit, Users, Code2 } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// interface GitHubActivity {
//   type: string
//   repo: string
//   action: string
//   timestamp: string
//   commits?: number
// }

// interface ContributionDay {
//   date: string
//   count: number
//   level: 0 | 1 | 2 | 3 | 4
// }

// // ✅ FIXED FUNCTION
// async function fetchGitHubData(username: string) {
//   const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN
//   if (!GITHUB_TOKEN) throw new Error("GitHub token not set")

//   const headers = {
//     Authorization: `Bearer ${GITHUB_TOKEN}`,
//   }

//   const [reposRes, userRes, eventsRes] = await Promise.all([
//     fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
//     fetch(`https://api.github.com/users/${username}`, { headers }),
//     fetch(`https://api.github.com/users/${username}/events/public`, { headers }),
//   ])

//   if (!reposRes.ok || !userRes.ok || !eventsRes.ok) {
//     throw new Error("Failed to fetch GitHub data")
//   }

//   const repos = await reposRes.json()
//   const user = await userRes.json()
//   const events = await eventsRes.json()

//   const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)

//   const recentActivity: GitHubActivity[] = events.slice(0, 10).map((e: any) => ({
//     type: e.type,
//     repo: e.repo.name,
//     action:
//       e.type === "PushEvent"
//         ? "Pushed to"
//         : e.type === "WatchEvent"
//         ? "Starred"
//         : e.type === "ForkEvent"
//         ? "Forked"
//         : e.type === "PullRequestEvent"
//         ? "Pull Request"
//         : "Contributed",
//     timestamp: e.created_at,
//     commits: e.payload?.commits?.length,
//   }))

//   // GraphQL
//   const query = `
//     query {
//       user(login: "${username}") {
//         contributionsCollection {
//           contributionCalendar {
//             weeks {
//               contributionDays {
//                 date
//                 contributionCount
//               }
//             }
//           }
//           totalCommitContributions
//         }
//       }
//     }
//   `

//   const graphQLRes = await fetch("https://api.github.com/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${GITHUB_TOKEN}`,
//     },
//     body: JSON.stringify({ query }),
//   })

//   if (!graphQLRes.ok) throw new Error("Failed to fetch contributions")

//   const graphQLData = await graphQLRes.json()

//   const collection = graphQLData.data.user.contributionsCollection
//   const weeks = collection.contributionCalendar.weeks

//   const contributions: ContributionDay[] = weeks.flatMap((week: any) =>
//     week.contributionDays.map((day: any) => ({
//       date: day.date,
//       count: day.contributionCount,
//       level:
//         day.contributionCount === 0
//           ? 0
//           : day.contributionCount <= 2
//           ? 1
//           : day.contributionCount <= 5
//           ? 2
//           : day.contributionCount <= 10
//           ? 3
//           : 4,
//     }))
//   )

//   return {
//     totalCommits: collection.totalCommitContributions,
//     totalRepos: repos.length,
//     totalStars,
//     followers: user.followers,
//     contributions,
//     recentActivity,
//   }
// }

// const StatCard = ({ icon: Icon, label, value }: any) => (
//   <Card className="bg-gray-50 border-gray-200 p-4 hover:bg-gray-100 transition">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-xs text-gray-600">{label}</p>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       </div>
//       <div className="bg-gray-100 p-3 rounded-lg">
//         <Icon className="w-6 h-6 text-gray-700" />
//       </div>
//     </div>
//   </Card>
// )

// const ContributionGraph = ({ contributions }: { contributions: ContributionDay[] }) => {
//   const weeks: ContributionDay[][] = []
//   for (let i = 0; i < contributions.length; i += 7) {
//     weeks.push(contributions.slice(i, i + 7))
//   }

//   return (
//     <div className="bg-white border rounded-lg p-4 flex flex-col h-full">
//       <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
//         <Calendar className="w-4 h-4" />
//         Contribution Activity
//       </h3>
//       <div className="flex gap-1 overflow-x-auto">
//         {weeks.map((week, i) => (
//           <div key={i} className="flex flex-col gap-1">
//             {week.map((day, j) => (
//               <div
//                 key={j}
//                 className={`w-3 h-3 rounded-sm ${
//                   day.level === 0
//                     ? "bg-gray-200"
//                     : day.level === 1
//                     ? "bg-gray-300"
//                     : day.level === 2
//                     ? "bg-gray-400"
//                     : day.level === 3
//                     ? "bg-gray-500"
//                     : "bg-gray-700"
//                 }`}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const ActivityFeed = ({ activities }: { activities: GitHubActivity[] }) => (
//   <div className="bg-white border rounded-lg p-4 h-full overflow-y-auto">
//     <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
//       <GitBranch className="w-4 h-4" />
//       Recent Activity
//     </h3>
//     <div className="space-y-3">
//       {activities.map((a, i) => (
//         <div key={i}>
//           <p className="text-sm">
//             <span className="font-medium">{a.action}</span>{" "}
//             <span className="font-mono text-xs">{a.repo}</span>
//           </p>
//           {a.commits && (
//             <Badge variant="outline" className="text-xs mt-1">
//               {a.commits} commits
//             </Badge>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// )

// export default function GitHubActivityShowcase({ username }: { username: string }) {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["github-activity", username],
//     queryFn: () => fetchGitHubData(username),
//     staleTime: 1000 * 60 * 10, 
//   })

//   if (isLoading) return <p className="text-center py-24">Loading...</p>
//   if (isError || !data) return <p className="text-center py-24">Failed to load</p>

//   return (
//     <section className="py-24">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-10">GitHub Activity</h2>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard icon={GitCommit} label="Commits" value={data.totalCommits} />
//           <StatCard icon={Code2} label="Repos" value={data.totalRepos} />
//           <StatCard icon={Star} label="Stars" value={data.totalStars} />
//           <StatCard icon={Users} label="Followers" value={data.followers} />
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <ContributionGraph contributions={data.contributions} />
//           </div>
//           <ActivityFeed activities={data.recentActivity} />
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Calendar, GitBranch, Star, GitCommit, Users, Code2, ArrowUpRight } from "lucide-react"
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

  const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` }

  const [reposRes, userRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, { headers }),
  ])

  if (!reposRes.ok || !userRes.ok || !eventsRes.ok) throw new Error("Failed to fetch")

  const repos = await reposRes.json()
  const user = await userRes.json()
  const events = await eventsRes.json()

  const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
  
  const recentActivity: GitHubActivity[] = events.slice(0, 8).map((e: any) => ({
    type: e.type,
    repo: e.repo.name,
    action: e.type === "PushEvent" ? "Pushed to" : e.type === "WatchEvent" ? "Starred" : "Contributed to",
    timestamp: e.created_at,
    commits: e.payload?.commits?.length,
  }))

  const query = `query { user(login: "${username}") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } totalCommitContributions } } }`
  const graphQLRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({ query }),
  })

  const graphQLData = await graphQLRes.json()
  const collection = graphQLData.data.user.contributionsCollection
  const contributions: ContributionDay[] = collection.contributionCalendar.weeks.flatMap((w: any) =>
    w.contributionDays.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
      level: d.contributionCount === 0 ? 0 : d.contributionCount <= 2 ? 1 : d.contributionCount <= 5 ? 2 : d.contributionCount <= 10 ? 3 : 4,
    }))
  )

  return { totalCommits: collection.totalCommitContributions, totalRepos: repos.length, totalStars, followers: user.followers, contributions, recentActivity }
}

const StatCard = ({ icon: Icon, label, value }: any) => (
  <Card className="group relative overflow-hidden border-none bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div className="z-10">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-3xl font-bold text-slate-900">{value.toLocaleString()}</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4 transition-colors group-hover:bg-slate-900 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </Card>
)

const ContributionGraph = ({ contributions }: { contributions: ContributionDay[] }) => {
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) weeks.push(contributions.slice(i, i + 7))

  const getLevelColor = (level: number) => {
    const colors = ["bg-slate-100", "bg-emerald-200", "bg-emerald-400", "bg-emerald-600", "bg-emerald-800"]
    return colors[level]
  }

  return (
    <div className="h-[230px] rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-slate-900">
          <Calendar className="h-4 w-4 text-emerald-500" />
          Contribution History
        </h3>
        <span className="text-xs text-slate-400 italic">Last 12 months</span>
      </div>
      <div className="flex gap-[4px] h-full  overflow-x-auto pb-4 custom-scrollbar">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {week.map((day, j) => (
              <div
                key={j}
                className={`h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-150 hover:z-10 ${getLevelColor(day.level)}`}
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
  <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
    <h3 className="mb-6 flex items-center gap-2 font-semibold text-slate-900">
      <GitBranch className="h-4 w-4 text-blue-500" />
      Recent Pulses
    </h3>
    <div className="space-y-6">
      {activities.map((a, i) => (
        <div key={i} className="group relative flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-blue-500" />
            <div className="h-full w-[1px] bg-slate-100" />
          </div>
          <div className="pb-2">
            <p className="text-sm font-medium text-slate-900">
              {a.action} <span className="font-mono text-blue-600">{a.repo.split('/')[1] || a.repo}</span>
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-tighter text-slate-400">
                {new Date(a.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              {a.commits && (
                <Badge variant="secondary" className="h-4 bg-slate-50 text-[9px] font-bold text-slate-500 border-none">
                  {a.commits} COMMITS
                </Badge>
              )}
            </div>
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
    staleTime: 600000,
  })

  if (isLoading) return <div className="flex h-96 items-center justify-center text-slate-400 animate-pulse">Scanning GitHub ecosystem...</div>
  if (isError || !data) return <div className="py-24 text-center text-red-400">Failed to sync with GitHub.</div>

  return (
    <section className="bg-muted/30 py-24 selection:bg-emerald-100">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 border border-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live GitHub Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Code <span className="text-slate-400">&</span> Contributions.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard icon={GitCommit} label="Contributions" value={data.totalCommits} />
          <StatCard icon={Code2} label="Repositories" value={data.totalRepos} />
          <StatCard icon={Star} label="Total Stars" value={data.totalStars} />
          <StatCard icon={Users} label="Followers" value={data.followers} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContributionGraph contributions={data.contributions} />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed activities={data.recentActivity} />
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
           <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            className="group flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-900"
           >
            View full profile on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
           </a>
        </div>
      </div>
    </section>
  )
}