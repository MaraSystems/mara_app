import { ProjectStatus } from "./project-status.enum";

export class Project {
    _id!: string;
    userId!: string;
    title!: string;
    description!: string;
    status!: ProjectStatus;
    createdAt!: Date;
    updatedAt!: Date;
    likes!: string[];
    bookmarks!: string[];
    shares!: string[];
    image!: string;
}