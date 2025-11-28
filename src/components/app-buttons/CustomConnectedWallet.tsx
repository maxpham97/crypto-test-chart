import { useDisconnect } from "wagmi";
import { shortenAddress } from "../../utils/utils";

interface CustomConnectedWalletProps {
    address: string;
}
const CustomConnectedWallet: React.FC<CustomConnectedWalletProps> = ({ address }) => {
    const { disconnect } = useDisconnect();

    const handleDisconnect = () => {
        disconnect();
    };
    return (
        <button
            onClick={handleDisconnect}
            className="p-4 rounded-xl font-medium text-sm"
            style={{ background: "linear-gradient(161.2deg, rgba(151, 252, 166, 0.1) -3.56%, rgba(246, 201, 15, 0.1) 107.13%)" }}>
            <span
                style={{
                    background: "linear-gradient(161.2deg, rgba(151, 252, 166, 1) -3.56%, rgba(246, 201, 15, 1) 107.13%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                {shortenAddress(address)}
            </span>
        </button>
    );
};

export default CustomConnectedWallet;
