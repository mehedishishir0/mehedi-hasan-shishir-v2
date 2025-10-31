

export async function getHero() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hero`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get hero")
  }
  return resData
}


export async function getAbout() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/about`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get about")
  }
  return resData
}

export async function technologyLove() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/technology`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get technology")
  }
  return resData
}

export async function getProject() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get project")
  }
  return resData
}

export async function getTimeLine() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/timeline`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get timeline")
  }
  return resData
}

export async function getReview() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testomonial`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get testomonial")
  }
  return resData
}

export async function stackGallery() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stackgalery`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get stackgalery")
  }
  return resData
}