"use client";

import { useState, useEffect } from "react";
import * as backend from "@/lib/backend";

interface MaintenanceData {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  maintenanceEta: number | null;
  contactEmail: string;
}

export default function MaintenancePage() {
  const [data, setData] = useState<MaintenanceData>({
    maintenanceMode: true,
    maintenanceMessage: "We are currently polishing the luminary. Our team is upgrading the platform to deliver a more seamless, high-performance academic experience for our students.",
    maintenanceEta: null,
    contactEmail: "support@collegeblink.com",
  });
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  useEffect(() => {
    if (data.maintenanceEta) {
      const interval = setInterval(() => {
        const now = Date.now();
        const eta = data.maintenanceEta!;
        const diff = eta - now;

        if (diff <= 0) {
          setTimeRemaining("Expected to be back soon");
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          if (hours > 0) {
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
          } else if (minutes > 0) {
            setTimeRemaining(`${minutes}m ${seconds}s`);
          } else {
            setTimeRemaining(`${seconds}s`);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data.maintenanceEta]);

  const fetchMaintenanceData = async () => {
    try {
      const result = await backend.getMaintenanceSettings();
      if (result) {
        setData({
          maintenanceMode: result.maintenanceMode,
          maintenanceMessage: result.maintenanceMessage,
          maintenanceEta: result.maintenanceEta ? new Date(result.maintenanceEta).getTime() : null,
          contactEmail: result.contactEmail,
        });
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatEta = (timestamp: number | null) => {
    if (!timestamp) return "Today at 18:00 UTC";
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      
      <header className="fixed top-0 w-full z-50 flex justify-center items-center h-16 px-6 bg-[#131313]">
        <div className="text-2xl font-black bg-gradient-to-br from-[#ffb693] to-[#ff6b00] bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          CollegeBlink
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center px-4 pt-16 pb-24 bg-glow-radial">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-4 bg-[#ff6b00]/20 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1c1b1b] shadow-2xl">
              <img 
                alt="Abstract 3D luminary" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgeuk9PRVR-QdvEegRJs-SM3NM10TvPl4Z5LiwR67-wwkKnAH2s8NObEycVz0ObQ18HolL9NXE_O8zgYao4nl3XyJhYzWvj4qRbCRLZwtvVOLTGRRxdRm4TFPO-R889775LYCU7AHV0Kms42HzHcM1MMMR1RdpMCjCOBulK1bGqForkn-llWzcbWI3umovQlN8qzruAYdavX2rkkEU0UqAZgbQgqVEWsDdcld5d-jHB0cxpqxHAo1JQwm2TPX1LVBnc55CdkuWDHXJ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
            </div>
            
            
            <div className="absolute top-6 left-6 px-4 py-2 bg-[#059eff]/20 backdrop-blur-md rounded-full">
              <span className="text-[#9ccaff] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse"></span>
                Upgrading Systems
              </span>
            </div>
          </div>

          
          <div className="space-y-8 order-1 md:order-2">
            <div className="glass-card-maintenance p-8 md:p-12 rounded-xl shadow-2xl border border-[#5a4136]/15">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#e5e2e1] mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Under <span className="bg-gradient-to-r from-[#ffb693] to-[#ff6b00] bg-clip-text text-transparent">Maintenance</span>
              </h1>
              <p className="text-[#e2bfb0] text-lg leading-relaxed mb-8">
                {data.maintenanceMessage}
              </p>
              
              <div className="space-y-6">
                
                <div className="flex items-center gap-4 bg-[#1c1b1b] p-4 rounded-lg">
                  <span className="material-symbols-outlined text-[#ff6b00]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#e2bfb0]/60 font-bold">Estimated Uptime</p>
                    <p className="text-[#e5e2e1] font-semibold">{formatEta(data.maintenanceEta)}</p>
                    {data.maintenanceEta && (
                      <p className="text-[#e2bfb0]/60 text-sm font-mono mt-1">{timeRemaining}</p>
                    )}
                  </div>
                </div>

                
                <div className="space-y-4">
                  <button className="w-full py-4 bg-gradient-to-r from-[#ffb693] to-[#ff6b00] text-[#561f00] font-bold rounded-xl glow-hover transition-all duration-300 transform active:scale-95">
                    Notify Me When Back
                  </button>
                  <p className="text-center text-xs text-[#e2bfb0]/40">Join 2,400+ students waiting for the update.</p>
                </div>
              </div>
            </div>

            
            <div className="flex flex-col items-center md:items-start gap-4">
              <p className="text-xs uppercase tracking-widest text-[#e2bfb0]/60 font-bold">Real-time Updates</p>
              <div className="flex gap-6">
                <a className="text-[#e2bfb0] hover:text-[#ffb693] transition-colors flex items-center gap-2 text-sm font-medium" href="#">
                  <span className="material-symbols-outlined text-lg">public</span>
                  Twitter
                </a>
                <a className="text-[#e2bfb0] hover:text-[#ffb693] transition-colors flex items-center gap-2 text-sm font-medium" href="#">
                  <span className="material-symbols-outlined text-lg">camera</span>
                  Instagram
                </a>
                <a className="text-[#e2bfb0] hover:text-[#ffb693] transition-colors flex items-center gap-2 text-sm font-medium" href="#">
                  <span className="material-symbols-outlined text-lg">forum</span>
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>


      
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600&amp;display=swap" rel="stylesheet" />
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
}
