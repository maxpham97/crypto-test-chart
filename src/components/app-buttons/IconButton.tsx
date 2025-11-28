type IconButtonProps = {
    icon: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    size?: "sm" | "md" | "lg";
};

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, active = false, size = "md" }) => {
    const sizeClasses = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";

    return (
        <button
            onClick={onClick}
            className={`
          ${sizeClasses}
          flex items-center justify-center
          rounded-xl
          bg-[#222222]
          hover:bg-[#222]
          ${active ? "ring-2 ring-green-500" : ""}
          transition
        `}>
            {icon}
        </button>
    );
};
