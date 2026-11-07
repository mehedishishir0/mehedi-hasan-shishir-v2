import type { Metadata } from "next";
import ProjectDetailsPage from "./_components/ProjectPageClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://portfolio-backend-afoq.onrender.com/api/v1";

  try {
    const res = await fetch(`${backendUrl}/project/${params.id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return {
        title: "Project Details | Mehedi Hasan Shishir",
      };
    }
    const data = await res.json();
    const project = data?.data;

    if (!project) {
      return {
        title: "Project Details | Mehedi Hasan Shishir",
      };
    }

    const title = `${project.title} | Mehedi Hasan Shishir`;
    const description =
      project.description?.slice(0, 160) ||
      `Explore ${project.title} built with modern web technologies by Mehedi Hasan Shishir.`;
    const imageUrl =
      project.image?.[0]?.url || "https://mehedi-hasan-shishir.vercel.app/logo.png";

    return {
      title,
      description,
      alternates: {
        canonical: `https://mehedi-hasan-shishir.vercel.app/project/${params.id}`,
      },
      openGraph: {
        title,
        description,
        url: `https://mehedi-hasan-shishir.vercel.app/project/${params.id}`,
        type: "website",
        images: [
          {
            url: imageUrl,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Project Details | Mehedi Hasan Shishir",
    };
  }
}

export default function ProjectDetails({ params }: Props) {
  if (!params?.id) {
    return <div>Error: Project ID is missing</div>;
  }

  return <ProjectDetailsPage id={params.id} />;
}
