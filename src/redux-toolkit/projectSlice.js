import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: JSON.parse(localStorage.getItem('projects')) || [],
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addNewProject: (state, action) => {
            state.projects = [action.payload, ...state.projects];
            localStorage.setItem(
                'projects',
                JSON.stringify(state.projects.map((project) => project))
            );
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(
                (project) => project.slug !== action.payload.slug
            );
            JSON.stringify(state.projects.map((project) => project));
        },
        addNewTask: (state, action) => {
            const { slug, task } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.slug === slug) {
                    return {
                        ...project,
                        tasks: [task, ...project.tasks],
                    };
                }
                return project;
            });
            localStorage.setItem(
                'projects',
                JSON.stringify(state.projects.map((project) => project))
            );
        },
        updateTask: (state, action) => {
            const { slug, taskId } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.slug === slug) {
                    const updatedTaskArray = project.tasks.map((task) => {
                        if (task.taskId === taskId) {
                            return {
                                ...task,
                                status: !task.status,
                            };
                        }
                        return task;
                    });
                    return {
                        ...project,
                        tasks: [...updatedTaskArray],
                    };
                }
                return project;
            });
            localStorage.setItem(
                'projects',
                JSON.stringify(state.projects.map((project) => project))
            );
        },
        deleteTask: (state, action) => {
            const { slug, taskId } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.slug === slug) {
                    const updatedTaskArray = project.tasks.filter(
                        (task) => task.taskId !== taskId
                    );
                    return {
                        ...project,
                        tasks: updatedTaskArray,
                    };
                }
                return project;
            });
            localStorage.setItem(
                'projects',
                JSON.stringify(state.projects.map((project) => project))
            );
        },
    },
});

export default projectSlice.reducer;
export const {
    addNewProject,
    deleteProject,
    addNewTask,
    updateTask,
    deleteTask,
} = projectSlice.actions;
