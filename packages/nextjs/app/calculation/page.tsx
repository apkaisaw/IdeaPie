"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CalculationPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState({
    step1: false,
    step2: false,
    step3: false,
  });
  const [isComplete, setIsComplete] = useState(false);

  // Simulate AI processing with progressive steps
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress((prev) => ({ ...prev, step1: true }));
    }, 3000);

    const timer2 = setTimeout(() => {
      setProgress((prev) => ({ ...prev, step2: true }));
    }, 6000);

    const timer3 = setTimeout(() => {
      setProgress((prev) => ({ ...prev, step3: true }));
    }, 9000);

    const timer4 = setTimeout(() => {
      setIsComplete(true);
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleViewResult = () => {
    router.push("/result");
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
        <h1 className="text-3xl font-bold text-center mb-2">🤖 Generating Fair Contribution...</h1>
        <p className="text-center text-gray-500 mb-8">Step 3/4</p>

        <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-6 mb-8">
          <h2 className="font-medium mb-3">📚 Reference Case in Use:</h2>
          <div className="mb-1">&ldquo;ZeroKnowledge IDE&rdquo; | Split: 20 / 50 / 30</div>
          <div className="text-sm text-gray-500">Context: Web3 IDE built by 3-person team in 36 hrs</div>
          <div className="divider"></div>
          <p className="text-sm">This reference informs the AI&apos;s fairness reasoning.</p>
        </div>

        <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-6">
          <h2 className="font-medium mb-4">🔍 AI Processing:</h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-5 h-5 mr-3 rounded-full ${progress.step1 ? "bg-success" : "bg-base-300/50"}`}>
                {progress.step1 && <span className="text-white flex justify-center">✓</span>}
              </div>
              <div>
                <div className="font-medium">Step 1: Parsing task descriptions</div>
                {progress.step1 && <div className="text-xs text-gray-500 mt-1">Extracted key contribution factors</div>}
              </div>
            </div>

            <div className="flex items-center">
              <div className={`w-5 h-5 mr-3 rounded-full ${progress.step2 ? "bg-success" : "bg-base-300/50"}`}>
                {progress.step2 && <span className="text-white flex justify-center">✓</span>}
              </div>
              <div>
                <div className="font-medium">Step 2: Scoring contributions (scale: 10–100)</div>
                {progress.step2 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Weighted factors based on project context
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className={`w-5 h-5 mt-1 mr-3 rounded-full ${progress.step3 ? "bg-success" : "bg-base-300/50"}`}>
                {progress.step3 && <span className="text-white flex justify-center">✓</span>}
              </div>
              <div>
                <div className="font-medium">Step 3: Calculating Shapley Value split</div>
                {progress.step3 && (
                  <>
                    <div className="text-xs text-gray-500 mt-1">
                      → Marginal value analysis across possible teams
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      → Adjusted via context + fairness heuristics
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleViewResult}
            className={`btn btn-primary btn-lg ${!isComplete && "btn-disabled"}`}
          >
            🎉 View Suggested Allocation →
          </button>
        </div>
      </div>
    </>
  );
};

export default CalculationPage; 