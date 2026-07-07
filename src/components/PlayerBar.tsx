import React from 'react';
// Inline simple icon components to avoid dependency on external '../icons' module

const PlayIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M5 3v18l15-9z"/></svg>
);

const PauseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
);

const VolumeIcon: React.FC<{className?: string; muted?: boolean}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19 8a4 4 0 010 8"/></svg>
);

const StartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12h6"/></svg>
);

const Rewind20Icon = PlayIcon; // not used directly
const Forward20Icon = PlayIcon; // not used directly

const LiveIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg>
);

const ScheduleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
import { Program } from '../types';

// Local TrackInfo fallback: ../types does not export TrackInfo in this project
interface TrackInfo {
    title?: string;
    artist?: string;
    cover?: string;
}

// Local fallback for missing ../utils/schedule module
const images = { default: '/images/default-cover.png' };
const fallbackImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (!target) return;
    if (target.src && !target.src.includes(images.default)) {
        target.src = images.default;
    }
};

interface PlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRewind20: () => void;
  onForward20: () => void;
  onStart: () => void;
  onLive: () => void;
  volume: number;
  muted: boolean;
  onToggleMute: () => void;
  onVolumeChange: (newVolume: number) => void;
  currentTrack: TrackInfo | null;
  currentProgram: Program | null;
  progress: number;
  onOpenSchedule: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  onRewind20,
  onForward20,
  onStart,
  onLive,
  volume,
  muted,
  onToggleMute,
  onVolumeChange,
  currentTrack,
  currentProgram,
  progress,
  onOpenSchedule
}) => {
    // Program type doesn't have a 'name' field; prefer 'title' or fallback to 'description' or any legacy 'desc'
    const programDesc = currentProgram?.description ?? (currentProgram as any)?.desc;
    const displayTitle = currentTrack?.title || currentProgram?.title || programDesc || "Praise FM";
    const displayArtist = currentTrack?.artist || programDesc || "Praise & Worship";
    const displayImage = currentTrack?.cover || (currentProgram as any)?.img || images.default;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] z-50">
      {/* Orange Progress Line (Top Border) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <div 
            className="h-full bg-praise-orange transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 py-2 h-auto md:h-20 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        {/* Left: Show Info */}
        <div className="flex items-center w-full md:w-[280px] shrink-0 gap-3">
            <div className="relative w-12 h-12 shrink-0 group">
                <img 
                    src={displayImage} 
                    alt="Album Art" 
                    className="w-full h-full rounded-full object-cover border border-gray-100 shadow-sm"
                    onError={fallbackImage}
                />
                 {/* Badge com número 3 (era 1) */}
                <div className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    3
                </div>
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="font-extrabold text-sm md:text-base text-gray-900 truncate">
                    {displayTitle}
                </span>
                <span className="text-xs text-gray-500 truncate">
                    {displayArtist}
                </span>
            </div>
        </div>
        {/* Center: Controls */}
        <div className="order-last md:order-none w-full md:flex-1 flex items-center justify-center gap-2 md:gap-6 pb-2 md:pb-0">
            {/* Volume Control Group */}
            <div className="hidden md:flex items-center group relative">
                <button 
                    onClick={onToggleMute}
                    className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors relative z-20"
                    title={muted ? "Unmute" : "Mute"}
                >
                    <VolumeIcon muted={muted} className="w-6 h-6" />
                </button>
                {/* Volume Slider - Appears on Hover */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white shadow-xl border border-gray-100 rounded-full pl-3 pr-4 py-2 w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0 z-10 flex items-center">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                            onVolumeChange(parseFloat(e.target.value));
                        }}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-praise-orange focus:outline-none focus:ring-2 focus:ring-praise-orange/20"
                    />
                </div>
            </div>
            {/* Spacer/Divider could go here */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* START / REWIND GROUP */}
                <button 
                    onClick={onStart}
                    className="flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-black transition-transform active:scale-95"
                    title="Start Over"
                >
                   <StartIcon className="w-6 h-6" />
                   <span className="text-[9px] font-bold mt-[-2px]">START</span>
                </button>
                <button 
                    onClick={onRewind20}
                    className="flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-black transition-transform active:scale-95"
                    title="Rewind 20s"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 1 2.83 5.89" />
                        <path d="M12 8v4l3 3" />
                    </svg>
                    <span className="text-[9px] font-bold mt-[-2px]">20</span>
                </button>
                {/* PLAY/PAUSE (Main Action) */}
                <button 
                    onClick={onTogglePlay}
                    className="w-14 h-14 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95 group"
                >
                    {isPlaying ? (
                        <PauseIcon className="w-6 h-6 fill-current" />
                    ) : (
                        <PlayIcon className="w-6 h-6 fill-current ml-1" />
                    )}
                </button>
                {/* FORWARD / LIVE GROUP */}
                <button 
                    onClick={onForward20}
                    className="flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-black transition-transform active:scale-95"
                    title="Forward 20s"
                >
                     <svg viewBox="0 0 24 24" className="w-6 h-6 scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 1 2.83 5.89" />
                        <path d="M12 8v4l3 3" />
                    </svg>
                    <span className="text-[9px] font-bold mt-[-2px]">20</span>
                </button>
                <button 
                    onClick={onLive}
                    className="flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-400 hover:text-praise-orange transition-colors active:scale-95"
                    title="Go to Live"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a10 10 0 1 0 10 10" strokeOpacity="0.2"/>
                        <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-[9px] font-bold mt-[-2px] text-praise-blue">LIVE</span>
                </button>
            </div>
        </div>
        {/* Right: Tools */}
        <div className="hidden md:flex items-center w-[280px] justify-end gap-2 text-sm font-bold text-gray-800">
             <div className="flex items-center text-praise-blue mr-4">
                 <span className="animate-pulse w-2 h-2 rounded-full bg-praise-blue mr-2"></span>
                 LIVE
             </div>
             <button 
                onClick={onOpenSchedule}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-full transition-colors"
             >
                <ScheduleIcon className="w-5 h-5" />
             </button>
             <button className="px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                1<span className="text-xs align-top">x</span>
             </button>
        </div>
        {/* Mobile Schedule Button */}
        <button 
            onClick={onOpenSchedule}
            className="md:hidden absolute right-4 top-4 p-2"
        >
             <ScheduleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PlayerBar;