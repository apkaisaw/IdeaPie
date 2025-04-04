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
  walletAddress: string;
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
      walletAddress: "",
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
        walletAddress: "",
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

  const isValidEthereumAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isFormValid = (): boolean => {
    return (
      !!projectName.trim() && 
      teamMembers.every(m => 
        m.name.trim() && 
        isValidEthereumAddress(m.walletAddress)
      )
    );
  };

  return (
    <>
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          backgroundImage: 'url(/background2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-2">👥 Team Contribution Info</h1>
        <p className="text-center text-gray-500 mb-6">Step 1/4</p>

        <div className="space-y-6">
          <div>
            <label className="label">Project Name:</label>
            <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-4">
              <input
                type="text"
                className="input input-bordered w-full bg-transparent backdrop-blur-sm"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
          </div>

          <div>
            <label className="label">Project Summary:</label>
            <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-4">
              <textarea
                className="textarea textarea-bordered w-full bg-transparent backdrop-blur-sm"
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                placeholder="A zk-based decentralized identity platform..."
                rows={1}
              />
            </div>
          </div>

          <div>
            <label className="label">Team Members:</label>
            {teamMembers.map((member) => (
              <div key={member.id} className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md mb-4 p-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="label text-sm">Name:</label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-transparent backdrop-blur-sm"
                      value={member.name}
                      onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="label text-sm">Hours:</label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-transparent backdrop-blur-sm"
                      value={member.hours || ""}
                      onChange={(e) => updateTeamMember(member.id, "hours", Number(e.target.value))}
                      placeholder="Hours worked"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="label text-sm">Wallet Address:</label>
                  <input
                    type="text"
                    className={`input input-bordered w-full bg-transparent backdrop-blur-sm font-mono text-sm ${member.walletAddress && !isValidEthereumAddress(member.walletAddress) ? 'input-error' : ''}`}
                    value={member.walletAddress}
                    onChange={(e) => updateTeamMember(member.id, "walletAddress", e.target.value)}
                    placeholder="0x..."
                  />
                  {member.walletAddress && !isValidEthereumAddress(member.walletAddress) && (
                    <p className="text-xs text-error mt-1">请输入有效的以太坊地址 (0x + 40个十六进制字符)</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="label text-sm">Role:</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-transparent backdrop-blur-sm"
                    value={member.role}
                    onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                    placeholder="Frontend, Backend, Designer, etc."
                  />
                </div>
                <div className="mb-2">
                  <label className="label text-sm">Task:</label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-transparent backdrop-blur-sm"
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
          <Link href="/" className="btn btn-accent">
            ← Back
          </Link>
          <button 
            onClick={handleNext}
            className="btn btn-primary"
            disabled={!isFormValid()}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default InputTeamPage; 