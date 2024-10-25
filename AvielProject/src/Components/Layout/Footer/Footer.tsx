import { useSelector } from "react-redux";
import { TRootState } from "../../../Store/BigPie";
import { FcAbout } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { LiaIdCardSolid } from "react-icons/lia";
import { Button } from "flowbite-react";

const Footer = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);

    return (
        <footer className="sticky bottom-0 left-0 w-full border-t-2 bg-primary-50 border-primary-500 dark:bg-gray-800 dark:border-gray-600">
            <div className="flex items-center justify-evenly p-3 text-lg font-semibold text-black dark:text-white">
                {/* About Button */}
                <Button
                    href="/about"
                    className="!border-none bg-transparent hover:bg-primary-100 dark:hover:bg-gray-700 p-0"
                >
                    <div className="flex flex-col items-center">
                        <FcAbout className="text-2xl" />
                        <span className="text-black dark:text-white">About</span>
                    </div>
                </Button>

                {user && (
                    <>
                        {/* Favorites Button */}
                        <Button
                            href="/favorites"
                            className="!border-none bg-transparent hover:bg-primary-100 dark:hover:bg-gray-700 p-0"
                        >
                            <div className="flex flex-col items-center">
                                <FaHeart className="text-2xl text-primary-500 dark:text-red-400" />
                                <span className="text-black dark:text-white">Favorites</span>
                            </div>
                        </Button>

                        {/* My Cards Button (Only for Business Users) */}
                        {user.isBusiness && (
                            <Button
                                href="/my-cards"
                                className="!border-none bg-transparent hover:bg-primary-100 dark:hover:bg-gray-700 p-0"
                            >
                                <div className="flex flex-col items-center">
                                    <LiaIdCardSolid className="text-2xl text-primary-500 dark:text-yellow-400" />
                                    <span className="text-black dark:text-white">My Cards</span>
                                </div>
                            </Button>
                        )}
                    </>
                )}
            </div>
        </footer>
    );
};

export default Footer;
