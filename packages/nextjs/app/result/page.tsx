"use client";

import { useState } from "react";
import Link from "next/link";

interface TeamMember {
  name: string;
  percentage: number;
  rating: number; // 1-5
}

const ResultPage = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [recordingOnChain, setRecordingOnChain] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [txHash, setTxHash] = useState("");

  // Mock data - in a real app, this would come from context/state
  const projectName = "zkID Platform";
  const teamMembers: TeamMember[] = [
    { name: "Alice", percentage: 38.5, rating: 4 },
    { name: "Bob", percentage: 41.2, rating: 5 },
    { name: "Charlie", percentage: 20.3, rating: 2 },
  ];

  const handleRecordOnChain = () => {
    setRecordingOnChain(true);
    // Simulate blockchain transaction
    setTimeout(() => {
      setRecordingOnChain(false);
      setRecorded(true);
      setTxHash("0x3faE...D9e7");
    }, 2000);
  };

  const handleExportJSON = () => {
    const data = {
      project: projectName,
      timestamp: new Date().toISOString(),
      distribution: teamMembers.map(member => ({
        name: member.name,
        percentage: member.percentage,
      })),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, "-").toLowerCase()}-distribution.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderRatingCircles = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`inline-block w-4 h-4 rounded-full ${i < rating ? "bg-yellow-400" : "bg-gray-200"}`} />
      ));
  };

  if (recorded) {
    return (
      <>
        <div 
          className="fixed inset-0 -z-10" 
          style={{ 
            backgroundImage: 'url(/background3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="container mx-auto max-w-2xl py-8 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">✅ All Set!</h1>
          <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-8 rounded-3xl">
            <p className="mb-4">Your contribution record is now published on-chain.</p>

            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-6 border border-base-300">
              <div className="font-mono mb-1">🔗 Record ID: {txHash}</div>
            </div>

            <p className="mb-6">📤 Share this with your team or DAO for transparency</p>

            <div className="flex justify-center space-x-3 mb-8">
              <button className="btn btn-sm btn-outline rounded-full" onClick={() => navigator.clipboard.writeText(txHash)}>
                🔗 Copy Link
              </button>
              <button className="btn btn-sm btn-outline rounded-full">↗ View on Explorer</button>
            </div>

            <Link href="/" className="btn btn-primary rounded-full">
              🔁 Start a New Split
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          backgroundImage: 'url(/background3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🍰 Suggested Bonus Split</h1>
        <p className="text-center text-gray-500 mb-6">Step 4/4</p>

        <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-6 rounded-3xl">
          <div className="text-center mb-4">🎉 Based on your input and AI reasoning, here&apos;s the result:</div>

          <div className="divider"></div>

          <div className="text-xl font-medium mb-4">Project: {projectName}</div>

          <div className="space-y-4 mb-6">
            {teamMembers.map(member => (
              <div key={member.name} className="flex justify-between items-center">
                <div className="font-medium w-24">{member.name}:</div>
                <div className="w-20 text-right">{member.percentage}%</div>
                <div className="flex space-x-1">{renderRatingCircles(member.rating)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button className="btn btn-outline rounded-full">📊 View Pie Chart</button>
            <button className="btn btn-outline rounded-full" onClick={() => setShowExplanation(!showExplanation)}>
              🔍 See Explanation
            </button>
          </div>

          {showExplanation && (
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-6 border border-base-300">
              <h3 className="font-medium mb-2">AI Reasoning:</h3>
              <p className="text-sm mb-3">
                The contribution split was determined using Shapley Value calculations, which assess each member&apos;s
                marginal contribution across all possible team combinations.
              </p>
              <p className="text-sm mb-3">
                Bob received the highest allocation due to the critical nature of the backend infrastructure and data
                integration work, which formed the core functionality of the application.
              </p>
              <p className="text-sm">
                Alice&apos;s frontend work was also highly valued, especially the data visualization components that
                significantly enhanced user experience. Charlie&apos;s contributions, while important, had lower marginal
                value in the project&apos;s critical path.
              </p>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-6 border border-base-300">
            <div className="text-center mb-2">🔗 This split will be:</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div>✅</div>
                <div className="text-xs">Immutable</div>
                <div className="text-xs text-gray-500">(stored on-chain)</div>
              </div>
              <div>
                <div>✅</div>
                <div className="text-xs">Verifiable</div>
                <div className="text-xs text-gray-500">(by others)</div>
              </div>
              <div>
                <div>✅</div>
                <div className="text-xs">Reusable</div>
                <div className="text-xs text-gray-500">(as future reference)</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            This result is permanently stored on the Ethereum blockchain, making it transparent and verifiable by all team
            members and stakeholders.
          </div>

          <div className="flex justify-between">
            <button onClick={handleExportJSON} className="btn rounded-full bg-base-300/40 backdrop-blur-md">
              ⬇️ Export as JSON
            </button>

            <button onClick={handleRecordOnChain} disabled={recordingOnChain} className="btn btn-primary rounded-full">
              {recordingOnChain ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Recording...
                </>
              ) : (
                "🪙 Record on-chain"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
