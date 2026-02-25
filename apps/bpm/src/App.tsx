import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { QueryProvider } from "@workspace/shared/query";
import { I18nextProvider, i18n } from "@workspace/shared/i18n";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { allRoutes } from "./routes";
import "./styles/globals.css";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <BrowserRouter basename="/bpm">
          <NuqsAdapter>
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
          </NuqsAdapter>
        </BrowserRouter>
      </QueryProvider>
    </I18nextProvider>
  );
}

export default App;
