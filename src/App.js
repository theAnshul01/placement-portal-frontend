import Layout from "./components/layouts/Layout";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <Layout>
      <div className="font-merriweather">
      <AppRoutes/>
      </div>
    </Layout>
  );
}

export default App;
