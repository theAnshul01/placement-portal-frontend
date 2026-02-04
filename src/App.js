import Layout from "./components/layouts/Layout";
import SessionExpiredBanner from "./components/SessionExpiredBanner";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
    <SessionExpiredBanner/>
    <Layout>
      <div className="font-merriweather">
      <AppRoutes/>
      </div>
    </Layout>
    </>
  );
}

export default App;
