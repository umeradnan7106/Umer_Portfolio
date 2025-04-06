import Contact from "../components/contact";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ContactPage() {
    return (
        <>
        <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
            <div className="pt-24">
                <Contact /> 
            </div>
                <Footer />
        </div>
        </>
    );
}
