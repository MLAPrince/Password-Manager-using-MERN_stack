


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Zap, Lock, Database, Github, Users } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <Navbar />

            <main className="flex-grow px-6 lg:px-16 py-12">
                {/* Header */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-lime-500 mb-4">
                        About MLA Pass
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        MLA Pass is a secure, modern, and minimalistic password manager
                        built with the MERN stack. Designed for simplicity, security, and
                        speed — so you stay in control of your credentials.
                    </p>
                </section>

                {/* Mission */}
                <section className="mb-16 text-center">
                    <h2 className="text-2xl font-semibold mb-3 text-lime-400">
                        Our Mission
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Passwords are the keys to your digital life. MLA Pass ensures you
                        can store and manage them effortlessly without compromising on
                        security or performance. The goal is to make password management
                        lightweight, private, and user-friendly.
                    </p>
                </section>

                {/* Features */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center text-lime-400">
                        Key Features
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <ShieldCheck className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                            <p className="text-gray-400">
                                All passwords are encrypted with AES-256-CBC before storage —
                                ensuring no plain-text leaks.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <Zap className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                            <p className="text-gray-400">
                                Built with React and optimized MongoDB queries for a
                                smooth experience.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <Lock className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Rate Limiting</h3>
                            <p className="text-gray-400">
                                Protects against brute-force attacks with Upstash Redis rate
                                limiting.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <Database className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Reliable Storage</h3>
                            <p className="text-gray-400">
                                Data stored securely in MongoDB with schema validation.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <Github className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Open Development</h3>
                            <p className="text-gray-400">
                                Built with transparency, extensibility, and modern tools in
                                mind.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition">
                            <Users className="w-10 h-10 text-lime-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Multi Accont Ready</h3>
                            <p className="text-gray-400">
                                Supports multiple credentials per site with unique combinations.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="max-w-4xl mx-auto mt-0 text-center">
                    <h2 className="text-2xl font-bold text-lime-400 mb-6">⚙️ Tech Stack</h2>
                    <p className="text-gray-300 mb-6">
                        MLA Pass is built using modern technologies to ensure performance,
                        scalability, and security.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <TechBadge name="React" />
                        <TechBadge name="TailwindCSS" />
                        <TechBadge name="DaisyUI" />
                        <TechBadge name="Framer Motion" />
                        <TechBadge name="Lucide Icons" />
                        <TechBadge name="Node.js" />
                        <TechBadge name="Express.js" />
                        <TechBadge name="MongoDB" />
                        <TechBadge name="Upstash Redis" />
                    </div>
                </section>


                {/* Security Notice */}
                <section className="mb-16 mt-20">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-lime-400">
                        Security First
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-center">
                        Your credentials are encrypted before being sent to the database.
                        Even the app cannot view your original password. Rate limiting
                        prevents abuse, and HTTPS ensures safe data transfer. MLA Pass is
                        designed with security baked into every layer.
                    </p>
                </section>

                {/* Future Improvements */}
                <section className="max-w-4xl mx-auto mt-20 text-center mb-16">
                    <h2 className="text-2xl font-bold text-lime-400 mb-6">
                        🚀 Future Roadmap
                    </h2>
                    <ul className="space-y-4 text-gray-300">
                        <li>🔐 User authentication and login system</li>
                        <li>☁️ Cloud sync across devices</li>
                        <li>📱 Mobile-friendly design</li>
                        <li>🖥️ Browser extension support</li>
                        <li>🔑 Export & import credentials</li>
                        <li>🌙 Dark/light theme toggle</li>
                    </ul>
                </section>

                {/* Call To Action */}
                <section className="text-center bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lime-500/30 transition">
                    <h2 className="text-2xl font-bold mb-3 text-lime-400">
                        Start Securing Your Digital Life
                    </h2>
                    <p className="text-gray-400 mb-4">
                        Use MLA Pass today to keep your passwords safe, secure, and easily
                        accessible when you need them.
                    </p>
                    <a
                        href="/"
                        className="btn bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
                    >
                        {/* Get Started */}
                        Get Started with MLA Pass
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
};
const TechBadge = ({ name }) => (
    <span className="bg-gray-800 text-lime-600 px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-700 transition-all duration-300">
        {name}
    </span>
);

export default AboutPage;
