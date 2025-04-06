import About from "../components/about";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function AboutPage() {
    return (
        <>
        <div className="min-h-screen bg-gray-800 text-white">
        <Navbar />
            <div className="pt-24">
                <About />
            </div>
            <Footer />
        </div>
        </>
    );
}
