import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const statusMap = {
    Applied: "#3B82F6",
    Screening: "#FACC15",
    Technical: "#FB923C",
    HR: "#8B5CF6",
    Offer: "#22C55E",
    Rejected: "#EF4444",
  };

  const fetchJobs = useCallback(async () => {
    try {
      const res = await API.get("/api/jobs");
      setJobs(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Add new job with initial status and date
  const addJob = async () => {
    if (!company || !role) return;
    await API.post("/api/jobs", {
      company,
      role,
      status: "Applied",
      statusHistory: [{ status: "Applied", date: new Date().toISOString() }],
    });
    setCompany("");
    setRole("");
    fetchJobs();
  };

  // Update job status (backend adds date automatically)
  const updateStatus = async (id, status) => {
    await API.put(`/api/jobs/${id}/status`, { status });
    fetchJobs();
  };

  // Delete job
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await API.delete(`/api/jobs/${id}`);
    fetchJobs();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const counts = Object.keys(statusMap).reduce((acc, s) => {
    acc[s] = jobs.filter((j) => j.status === s).length;
    return acc;
  }, {});
  const total = jobs.length || 1;

  const filteredJobs = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase())
  );

  let offset = 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-10 shadow">
        <div className="flex justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold">Job Tracker Dashboard</h1>
            <p className="text-emerald-100">
              Track applications & interview progress
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Applications" value={jobs.length} />
          <StatCard
            title="In Interview"
            value={counts.Screening + counts.Technical + counts.HR}
          />
          <StatCard title="Offers Received" value={counts.Offer} />
          <StatCard title="Rejected" value={counts.Rejected} />
        </div>

        {/* DONUT + ADD */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* DONUT */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <h3 className="font-semibold mb-4">Application Status Overview</h3>

            <svg width="180" height="180" viewBox="0 0 180 180">
              <g transform="translate(90,90) rotate(-90)">
                {Object.keys(statusMap).map((status, i) => {
                  const value = counts[status];
                  const dash = (value / total) * circumference;
                  const circle = (
                    <circle
                      key={i}
                      r={radius}
                      cx="0"
                      cy="0"
                      fill="transparent"
                      stroke={statusMap[status]}
                      strokeWidth="18"
                      strokeDasharray={`${dash} ${circumference}`}
                      strokeDashoffset={-offset}
                    />
                  );
                  offset += dash;
                  return circle;
                })}
              </g>
            </svg>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {Object.keys(statusMap).map((s) => (
                <p key={s} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: statusMap[s] }}
                  ></span>
                  {s}
                </p>
              ))}
            </div>
          </div>

          {/* ADD JOB */}
          <div className="bg-white rounded-xl p-6 shadow md:col-span-2">
            <h3 className="font-semibold mb-4">Add New Job</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
              <input
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={addJob}
                disabled={!company || !role}
                className="bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                + Add Job
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full mb-8"
        />

        {/* JOB CARDS */}
        {filteredJobs.length === 0 ? (
          <p className="text-center text-slate-500">
            No matching jobs found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:border-emerald-400 border transition"
              >
                <h3 className="text-xl font-bold">{job.company}</h3>
                <p className="text-slate-500 text-sm">{job.role}</p>

                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                  className="mt-4 px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${statusMap[job.status]}22`,
                    color: statusMap[job.status],
                  }}
                >
                  {Object.keys(statusMap).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <div className="mt-4 border-l-2 border-slate-200 pl-4 text-xs space-y-2">
                  {job.statusHistory?.map((h, i) => (
                    <div key={i}>
                      <span
                        className="font-semibold"
                        style={{ color: statusMap[h.status] }}
                      >
                        {h.status}
                      </span>
                      <div className="text-slate-400">
                        {h.date ? new Date(h.date).toLocaleString() : "—"}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="mt-4 text-sm border px-4 py-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <p
        className="text-center text-xs pb-6 bg-clip-text text-transparent 
             bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 
             font-medium tracking-wide"
      >
        Built by <span className="font-semibold">Mounika Tulasi</span> | React • Node • MongoDB
      </p>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className="text-3xl font-bold text-emerald-600">{value}</h2>
  </div>
);

export default Dashboard;