import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mehedi-hasan-shishir.vercel.app";
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://portfolio-backend-afoq.onrender.com/api/v1";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const blogRes = await fetch(`${backendUrl}/blogs`, {
      next: { revalidate: 3600 },
    });
    if (blogRes.ok) {
      const blogData = await blogRes.json();
      const blogs = Array.isArray(blogData?.data) ? blogData.data : [];
      blogRoutes = blogs.map((blog: any) => ({
        url: `${baseUrl}/blogs/${blog._id}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch blogs for sitemap:", err);
  }

  try {
    const projectRes = await fetch(`${backendUrl}/project`, {
      next: { revalidate: 3600 },
    });
    if (projectRes.ok) {
      const projectData = await projectRes.json();
      const projects = Array.isArray(projectData?.data) ? projectData.data : [];
      projectRoutes = projects.map((project: any) => ({
        url: `${baseUrl}/project/${project._id}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch projects for sitemap:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
