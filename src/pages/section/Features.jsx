import Image from "next/image";

const features = [
  {
    title: "Direct Farmer-to-Business Trade",
    description: "Eliminate middlemen and connect farmers directly with businesses for better pricing and transparency.",
    icon: (
      <svg className="w-12 h-12 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12L12 2L22 12H18V20H6V12H2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fresh & Quality Assured",
    description: "Every product is sourced directly from farms, ensuring freshness, traceability, and high standards.",
    icon: (
      <svg className="w-12 h-12 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L12 3L21 12H16V21H8V12H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fair Pricing for All",
    description: "Farmers get competitive prices while businesses access affordable, top-quality produce.",
    icon: (
      <svg className="w-12 h-12 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Seamless Logistics & Payments",
    description: "Integrated delivery and secure payments streamline transactions for both farmers and businesses.",
    icon: (
      <svg className="w-12 h-12 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="py-16 text-primary flex flex-col items-center">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold">Why Choose Us?</h2>
        <p className="mt-4 ">
          A smarter, fairer way to connect farmers and businesses, ensuring fresh, high-quality produce at fair prices.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 px-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-primary/10 rounded-lg shadow-md flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 ">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
