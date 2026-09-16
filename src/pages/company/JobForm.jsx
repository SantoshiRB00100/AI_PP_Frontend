import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import Card from "../../components/common/Card";
import Input, { Textarea, Select } from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { createJob, updateJob, getJobById } from "../../services/jobService";
import { JOB_TYPES } from "../../utils/constants";

const initialState = {
  title: "",
  description: "",
  location: "",
  jobType: "Full Time",
  salaryMin: "",
  salaryMax: "",
  requiredSkills: "",
  minimumCGPA: "",
  aiMatchThreshold: 60,
  applicationDeadline: "",
};

const CompanyJobForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await getJobById(id);
        const job = res.data.job;
        setForm({
          title: job.title,
          description: job.description,
          location: job.location,
          jobType: job.jobType,
          salaryMin: job.salary?.min ?? "",
          salaryMax: job.salary?.max ?? "",
          requiredSkills: (job.requiredSkills || []).join(", "),
          minimumCGPA: job.minimumCGPA ?? "",
          aiMatchThreshold: job.aiMatchThreshold ?? 60,
          applicationDeadline: job.applicationDeadline
            ? job.applicationDeadline.slice(0, 10)
            : "",
        });
      } catch (err) {
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      jobType: form.jobType,
      salary: {
        min: form.salaryMin ? Number(form.salaryMin) : undefined,
        max: form.salaryMax ? Number(form.salaryMax) : undefined,
      },
      requiredSkills: form.requiredSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      minimumCGPA: form.minimumCGPA ? Number(form.minimumCGPA) : undefined,
      aiMatchThreshold: Number(form.aiMatchThreshold),
      applicationDeadline: form.applicationDeadline || undefined,
    };

    try {
      if (isEdit) {
        await updateJob(id, payload);
      } else {
        await createJob(payload);
      }
      navigate("/company/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save job.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {isEdit && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
          Editing an approved job will resend it for admin approval.
        </div>
      )}

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Job Details</h3>
        <div className="space-y-4">
          <Input
            label="Job Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <Textarea
            label="Description"
            rows={5}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              required
            />
            <Select
              label="Job Type"
              value={form.jobType}
              onChange={(e) => handleChange("jobType", e.target.value)}
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Requirements</h3>
        <div className="space-y-4">
          <Input
            label="Required Skills (comma separated)"
            value={form.requiredSkills}
            onChange={(e) => handleChange("requiredSkills", e.target.value)}
            placeholder="React, Node.js, MongoDB"
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Minimum CGPA"
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={form.minimumCGPA}
              onChange={(e) => handleChange("minimumCGPA", e.target.value)}
            />
            <Input
              label="AI Match Threshold (%)"
              type="number"
              min="0"
              max="100"
              value={form.aiMatchThreshold}
              onChange={(e) => handleChange("aiMatchThreshold", e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Compensation & Deadline</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Salary Min"
            type="number"
            value={form.salaryMin}
            onChange={(e) => handleChange("salaryMin", e.target.value)}
          />
          <Input
            label="Salary Max"
            type="number"
            value={form.salaryMax}
            onChange={(e) => handleChange("salaryMax", e.target.value)}
          />
          <Input
            label="Application Deadline"
            type="date"
            value={form.applicationDeadline}
            onChange={(e) => handleChange("applicationDeadline", e.target.value)}
          />
        </div>
      </Card>

      <Button type="submit" loading={saving}>
        <Save size={16} /> {isEdit ? "Update Job" : "Post Job"}
      </Button>
    </motion.form>
  );
};

export default CompanyJobForm;