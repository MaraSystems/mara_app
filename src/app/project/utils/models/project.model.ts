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
    likes: string[] = [];
    bookmarks: string[] = [];
    shares: number = 0;
    image!: string;
    hidden = false;
    active = false
}