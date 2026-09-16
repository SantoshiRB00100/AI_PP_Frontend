import api from "./api";

export const getMyProfile = () => api.get("/students/profile");
export const updateMyProfile = (data) => api.put("/students/profile", data);

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return api.post("/students/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const analyzeResume = () => api.post("/resume/analyze");
export const getResumeAnalysis = () => api.get("/resume/analysis");