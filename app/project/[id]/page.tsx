"use client";
import { useParams } from "next/navigation";
import ProjectDetailsPage from "./_components/ProjectPageClient";

export default function ProjectDetails() {
const params = useParams();
const id = params?.id;

if (!id) {
  return <div>Error: Project ID is missing</div>;
}

return <ProjectDetailsPage id={id as string} />;
}
