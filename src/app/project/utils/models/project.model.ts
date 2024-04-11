import { ProjectStatus } from "./project-status.enum";

export class Project {
    _id!: string;
    userId!: string;
    title!: string;
    description!: string;
    category!: string;
    tags!: string;
    status!: ProjectStatus;
    createdAt!: Date;
    updatedAt!: Date;
    publishedAt!: Date | null;
    likes!: string[];
    bookmarks!: string[];
    shares!: string[];
    image!: string;
}