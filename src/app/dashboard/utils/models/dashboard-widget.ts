import { DashboardWidgetType } from "./dashboard-widget-type";

export interface DashboardWidget<T> {
    id: string;
    type: DashboardWidgetType;
    data: T;
}