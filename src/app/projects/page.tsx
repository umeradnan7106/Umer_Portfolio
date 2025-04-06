import Projects from "../components/project";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ProjectsPage() {
    return (
        <>
            <div className="min-h-screen bg-gray-800 text-white">
                <Navbar />
                <div className="pt-24">
                    <Projects />
                </div>
                <Footer />
            </div>
        </>
    );
}

