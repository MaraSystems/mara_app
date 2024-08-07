export interface ProjectDeliverable {
    _id: string;
    projectId: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    documents: string[];
    image: string;
    likes: string[];
    bookmarks: string[];
    shares: number;
    hidden: boolean;
    createdAt: Date;
    updatedAt: Date;
}