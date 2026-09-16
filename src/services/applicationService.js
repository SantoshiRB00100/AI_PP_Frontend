import api from "./api";

export const applyForJob = (jobId) => api.post(`/applications/${jobId}`);
export const analyzeJobMatch = (jobId) => api.get(`/applications/job-match/${jobId}`);
export const getMyApplications = () => api.get("/applications/my-applications");
export const getCompanyApplications = () => api.get("/applications/company");
export const updateApplicationStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}/status`, { status });
export const aiShortlistApplicants = (jobId) => api.put(`/applications/ai-shortlist/${jobId}`);