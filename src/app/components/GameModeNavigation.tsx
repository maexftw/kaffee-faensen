import React from 'react';

interface GameModeLinkProps {
    label: string;
    active?: boolean;
}

const GameModeLink: React.FC<GameModeLinkProps> = ({ label, active = false }) => (
    <button
        className={`w-full text-left p-2 pl-6 text-sm font-bold uppercase tracking-wide
          ${active ? 'text-white bg-gradient-to-r from-[#ff4e18]/80 to-transparent' : 'text-gray-400 hover:text-white'}
          transition duration-150 focus:outline-none relative`}
    >
        {active && <div className="absolute left-0 top-0 h-full w-1 bg-[#ff4e18]"></div>}
        {label}
    </button>
);

const GameModeNavigation: React.FC = () => (
    <nav className="w-72 flex-shrink-0 flex flex-col pt-36 z-20">
        <div className="relative mb-6">
            <h2 className="text-5xl font-extrabold uppercase text-white tracking-widest pl-6">CONQUEST</h2>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-transparent to-black/60"></div>
            <img
                src="/conquest_bg_placeholder.jpg"
                alt="Conquest Mode Background"
                className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <GameModeLink label="BREAKTHROUGH" />
            <GameModeLink label="KING OF THE HILL" />
            <GameModeLink label="DOMINATION" />
            <GameModeLink label="SQUAD DEATHMATCH" />
            <GameModeLink label="TEAM DEATHMATCH" />
            <GameModeLink label="ESCALATION" />
            <GameModeLink label="RUSH" active={true} />
        </div>
    </nav>
);

export default GameModeNavigation;
