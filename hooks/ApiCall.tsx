import { getAbout, getHero, getProject, getReview, getTimeLine, stackGallery, technologyLove } from "@/lib/hero"
import { AboutResponse } from "@/types/aboutResponseData"
import { HeroResponse } from "@/types/heroReseponseData"
import { ProjectResponse } from "@/types/projectResponseData"
import { StackApiResponse } from "@/types/stackResponseData"
import { TechnologyResponse } from "@/types/technologyResponseData"
import { TimelineAPIResponse } from "@/types/timlineResponse"
import { useQuery } from "@tanstack/react-query"


export function useHeroSection() {
    return useQuery<HeroResponse>({
        queryKey: ["hero"],
        queryFn: () => {
            return getHero()
        },
    })
}

export function useAbout() {
    return useQuery<AboutResponse>({
        queryKey: ["about"],
        queryFn: () => {
            return getAbout()
        },
    })
}

export function useTechnologyLove() {
    return useQuery<TechnologyResponse>({
        queryKey: ["technology-love"],
        queryFn: () => {
            return technologyLove()
        },
    })
}

export function useProject() {
    return useQuery<ProjectResponse>({
        queryKey: ["project"],
        queryFn: () => {
            return getProject()
        },
    })
}

export function useTimeLine() {
    return useQuery<TimelineAPIResponse>({
        queryKey: ["timeline"],
        queryFn: () => {
            return getTimeLine()
        },
    })
}

export function useReveiew() {
    return useQuery<TestimonialResponse>({
        queryKey: ["testomonial"],
        queryFn: () => {
            return getReview()
        },
    })
}

export function useGetStackGallery() {
    return useQuery<StackApiResponse>({
        queryKey: ["stack-gallery"],
        queryFn: () => {
            return stackGallery()
        },
    })
}