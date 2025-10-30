

export async function getHero() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hero`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get profile")
  }
  return resData
}
