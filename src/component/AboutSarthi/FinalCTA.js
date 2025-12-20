import { ArrowRight, Heart } from 'lucide-react';

function FinalCTA() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-300">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Become a Saarthi Today
                </h2>

                <p className="text-xl sm:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto">
                    Be the reason an elder travels with confidence again.
                    <span className="block mt-2">Join us in making every journey meaningful.</span>
                </p>

                <a
                    href="/Career/Sarthi/Register"
                    className="group bg-white text-orange-600 px-10 py-5 rounded-xl font-bold  text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                >
                    Apply to Become a Saarthi
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>


            </div>
        </section>
    );
}

export default FinalCTA;
