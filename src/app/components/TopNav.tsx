import React from 'react';

const TopNav: React.FC = () => (
    <header className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent text-white">
        <div className="flex items-center space-x-8">
            <div className="flex items-center">
                <div className="bg-[#ff4e18] p-1.5 mr-1">
                    <span className="text-sm font-extrabold tracking-widest leading-none">BF</span>
                </div>
                <span className="text-xl font-extrabold tracking-widest">6</span>
                <span className="ml-4 text-sm font-semibold text-gray-400">OPEN BETA</span>
            </div>
            <nav className="flex space-x-8 text-sm font-semibold uppercase tracking-wide">
                <a href="#" className="flex items-center text-white border-b-2 border-[#ff4e18] pb-1 transition duration-150">
                    SPIELEN
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-150">
                    LOADOUTS
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-150">
                    CHALLENGES
                </a>
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            {/* Icons */}
            <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">R1</span>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012 14v.5a1 1 0 001 1h14a1 1 0 001-1V14a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">R2</span>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 7.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793z"></path></svg>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-500 cursor-pointer flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.61-1.56-2.99 0a1.532 1.532 0 00-2.51-.657 1.532 1.532 0 00-2.51-.657zM9.05.932a1 1 0 011.9 0l.963 1.838a6.007 6.007 0 004.532 2.597l2.028.271c1.076.144 1.076 1.625 0 1.769l-2.028.271a6.007 6.007 0 00-4.532 2.597L10.95 18.068a1 1 0 01-1.9 0L8.087 16.23a6.007 6.007 0 00-4.532-2.597l-2.028-.271c-1.076-.144-1.076-1.625 0-1.769l2.028-.271a6.007 6.007 0 004.532-2.597L9.05.932z" clipRule="evenodd"></path></svg>
            </div>
            <div className="bg-[#ff4e18] px-3 py-1 text-sm font-bold">8</div>
            <div className="bg-[#ff4e18] px-3 py-1 text-sm font-bold">2</div>
        </div>
    </header>
);

export default TopNav;
