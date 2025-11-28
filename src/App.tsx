import { BrowserRouter as Router } from "react-router-dom";
import { Web3Provider } from "./providers/wagmi-provider";
import { renderRoutes } from "./routes/routes";
function App() {
    return (
        <Web3Provider>
            <Router>{renderRoutes()}</Router>
        </Web3Provider>
    );
}

export default App;
