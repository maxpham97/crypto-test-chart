import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const CustomConnectWallet: React.FC = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="p-4 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                                        style={{
                                            background: "linear-gradient(161.2deg, rgba(151, 252, 166, 0.1) -3.56%, rgba(246, 201, 15, 0.1) 107.13%)"
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: "linear-gradient(161.2deg, rgba(151, 252, 166, 1) -3.56%, rgba(246, 201, 15, 1) 107.13%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            }}
                                        >
                                            Connect Wallet
                                        </span>
                                    </button>
                                );
                            }

                            return (
                                <button
                                    onClick={openAccountModal}
                                    type="button"
                                    className="p-4 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                                    style={{
                                        background: "linear-gradient(161.2deg, rgba(151, 252, 166, 0.1) -3.56%, rgba(246, 201, 15, 0.1) 107.13%)"
                                    }}
                                >
                                    <span
                                        style={{
                                            background: "linear-gradient(161.2deg, rgba(151, 252, 166, 1) -3.56%, rgba(246, 201, 15, 1) 107.13%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {account.displayName}
                                    </span>
                                </button>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default CustomConnectWallet;