import api from "./api";

export const getPendingJobs = () => api.get("/admin/jobs/pending");
export const approveJob = (id) => api.put(`/admin/jobs/${id}/approve`);
export const rejectJob = (id) => api.put(`/admin/jobs/${id}/reject`);