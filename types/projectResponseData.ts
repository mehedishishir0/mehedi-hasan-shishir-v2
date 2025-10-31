type ProjectImage = {
  public_id: string;
  url: string;
  _id: string;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  image: ProjectImage[];
  technologies: string[];
  githubLink: string;
  liveLink: string;
  __v: number;
};

export type ProjectResponse = {
  success: boolean;
  message: string;
  data: Project[];
};