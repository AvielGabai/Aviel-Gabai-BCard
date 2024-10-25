import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-primary-900 dark:text-gray-200">
                    404
                </h1>
                <p className="text-2xl font-semibold text-primary-800 dark:text-gray-300 mt-4">
                    Oops! Page not found.
                </p>
                <p className="text-lg text-primary-600 dark:text-gray-400 mt-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link to="/">
                    <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg shadow-md focus:ring-4 focus:ring-primary-300 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
