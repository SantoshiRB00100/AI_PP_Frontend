import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-base-950">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
  </div>
);

export default PublicLayout;
