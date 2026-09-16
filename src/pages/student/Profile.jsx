import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save } from "lucide-react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { getMyProfile, updateMyProfile } from "../../services/studentService";

const emptyProject = { title: "", description: "", technologies: "", githubLink: "", liveLink: "" };

const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    phone: "",
    skills: "",
    education: { college: "", degree: "", branch: "", cgpa: "", graduationYear: "" },
    projects: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyProfile();
        const p = res.data.profile;
        setForm({
          phone: p.phone || "",
          skills: (p.skills || []).join(", "),
          education: {
            college: p.education?.college || "",
            degree: p.education?.degree || "",
            branch: p.education?.branch || "",
            cgpa: p.education?.cgpa ?? "",
            graduationYear: p.education?.graduationYear ?? "",
          },
          projects: (p.projects || []).map((proj) => ({
            title: proj.title || "",
            description: proj.description || "",
            technologies: (proj.technologies || []).join(", "),
            githubLink: proj.githubLink || "",
            liveLink: proj.liveLink || "",
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleEducationChange = (field, value) =>
    setForm({ ...form, education: { ...form.education, [field]: value } });

  const handleProjectChange = (index, field, value) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  const addProject = () =>
    setForm({ ...form, projects: [...form.projects, { ...emptyProject }] });

  const removeProject = (index) =>
    setForm({ ...form, projects: form.projects.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        phone: form.phone,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        education: {
          ...form.education,
          cgpa: form.education.cgpa ? Number(form.education.cgpa) : undefined,
          graduationYear: form.education.graduationYear
            ? Number(form.education.graduationYear)
            : undefined,
        },
        projects: form.projects.map((p) => ({
          ...p,
          technologies: p.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        })),
      };
      await updateMyProfile(payload);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile.");
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
      {message && (
        <div className="rounded-xl border border-accent-400/30 bg-accent-500/10 px-4 py-3 text-sm text-accent-300">
          {message}
        </div>
      )}

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Basic Info</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
          />
          <Input
            label="Skills (comma separated)"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Education</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="College"
            value={form.education.college}
            onChange={(e) => handleEducationChange("college", e.target.value)}
          />
          <Input
            label="Degree"
            value={form.education.degree}
            onChange={(e) => handleEducationChange("degree", e.target.value)}
          />
          <Input
            label="Branch"
            value={form.education.branch}
            onChange={(e) => handleEducationChange("branch", e.target.value)}
          />
          <Input
            label="CGPA"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={form.education.cgpa}
            onChange={(e) => handleEducationChange("cgpa", e.target.value)}
          />
          <Input
            label="Graduation Year"
            type="number"
            value={form.education.graduationYear}
            onChange={(e) => handleEducationChange("graduationYear", e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">Projects</h3>
          <Button type="button" variant="secondary" size="sm" onClick={addProject}>
            <Plus size={16} /> Add Project
          </Button>
        </div>

        {form.projects.length === 0 && (
          <p className="text-sm text-white/40">No projects added yet.</p>
        )}

        <div className="space-y-5">
          {form.projects.map((project, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <button
                type="button"
                onClick={() => removeProject(i)}
                className="absolute right-3 top-3 text-white/30 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(i, "title", e.target.value)}
                />
                <Input
                  label="Technologies (comma separated)"
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(i, "technologies", e.target.value)}
                />
                <Input
                  label="GitHub Link"
                  value={project.githubLink}
                  onChange={(e) => handleProjectChange(i, "githubLink", e.target.value)}
                />
                <Input
                  label="Live Link"
                  value={project.liveLink}
                  onChange={(e) => handleProjectChange(i, "liveLink", e.target.value)}
                />
              </div>
              <div className="mt-3">
                <Input
                  label="Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(i, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button type="submit" loading={saving}>
        <Save size={16} /> Save Profile
      </Button>
    </motion.form>
  );
};

export default StudentProfile;