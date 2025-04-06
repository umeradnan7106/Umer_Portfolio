import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Services from "../components/services";

export default function ServicesPage() {
    return (
        <>
            <div className="min-h-screen bg-gray-950 text-white">
                <Navbar />
                <div className="pt-24">
                    <Services />
                </div>
                <Footer />
            </div>
        </>
    );
}   
