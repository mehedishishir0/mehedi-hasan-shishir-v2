// "use client"

// import React from "react"
// import { useQuery } from "@tanstack/react-query"
// import { Calendar, GitBranch, Star, GitCommit, Users, Code2, ArrowUpRight } from "lucide-react"
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

// async function fetchGitHubData(username: string) {
//   const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN
//   if (!GITHUB_TOKEN) throw new Error("GitHub token not set")

//   const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` }

//   const [reposRes, userRes, eventsRes] = await Promise.all([
//     fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
//     fetch(`https://api.github.com/users/${username}`, { headers }),
//     fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, { headers }),
//   ])

//   if (!reposRes.ok || !userRes.ok || !eventsRes.ok) throw new Error("Failed to fetch")

//   const repos = await reposRes.json()
//   const user = await userRes.json()
//   const events = await eventsRes.json()

//   const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
  
//   const recentActivity: GitHubActivity[] = events.slice(0, 8).map((e: any) => ({
//     type: e.type,
//     repo: e.repo.name,
//     action: e.type === "PushEvent" ? "Pushed to" : e.type === "WatchEvent" ? "Starred" : "Contributed to",
//     timestamp: e.created_at,
//     commits: e.payload?.commits?.length,
//   }))

//   const query = `query { user(login: "${username}") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } totalCommitContributions } } }`
//   const graphQLRes = await fetch("https://api.github.com/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${GITHUB_TOKEN}` },
//     body: JSON.stringify({ query }),
//   })

//   const graphQLData = await graphQLRes.json()
//   const collection = graphQLData.data.user.contributionsCollection
//   const contributions: ContributionDay[] = collection.contributionCalendar.weeks.flatMap((w: any) =>
//     w.contributionDays.map((d: any) => ({
//       date: d.date,
//       count: d.contributionCount,
//       level: d.contributionCount === 0 ? 0 : d.contributionCount <= 2 ? 1 : d.contributionCount <= 5 ? 2 : d.contributionCount <= 10 ? 3 : 4,
//     }))
//   )

//   return { totalCommits: collection.totalCommitContributions, totalRepos: repos.length, totalStars, followers: user.followers, contributions, recentActivity }
// }

// const StatCard = ({ icon: Icon, label, value }: any) => (
//   <Card className="group relative overflow-hidden border-none bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
//     <div className="flex items-center justify-between">
//       <div className="z-10">
//         <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
//         <p className="mt-1 text-3xl font-bold text-slate-900">{value.toLocaleString()}</p>
//       </div>
//       <div className="rounded-2xl bg-slate-50 p-4 transition-colors group-hover:bg-slate-900 group-hover:text-white">
//         <Icon className="h-6 w-6" />
//       </div>
//     </div>
//   </Card>
// )

// const ContributionGraph = ({ contributions }: { contributions: ContributionDay[] }) => {
//   const weeks: ContributionDay[][] = []
//   for (let i = 0; i < contributions.length; i += 7) weeks.push(contributions.slice(i, i + 7))

//   const getLevelColor = (level: number) => {
//     const colors = ["bg-slate-100", "bg-emerald-200", "bg-emerald-400", "bg-emerald-600", "bg-emerald-800"]
//     return colors[level]
//   }

//   return (
//     <div className="h-[230px] rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
//       <div className="mb-6 flex items-center justify-between">
//         <h3 className="flex items-center gap-2 font-semibold text-slate-900">
//           <Calendar className="h-4 w-4 text-emerald-500" />
//           Contribution History 
//         </h3>
//         <span className="text-xs text-slate-400 italic">Last 12 months</span>
//       </div>
//       <div className="flex md:gap-[4px] lg:gap-[8px] h-full  overflow-x-auto pb-4 custom-scrollbar">
//         {weeks.map((week, i) => (
//           <div key={i} className="flex flex-col gap-[3px]">
//             {week.map((day, j) => (
//               <div
//                 key={j}
//                 className={`h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-150 hover:z-10 ${getLevelColor(day.level)}`}
//                 title={`${day.count} contributions on ${day.date}`}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const ActivityFeed = ({ activities }: { activities: GitHubActivity[] }) => (
//   <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
//     <h3 className="mb-6 flex items-center gap-2 font-semibold text-slate-900">
//       <GitBranch className="h-4 w-4 text-blue-500" />
//       Recent Pulses
//     </h3>
//     <div className="space-y-6">
//       {activities.map((a, i) => (
//         <div key={i} className="group relative flex gap-4">
//           <div className="flex flex-col items-center">
//             <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-blue-500" />
//             <div className="h-full w-[1px] bg-slate-100" />
//           </div>
//           <div className="pb-2">
//             <p className="text-sm font-medium text-slate-900">
//               {a.action} <span className="font-mono text-blue-600">{a.repo.split('/')[1] || a.repo}</span>
//             </p>
//             <div className="mt-1 flex items-center gap-2">
//               <span className="text-[10px] uppercase tracking-tighter text-slate-400">
//                 {new Date(a.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//               </span>
//               {a.commits && (
//                 <Badge variant="secondary" className="h-4 bg-slate-50 text-[9px] font-bold text-slate-500 border-none">
//                   {a.commits} COMMITS
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )

// export default function GitHubActivityShowcase({ username }: { username: string }) {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["github-activity", username],
//     queryFn: () => fetchGitHubData(username),
//     staleTime: 600000,
//   })

//   if (isLoading) return <div className="flex h-96 items-center justify-center text-slate-400 animate-pulse">Scanning GitHub ecosystem...</div>
//   if (isError || !data) return <div className="py-24 text-center text-red-400">Failed to sync with GitHub.</div>

//   return (
//     <section className="bg-muted/30 py-24 px-4 sm:px-6 selection:bg-emerald-100">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="mb-16 flex flex-col items-center text-center">
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 border border-slate-100">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//             </span>
//             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live GitHub Feed</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//             Code <span className="text-slate-400">&</span> Contributions.
//           </h2>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
//           <StatCard icon={GitCommit} label="Contributions" value={data.totalCommits} />
//           <StatCard icon={Code2} label="Repositories" value={data.totalRepos} />
//           <StatCard icon={Star} label="Total Stars" value={data.totalStars} />
//           <StatCard icon={Users} label="Followers" value={data.followers} />
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <ContributionGraph contributions={data.contributions} />
//           </div>
//           <div className="lg:col-span-1">
//             <ActivityFeed activities={data.recentActivity} />
//           </div>
//         </div>
        
//         <div className="mt-12 flex justify-center">
//            <a 
//             href={`https://github.com/${username}`} 
//             target="_blank" 
//             className="group flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-900"
//            >
//             View full profile on GitHub
//             <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//            </a>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Calendar, GitBranch, Star, GitCommit, Users, Code2, ArrowUpRight, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
    fetch(`https://api.github.com/users/${username}/events/public?per_page=3`, { headers }),
  ])

  if (!reposRes.ok || !userRes.ok || !eventsRes.ok) throw new Error("Failed to fetch")

  const repos = await reposRes.json()
  const user = await userRes.json()
  const events = await eventsRes.json()

  const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
  
  const recentActivity: GitHubActivity[] = events.slice(0, 6).map((e: any) => ({
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
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="group relative overflow-hidden  border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-blue-500/50">
      <div className="flex items-center justify-between">
        <div className="z-10">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4 transition-all group-hover:bg-blue-500 group-hover:text-white group-hover:rotate-12">
          <Icon className="h-6 w-6 text-blue-400 group-hover:text-white" />
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 h-20 w-20 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10" />
    </Card>
  </motion.div>
)

const ContributionGraph = ({ contributions }: { contributions: ContributionDay[] }) => {
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) weeks.push(contributions.slice(i, i + 7))

  const getLevelColor = (level: number) => {
    const colors = ["bg-white/5", "bg-emerald-900/40", "bg-emerald-700/60", "bg-emerald-500/80", "bg-emerald-400"]
    return colors[level]
  }

  return (
    <Card className="h-full rounded-[2rem] border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-md">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-white tracking-tight">
          <Calendar className="h-4 w-4 text-emerald-400" />
          Contribution History 
        </h3>
        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Last 12 Months</span>
      </div>
      <div className="flex gap-[4px] md:gap-[6px] lg:gap-[6px] h-full hide-scrollbar overflow-x-auto pb-4 ">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-[4px] md:gap-[6px]">
            {week.map((day, j) => (
              <motion.div
                key={j}
                whileHover={{ scale: 1.5, zIndex: 10 }}
                className={`h-[10px] w-[10px] md:h-[12px] md:w-[12px] rounded-[2px] transition-colors cursor-pointer ${getLevelColor(day.level)}`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}

const ActivityFeed = ({ activities }: { activities: GitHubActivity[] }) => (
  <Card className="flex h-full flex-col rounded-[2.5rem] border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-md">
    <h3 className="mb-8 flex items-center gap-2 font-bold text-white tracking-tight">
      <GitBranch className="h-4 w-4 text-blue-400" />
      Recent Pulses
    </h3>
    <div className="space-y-8 flex-grow">
      {activities.map((a, i) => (
        <div key={i} className="group relative flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full border-2 border-white/20 bg-gray-800 group-hover:bg-blue-400 group-hover:border-blue-400 transition-all duration-300" />
            <div className="h-full w-[1px] bg-white/5" />
          </div>
          <div className="pb-2">
            <p className="text-[13px] font-medium text-gray-300 leading-tight">
              {a.action} <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{a.repo.split('/')[1] || a.repo}</span>
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                {new Date(a.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              {a.commits && (
                <Badge variant="outline" className="h-4 bg-blue-500/10 border-blue-500/20 text-[8px] font-black text-blue-400 tracking-tighter">
                  {a.commits} COMMITS
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

export default function GitHubActivityShowcase({ username }: { username: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-activity", username],
    queryFn: () => fetchGitHubData(username),
    staleTime: 600000,
  })

  if (isLoading) return (
    <div className="flex h-96 flex-col items-center justify-center gap-4 text-gray-500">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Syncing ecosystem...</p>
    </div>
  )
  
  if (isError || !data) return <div className="py-24 text-center text-red-400 font-bold uppercase tracking-widest">Failed to sync with GitHub.</div>

  return (
    <section className="relative bg-[#030712] py-24 px-4 sm:px-6 overflow-hidden ">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-emerald-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 flex flex-col items-center text-center"
        >
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Live Octokit API Feed</span>
          </div> */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Open Source Footprint.
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard icon={GitCommit} label="Total Commits" value={data.totalCommits} />
          <StatCard icon={Code2} label="Repositories" value={data.totalRepos} />
          <StatCard icon={Star} label="Stars Earned" value={data.totalStars} />
          <StatCard icon={Users} label="Collaborators" value={data.followers} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContributionGraph contributions={data.contributions} />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed activities={data.recentActivity} />
          </div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 flex justify-center"
        >
           <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            className="group flex items-center gap-3 rounded-full bg-white/5 px-8 py-4 text-sm font-bold text-gray-400 transition-all hover:bg-white/10 hover:text-white border border-white/5"
           >
            <Github className="h-5 w-5" />
            Explore Full Repository
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
           </a>
        </motion.div>
      </div>
    </section>
  )
}