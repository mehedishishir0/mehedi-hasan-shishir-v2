// export interface ProjectImage {
//   public_id: string;
//   url: string;
//   _id: string;
// }

// export interface ProjectData {
//   _id: string;
//   title: string;
//   description: string;
//   image: ProjectImage[];
//   technologies: string[]; // if technologies are just strings, otherwise adjust accordingly
//   githubLink: string;
//   liveLink: string;
//   __v: number;
// }

// export interface SingelProjectResponse {
//   success: boolean;
//   message: string;
//   data: ProjectData;
// }

export interface ProjectImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  image: ProjectImage[];
  technologies: string[];
  githubLink: string;
  liveLink: string;
  category?: string;
  year?: string;
  client?: string;
  duration?: string;
  role?: string;
}

export interface SingelProjectResponse {
  success: boolean;
  message: string;
  data: ProjectData;
}