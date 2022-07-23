import axios from 'axios'
import type { Project, ProjectPager } from '@/types/Project'
import type { ProjectSchema } from '@/validations/ProjectSchema'
const API_URI = '/api/projects'

const getProjects = async (page?: number) => {
    const { data } = await axios.get<ProjectPager>(API_URI, {
        params: {
            'page': page
        }
    })
    return data
}

const createProject = async (project: ProjectSchema) => {
    const { data } = await axios.post(`${API_URI}`, project)
    return data
}

const updateProject = async ({id, project}: {
    id: number
    project: ProjectSchema
}) => {
    const { data } = await axios.put(`${API_URI}/${id}`, project)
    return data
}

const deleteProject = async (id: number) => {
    const { data } = await axios.delete<Project>(`${API_URI}/${id}`)
    return data
}

export {
    getProjects,
    createProject,
    updateProject,
    deleteProject
}
