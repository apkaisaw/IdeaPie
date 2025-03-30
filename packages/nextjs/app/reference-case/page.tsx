"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReferenceCase {
  id: string;
  name: string;
  split: string;
  description: string;
}

const SAMPLE_CASES: ReferenceCase[] = [
  {
    id: "case1",
    name: "ZeroKnowledge IDE",
    split: "20 / 50 / 30",
    description: "Web3 IDE built by 3-person team in 36 hrs",
  },
  {
    id: "case2",
    name: "DeSci DAO Tools",
    split: "30 / 30 / 40",
    description: "DAO management tools for science projects",
  },
  {
    id: "case3",
    name: "AI Agents Challenge",
    split: "33 / 33 / 34",
    description: "On-chain AI agent platform for autonomous tasks",
  },
];

const ReferenceCase = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);

  const filteredCases = SAMPLE_CASES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCaseSelection = (caseId: string) => {
    setSelectedCases(prev => {
      if (prev.includes(caseId)) {
        return prev.filter(id => id !== caseId);
      } else {
        return [...prev, caseId];
      }
    });
  };

  const handleContinue = () => {
    // In a real app, would save selected cases to context
    router.push("/calculation");
  };

  const handleSkip = () => {
    router.push("/calculation");
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
        <h1 className="text-3xl font-bold text-center mb-2">📚 Select a Reference Case (Optional)</h1>
        <p className="text-center text-gray-500 mb-6">Step 2/4</p>

        <div className="space-y-6">
          <p className="text-center">
            Choose one or more previous on-chain bonus splits as references.
          </p>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
              <span className="text-xl text-primary font-bold">🔍</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10 bg-white/10 backdrop-blur-md"
              placeholder="Search: zk Hackathons / Web3 Infra"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h2 className="font-medium mb-4">🪙 Public Case Library:</h2>
            <div className="space-y-3">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg cursor-pointer backdrop-blur-sm ${
                    selectedCases.includes(caseItem.id) 
                      ? "border-primary border-2 bg-primary/30 shadow-lg" 
                      : "border-base-300 bg-white/10"
                  }`}
                  onClick={() => toggleCaseSelection(caseItem.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium flex items-center">
                      {selectedCases.includes(caseItem.id) && <span className="inline-block text-white bg-primary px-1.5 py-0.5 rounded-full mr-2 text-sm font-bold">✓</span>}
                      &ldquo;{caseItem.name}&rdquo;
                    </div>
                    <div>Split: {caseItem.split}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {caseItem.description}
                  </div>
                </div>
              ))}

              {filteredCases.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No cases match your search criteria
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link href="/input-team" className="btn btn-accent">
            ← Back
          </Link>
          <div className="space-x-2">
            <button onClick={handleSkip} className="btn btn-secondary bg-secondary/40 backdrop-blur-md rounded-full">
              Skip This Step
            </button>
            <button
              onClick={handleContinue}
              className="btn btn-primary"
              disabled={selectedCases.length === 0}
            >
              → Use Selected Cases
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferenceCase; 