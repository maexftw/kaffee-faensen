import React from 'react';
import TopNav from './components/TopNav';
import GameModeNavigation from './components/GameModeNavigation';
import RightContentCard from './components/RightContentCard';

const GeneratedDesign: React.FC = () => {
    return (
        <div className="relative flex h-screen w-screen bg-black overflow-hidden font-sans">
            {/* Main Background Image - Note: User must provide this file in the public folder */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/bf6_lobby_bg.jpg')` }}
            >
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <TopNav />
            <div className="flex flex-grow justify-between relative z-10">
                <GameModeNavigation />
                <div className="flex flex-col items-end">
                    {/* Placeholder for the large CONQUEST image/text area that is part of the background art */}
                    <div className="w-64 h-52 mt-28 mr-10">
                        <img
                            src="/conquest_art_placeholder.png"
                            alt="Conquest Art"
                            className="w-full h-full object-cover opacity-0"
                            />
                    </div>
                    <RightContentCard />
                </div>
            </div>
        </div>
    );
};

export default GeneratedDesign;
