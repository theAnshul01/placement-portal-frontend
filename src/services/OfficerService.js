import api from '../api/api'

export const fetchPlacementStats = async () => {
    try {
        const response = await api.get("/api/officer/statistics/overview")
        return response.data;
    } catch (error) {
        const msg = error?.response?.data?.message
        throw new Error(msg || "Failed to load placement stats");
    }
}

export const fetchPendingRecruiters = async () => {
    try {
        const response = await api.get("/api/officer/recruiters/unverified")
        return response.data
    } catch (error) {
        const msg = error?.response?.data?.message
        throw new Error(msg || "Failed to load unverified recruiters")
    }
}

export const fetchOpenJobs = async () => {
    try {
        const response = await api.get("/jobs")
        return response.data
    } catch (error) {
        const msg = error?.response?.data?.message
        throw new Error(msg || "Failed to load job drives")
    }
}
