
const companies = [
    { name: "Accenture", logo: "/logos/accenture.svg" },
    { name: "Airbnb", logo: "/logos/airbnb.svg" },
    { name: "Apple", logo: "/logos/apple.svg" },
    { name: "BMW", logo: "/logos/bmw.svg" },
    { name: "Bosch", logo: "/logos/bosch.svg" },
    { name: "Cisco", logo: "/logos/cisco.svg" },
    { name: "Goldman Sachs", logo: "/logos/goldmansachs.svg" },
    { name: "Google", logo: "/logos/google.svg" },
    { name: "HCL", logo: "/logos/hcl.svg" },
    { name: "Infosys", logo: "/logos/infosys.svg" },
    { name: "Intel", logo: "/logos/intel.svg" },
    { name: "Mastercard", logo: "/logos/mastercard.svg" },
    { name: "Meta", logo: "/logos/meta.svg" },
    { name: "Netflix", logo: "/logos/netflix.svg" },
    { name: "Nvidia", logo: "/logos/nvidia.svg" },
    { name: "Paypal", logo: "/logos/paypal.svg" },
    { name: "SAP", logo: "/logos/sap.svg" },
    { name: "Siemens", logo: "/logos/siemens.svg" },
    { name: "Spotify", logo: "/logos/spotify.svg" },
    { name: "Stripe", logo: "/logos/stripe.svg" },
    { name: "TCS", logo: "/logos/tcs.svg" },
    { name: "Tesla", logo: "/logos/tesla.svg" },
    { name: "Toyota", logo: "/logos/toyota.svg" },
    { name: "Uber", logo: "/logos/uber.svg" },
    { name: "Visa", logo: "/logos/visa.svg" },
    { name: "Wipro", logo: "/logos/wipro.svg" }
]

const RecruitersMarquee = () => {

    const duplicated = [...companies, ...companies]

    return (
        <div className="py-8 mb-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">

            <h2 className="text-center text-3xl font-bold mb-16 dark:text-gray-100">
                Our Top Recruiters
            </h2>

            <div className="relative w-full overflow-hidden">


                <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-gray-800 z-10"></div>


                <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-gray-800 z-10"></div>

                <div className="flex gap-12 animate-marquee whitespace-nowrap w-max will-change-transform hover:[animation-play-state:paused]">

                    {duplicated.map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow-sm flex-shrink-0"
                        >
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-8 w-8 object-contain"
                            />

                            <p className="text-gray-700 dark:text-gray-100 font-medium">
                                {company.name}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default RecruitersMarquee