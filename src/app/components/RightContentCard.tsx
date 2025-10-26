import React from 'react';

interface ChallengeProps {
    text: string;
    progress: string;
}

const Challenge: React.FC<ChallengeProps> = ({ text, progress }) => (
    <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-300">{text}</span>
        <span className="text-white font-bold">{progress}</span>
    </div>
);

const RightContentCard: React.FC = () => (
    <div className="w-80 bg-black/70 border border-gray-700 p-4 pt-10 mt-20 mr-4 z-20">
        <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-[#ff4e18] font-bold">BF</span>
            <span className="text-xs text-white font-bold">COMMUNITY UPDATE</span>
        </div>

        <h3 className="text-base font-bold text-white mb-4">Open Beta and the Road to Launch</h3>

        <Challenge text="Get kills within 10 metres with the Assault Class" progress="20/50" />
        <Challenge text="Spot Players with the Recon Kit" progress="88/300" />
        <Challenge text="Reach Career Rank 15" progress="0/1" />

        <div className="flex justify-end mt-4">
            <button className="flex items-center text-xs text-gray-400 hover:text-white uppercase">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                CHALLENGES
            </button>
        </div>
    </div>
);

export default RightContentCard;
