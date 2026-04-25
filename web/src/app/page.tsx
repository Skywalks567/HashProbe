"use client";

import { useState } from "react";
import { Search, Shield, Zap, Info, Terminal, Lock, ChevronRight, Activity } from "lucide-react";

export default function Home() {
  const [hash, setHash] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [crackingIdx, setCrackingIdx] = useState<number | null>(null);
  const [crackResult, setCrackResult] = useState<{ [key: number]: any }>({});

  const handleAnalyze = async () => {
    if (!hash) return;
    setIsAnalyzing(true);
    setResults(null);
    setCrackResult({});
    setCrackingIdx(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/detect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash_value: hash }),
      });

      if (!response.ok) throw new Error("Failed to analyze hash");

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Error connecting to backend API. Make sure the Python server is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCrack = async (index: number, hashType: string) => {
    setCrackingIdx(index);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/crack`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hash_value: hash,
          hash_type: hashType,
          threads: 4
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Cracking failed");
      }

      const data = await response.json();
      setCrackResult(prev => ({ ...prev, [index]: data }));
    } catch (error: any) {
      console.error("Crack error:", error);
      alert(`Cracking failed: ${error.message}`);
    } finally {
      setCrackingIdx(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center glow-blue">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              HashProbe
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">CLI</a>
            <a href="https://github.com/Skywalks567/HashProbe" target="_blank" className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Analyze. Detect. <span className="text-blue-500">Probe.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            High-performance hash identification and testing tool. 
            Smart, fast, and secure.
          </p>
        </div>

        {/* Input Area */}
        <div className="glass p-1.5 mb-12 flex items-center gap-2 focus-within:ring-2 ring-blue-500/50 transition-all">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Terminal className="w-5 h-5 text-blue-500" />
            <input
              type="text"
              placeholder="Paste your hash here (MD5, SHA, NTLM...)"
              className="w-full bg-transparent border-none outline-none text-lg py-3 placeholder:text-gray-600"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !hash}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 px-8 py-3.5 rounded-lg font-bold transition-all flex items-center gap-2"
          >
            {isAnalyzing ? (
              <Activity className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Analyze
          </button>
        </div>

        {/* Results / Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Analysis Results */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" /> Detection Results
                </h3>
                {results && (
                  <span className="text-xs text-gray-500">{results.length} types found</span>
                )}
              </div>

              {!results && !isAnalyzing && (
                <div className="py-12 text-center text-gray-600 border-2 border-dashed border-white/5 rounded-xl">
                  Enter a hash to begin analysis
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-16 bg-white/5 animate-pulse rounded-lg" />
                  ))}
                </div>
              )}

              {results && (
                <div className="space-y-4">
                  {results.map((res, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all cursor-default group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
                            {res.type[0]}
                          </div>
                          <div>
                            <div className="font-bold">{res.type}</div>
                            <div className="text-xs text-gray-500">Confidence Score: {(res.confidence * 100).toFixed(0)}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {res.type !== "Base64 Encoded" && (
                            <button
                              onClick={() => handleCrack(idx, res.type)}
                              disabled={crackingIdx !== null}
                              className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                            >
                              {crackingIdx === idx ? (
                                <Activity className="w-3 h-3 animate-spin" />
                              ) : (
                                <Lock className="w-3 h-3" />
                              )}
                              {crackingIdx === idx ? "Cracking..." : "Crack Hash"}
                            </button>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-all" />
                        </div>
                      </div>

                      {/* Crack Result Area */}
                      {crackResult[idx] && (
                        <div className={`ml-12 p-4 rounded-xl border animate-in slide-in-from-top-2 duration-300 ${crackResult[idx].found ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                          {crackResult[idx].found ? (
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-green-500/20 rounded-lg mt-1">
                                <Shield className="w-4 h-4 text-green-500" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-green-500 uppercase tracking-wider">Success! Password Found</div>
                                <div className="text-xl font-mono font-bold mt-1 text-white">{crackResult[idx].password}</div>
                                <div className="text-xs text-gray-500 mt-2">
                                  Tested {crackResult[idx].attempts.toLocaleString()} words from {crackResult[idx].source}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-red-400 flex items-center gap-2">
                              <Info className="w-4 h-4" />
                              Password not found in wordlist ({crackResult[idx].attempts.toLocaleString()} attempts)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats / Info Sidebar */}
          <div className="space-y-6">
            <div className="glass p-6 border-blue-500/20">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-blue-500" /> Probe Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Mode</span>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-xs font-bold border border-green-500/20">
                    Localhost
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Hardware</span>
                  <span className="text-gray-300">GPU Accelerated</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Threads</span>
                  <span className="text-gray-300">8 Cores</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-lg text-sm font-bold transition-all">
                Settings
              </button>
            </div>

            <div className="glass p-6 bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/10">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Pro Tip</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Use the <code className="bg-black/40 px-1 rounded text-blue-400">--threads</code> flag in CLI for maximum performance on multi-core systems.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 py-12 text-center">
        <p className="text-gray-600 text-sm">
          &copy; 2026 HashProbe Security. Educational purposes only.
        </p>
      </footer>
    </div>
  );
}
