import { DashboardWidgetEnum } from "./dashboard-widget.enum";

export interface DashboardWidget<T> {
    id: string;
    type: DashboardWidgetEnum;
    data: T;
}