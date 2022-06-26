import axios from 'axios'
import { ProjectPager } from '@/types/Project'

const API_URI = '/api/projects'

const getProjects = async (page?: number) => {
    const { data } = await axios.get<ProjectPager>(API_URI, {
        params: {
            'page': page
        }
    })
    return data
}

export {
    getProjects
}
