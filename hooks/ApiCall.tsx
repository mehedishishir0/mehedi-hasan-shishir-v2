import { getHero } from "@/lib/hero"
import { HeroResponse } from "@/types/heroReseponseData"
import { useQuery } from "@tanstack/react-query"

 
export function useHeroSection() {
    return useQuery<HeroResponse>({
        queryKey: ["hero"],
        queryFn: () => {
            return getHero()
        },
    })
}