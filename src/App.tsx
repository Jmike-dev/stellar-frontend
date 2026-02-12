import { useRoutes } from "react-router";
import "./App.css";
import { routes } from "./routes/routes";
import { Toaster } from "sonner";

function App() {
    const element = useRoutes(routes);
    return (
        <>
            <Toaster position="top-right" richColors />
            {element}
        </>
    );
}

export default App;
