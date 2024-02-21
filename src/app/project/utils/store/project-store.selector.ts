import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState, projectAdapter } from "./project-store.reducer";
import { Project } from "../models/project.model";

export const clientSelector = createFeatureSelector<Readonly<ProjectState>>('projects');

export const selectAllProjects = createSelector(
    clientSelector,
    projectAdapter.getSelectors().selectAll
);

export const selectProjectById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Project
);