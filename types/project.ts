import { z } from "zod";

// ---- Enums ----
export const ProjectTypeEnum = z.enum(["open_source", "close_source"]);
export type ProjectType = z.infer<typeof ProjectTypeEnum>;

// ---- Create Project ----
export const CreateProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .max(200, "Project name too long"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  content: z.string().min(1, "Content is required"),
  type: ProjectTypeEnum,
  link: z.string().url("Must be a valid URL").nullable().optional(),
  githubLink: z.string().url("Must be a valid URL").nullable().optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

// ---- Update Project ----
export const UpdateProjectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .max(200, "Project name too long")
    .optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  content: z.string().min(1, "Content is required").optional(),
  type: ProjectTypeEnum.optional(),
  link: z.string().url("Must be a valid URL").nullable().optional(),
  githubLink: z.string().url("Must be a valid URL").nullable().optional(),
});

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;

// ---- Login ----
export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ---- API Response Types ----
export interface ProjectListResponse {
  data: ProjectSummary[];
  meta: {
    page: number;
    limit: number;
    total: number;
    lastPage: number;
  };
}

export interface ProjectSummary {
  id: string;
  projectName: string;
  slug: string;
  thumbnail: string;
  type: ProjectType;
  createdAt: Date;
}

export interface ProjectDetail {
  id: string;
  projectName: string;
  slug: string;
  thumbnail: string;
  content: string;
  type: ProjectType;
  link: string | null;
  githubLink: string | null;
  createdAt: Date;
  updatedAt: Date;
}
