export interface More {
    name: string;
    icon: string;
    link?: string;
    popup?: string;
    hidden?: boolean;
    action?: () => void;
}