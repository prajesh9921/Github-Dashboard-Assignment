
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SearchPage from "./pages/SearchPage";
import UserSearchPage from "./pages/UserSearchPage";
import RepositoryPage from "./pages/RepositoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import IssuesPage from "./pages/IssuesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user" element={<UserSearchPage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
            <Route path="/repository/:owner/:name" element={<RepositoryPage />} />
            <Route path="/repository/:owner/:name/issues" element={<IssuesPage />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

export default App;
