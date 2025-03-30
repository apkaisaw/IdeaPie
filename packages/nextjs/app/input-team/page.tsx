"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  hours: number;
  task: string;
}

const InputTeamPage = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>("");
  const [projectSummary, setProjectSummary] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "",
      role: "",
      hours: 0,
      task: "",
    },
  ]);

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: Date.now().toString(),
        name: "",
        role: "",
        hours: 0,
        task: "",
      },
    ]);
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string | number) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const removeTeamMember = (id: string) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  const handleNext = () => {
    // Save data to context or state management
    // For now, just navigate to next page
    router.push("/reference-case");
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">👥 Team Contribution Info</h1>
      <p className="text-center text-gray-500 mb-6">Step 1/4</p>

      <div className="space-y-6">
        <div>
          <label className="label">Project Name:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="label">Project Summary:</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={projectSummary}
            onChange={(e) => setProjectSummary(e.target.value)}
            placeholder="A zk-based decentralized identity platform..."
            rows={3}
          />
        </div>

        <div>
          <label className="label">Team Members:</label>
          {teamMembers.map((member) => (
            <div key={member.id} className="card bg-base-200 shadow-md mb-4 p-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="label text-sm">Name:</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={member.name}
                    onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="label text-sm">Hours:</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={member.hours || ""}
                    onChange={(e) => updateTeamMember(member.id, "hours", Number(e.target.value))}
                    placeholder="Hours worked"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="label text-sm">Role:</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={member.role}
                  onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                  placeholder="Frontend, Backend, Designer, etc."
                />
              </div>
              <div className="mb-2">
                <label className="label text-sm">Task:</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={member.task}
                  onChange={(e) => updateTeamMember(member.id, "task", e.target.value)}
                  placeholder="Describe their contribution"
                  rows={2}
                />
              </div>
              {teamMembers.length > 1 && (
                <button 
                  className="btn btn-sm btn-error self-end"
                  onClick={() => removeTeamMember(member.id)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="btn btn-outline w-full"
            onClick={addTeamMember}
          >
            + Add Member
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Link href="/" className="btn">
          ← Back
        </Link>
        <button 
          onClick={handleNext}
          className="btn btn-primary"
          disabled={!projectName.trim() || teamMembers.some(m => !m.name.trim())}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default InputTeamPage; 