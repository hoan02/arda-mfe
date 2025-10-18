import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { QueryProvider } from "@workspace/shared/providers";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { RouterAdapter } from "./common/layouts/RouterAdapter";
import { allRoutes } from "./routes";
import "./styles/globals.css";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter basename="/admin">
        <NuqsAdapter>
          <RouterAdapter>
            <div className="h-full bg-gray-50 flex flex-col">
              <main className="flex-1 overflow-auto p-2">
                <Routes>
                  {allRoutes.map((route: any, index: number) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </main>
              <HotToaster position="top-right" />
            </div>
          </RouterAdapter>
        </NuqsAdapter>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
