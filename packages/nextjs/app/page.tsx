"use client";

import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  return (
    <>
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="flex items-center justify-center py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-3">
                <Image 
                  src="/title.png" 
                  alt="IDEA PIE" 
                  width={250} 
                  height={80} 
                  priority
                />
              </div>
              <h2 className="text-2xl font-medium opacity-80 max-w-2xl mx-auto">
                AI-Powered, Blockchain-Backed Fair Bonus Allocator
              </h2>
            </div>
            
            <p className="text-xl leading-relaxed max-w-xl mx-auto mb-4">
              Empower your team to split rewards fairly and verifiably 
              with the help of AI and blockchain.
            </p>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-6 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-3xl mx-auto">
            {[
              { icon: "🧠", title: "Analyze with AI Agent", desc: "Powered by the smartest LLMs", color: "primary" },
              { icon: "⚖️", title: "Rooted in Shapley Value", desc: "Based on proven economic principles", color: "secondary" },
              { icon: "🔗", title: "Verifiable on-chain", desc: "Transparent and immutable records", color: "success" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full bg-${feature.color} flex items-center justify-center text-${feature.color}-content mb-2`}>
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-center opacity-75 max-w-xs text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={() => router.push('/input-team')}
              className="btn btn-primary btn-lg px-8 text-lg font-bold"
            >
              🔄 Start Splitting the Pie
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
