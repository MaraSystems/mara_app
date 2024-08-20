import { ProjectStatus } from "./project-status";
import { Privacy } from "src/app/general/features/share/utils/models/privacy";

export interface Project {
    _id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    tags: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    bookmarks: string[];
    shares: number;
    image: string;
    hidden:boolean;
    active:boolean;
    privacy: Privacy;  
}