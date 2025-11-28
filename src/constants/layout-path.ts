import eggIcon from "../assets/icons/layout-icons/egg_icon.svg";
import positionIcon from "../assets/icons/layout-icons/postition_icon.svg";
import profileIcon from "../assets/icons/layout-icons/profile_icon.svg";
import tradeIcon from "../assets/icons/layout-icons/trade_icon.svg";
import { ROUTERS_PATHS } from "./router-paths";

export type LayoutPath = {
    icon: string;
    label: string;
    path: string;
};

export const layoutPaths: LayoutPath[] = [
    {
        icon: tradeIcon,
        label: "Trade",
        path: ROUTERS_PATHS.TRADE,
    },
    {
        icon: positionIcon,
        label: "Positions",
        path: ROUTERS_PATHS.POSITIONS,
    },
    {
        icon: eggIcon,
        label: "Rewards",
        path: ROUTERS_PATHS.REWARDS,
    },
    {
        icon: profileIcon,
        label: "Profile",
        path: ROUTERS_PATHS.PROFILE,
    },
];
