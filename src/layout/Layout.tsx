import { useState } from "react";
import { layoutPaths, type LayoutPath } from "../constants/layout-path";
import { ROUTERS_PATHS } from "../constants/router-paths";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [activePath, setActivePath] = useState<string>(ROUTERS_PATHS.TRADE);
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 pb-20">
                {children}
            </div>
            {/* Footer Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] px-2 py-3 safe-bottom z-50 mb-[32px]">
                <div className="flex items-center justify-around max-w-md mx-auto">
                    {layoutPaths.map((page: LayoutPath) => {
                        const isActive = activePath === page.path;

                        return (
                            <button
                                key={page.path}
                                onClick={() => setActivePath(page.path)}
                                className="flex flex-col items-center justify-center min-w-[60px] py-1 transition-all">
                                {/* Icon Container */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 transition-all`}>
                                    <img src={page.icon} alt={page.label} className="w-5 h-5" />
                                </div>
                                {/* Label */}
                                <span
                                    className={`
                  text-xs font-medium transition-colors
                  ${isActive ? "text-white" : "text-gray-400"}
                `}>
                                    {page.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Layout;
