import axios from 'axios'
import type { Project, ProjectPager } from '@/types/Project'
import type { ProjectSchema } from '@/schemas/ProjectSchema'
const API_URI = '/api/projects'

const castResponse = ({ created_at, updated_at, ...project }: Project): Project => {
    return {
        ...project,
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
    }
}

const getProjects = async (page?: number) => {
    const { data } = await axios.get<ProjectPager>(API_URI, {
        params: {
            'page': page
        }
    })

    data.data = data.data.map(({ created_at, updated_at, ...rest }) => ({
        ...rest,
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
    }));

    return data
}

const getProject = async (key: string) => {
    const { data } = await axios.get<Project>(`${API_URI}/${key}`)
    return castResponse(data)
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
    getProject,
    createProject,
    updateProject,
    deleteProject
}
