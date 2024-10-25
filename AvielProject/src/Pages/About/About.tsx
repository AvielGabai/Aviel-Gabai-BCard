const About = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen gap-8 p-6 pt-20 bg-primary-50 text-primary-900 dark:bg-gray-700 dark:text-white transition-colors duration-300">
            <div className="max-w-4xl">
                <h1 className="mt-5 mb-4 text-3xl font-extrabold text-center">
                    About Us
                </h1>
                <p className="mb-8 text-xl text-center">
                    Your ultimate solution for creating, browsing, and managing business cards with ease.
                    Our innovative platform is designed to cater to professionals and businesses of all sizes,
                    offering a seamless and efficient way to handle all your business card needs.
                </p>

                <h1 className="mt-5 mb-4 text-3xl font-extrabold text-center">
                    Our Mission
                </h1>
                <p className="mb-8 text-xl text-center">
                    We strive to simplify the way you network and manage your professional connections.
                    Our mission is to provide a user-friendly, powerful tool that helps you create stunning
                    business cards, efficiently manage your contacts, and enhance your professional presence.
                </p>

                <h1 className="mt-5 mb-4 text-3xl font-extrabold text-center">
                    What We Offer
                </h1>
                <p className="mb-8 text-xl text-center">
                    <span className="font-semibold">Create:</span> Design unique and professional business cards effortlessly with our intuitive creation tools.
                    Choose from a variety of templates, customize every detail, and ensure your business card stands out.
                </p>

                <h1 className="mt-5 mb-4 text-3xl font-extrabold text-center">
                    Browse
                </h1>
                <p className="mb-8 text-xl text-center">
                    Explore a wide range of business cards within our app. Find inspiration, discover new contacts, and
                    connect with professionals from various industries.
                </p>
            </div>
        </div>
    );
};

export default About;
