export default function Itinerary() {



    return (
        <>
            {/* 🗓️ Itinerary Section */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
                    Trek Itinerary
                    <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "AC Traveller Ride",
                            desc: "Comfortable AC bus from Bhopal to Bhojpur ensuring a relaxed and scenic journey.",
                            icon: "🚌",
                        },

                        {
                            title: "Sightseeing & Exploration",
                            desc: "Explore Bhojpur’s ancient temple and scenic trails as per the planned route.",
                            icon: "🗺️",
                        },
                        {
                            title: "Breakfast at Bhojpur",
                            desc: "Start your day with a delicious complimentary breakfast amidst serene surroundings.",
                            icon: "🍛",
                        },
                        {
                            title: "Fun Games & Group Activities",
                            desc: "Bond with fellow trekkers through fun games along the travel and team-building sessions.",
                            icon: "🎯",
                        },
                        {
                            title: "Refreshing Drinks at Trek",
                            desc: "Stay energized with cool refreshments and light snacks at the trek location.",
                            icon: "🥤",
                        },
                        {
                            title: "Summit",
                            desc: "Capture unforgettable moments at the breathtaking summit — the perfect spot for stunning selfies and scenic views!",
                            icon: "🏞️",
                        },
                        {
                            title: "Maggie by the Riverside (Seasonal)",
                            desc: "Enjoy a comforting bowl of maggie with a riverside view — a trekker’s delight!",
                            icon: "🍜",
                        },
                        {
                            title: "Delicious Unlimited Meal (with meal plan)",
                            desc: "Relish a hearty, homely meal at a traditional dhaba — the perfect energy boost during your journey!",
                            icon: "🍽️",
                        },
                        {
                            title: "Back to Bhopal",
                            desc: "Comfortable return journey back to Bhopal after the event.",
                            icon: "🚌",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-3xl bg-gradient-to-br from-orange-300 to-amber-200 rounded-full p-3">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}