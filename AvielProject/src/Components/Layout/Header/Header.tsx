import { useState } from "react";
import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { searchActions } from "../../../Store/SearchSlice";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    };

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b-2 bg-primary-50 text-primary-900 border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <Navbar fluid className="p-4">
                <div className="w-full flex items-center justify-between">
                    {/* Left Section: Brand and Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 font-bold list-none">
                        <Navbar.Brand
                            as={Link}
                            to="/"
                            className="text-2xl font-extrabold"
                        >
                            Aviel
                        </Navbar.Brand>

                        <Navbar.Link as={Link} to="/home" className="font-bold">
                            Home
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/about" className="font-bold">
                            About
                        </Navbar.Link>

                        {user && (
                            <>
                                <Navbar.Link
                                    className="cursor-pointer font-bold"
                                    onClick={logout}
                                >
                                    Sign Out
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/profile" className="font-bold">
                                    Profile
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/favorites" className="font-bold">
                                    Favorites
                                </Navbar.Link>

                                {user.isBusiness && (
                                    <Navbar.Link as={Link} to="/my-cards" className="font-bold">
                                        My Cards
                                    </Navbar.Link>
                                )}
                            </>
                        )}

                        {!user && (
                            <>
                                <Navbar.Link as={Link} to="/signin" className="font-bold">
                                    Sign In
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/signup" className="font-bold">
                                    Sign Up
                                </Navbar.Link>
                            </>
                        )}
                    </div>

                    {/* Right Section: Search, Dark Mode, and Menu Toggle */}
                    <div className="flex items-center space-x-4">
                        {/* Search Input (Desktop Only) */}
                        <div className="relative hidden md:block w-48">
                            <TextInput
                                type="text"
                                placeholder="Search..."
                                className="pr-10" // Add padding to the right for the icon
                                onChange={search}
                            />
                            <BiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Dark Mode Toggle */}
                        <DarkThemeToggle className="hidden md:block" />

                        {/* Menu Toggle Button (Only Icon) */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span> {/* Hide text visually */}
                            <Navbar.Toggle />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <Navbar.Collapse className="md:hidden flex flex-col space-y-4 mt-2 list-none w-full">
                        <Navbar.Link
                            as={Link}
                            to="/home"
                            className="font-bold w-full text-center"
                            onClick={closeMenu}
                        >
                            Home
                        </Navbar.Link>

                        <Navbar.Link
                            as={Link}
                            to="/about"
                            className="font-bold w-full text-center"
                            onClick={closeMenu}
                        >
                            About
                        </Navbar.Link>

                        {user && (
                            <>
                                <Navbar.Link
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="cursor-pointer font-bold w-full text-center"
                                >
                                    Sign Out
                                </Navbar.Link>

                                <Navbar.Link
                                    as={Link}
                                    to="/profile"
                                    className="font-bold w-full text-center"
                                    onClick={closeMenu}
                                >
                                    Profile
                                </Navbar.Link>

                                <Navbar.Link
                                    as={Link}
                                    to="/favorites"
                                    className="font-bold w-full text-center"
                                    onClick={closeMenu}
                                >
                                    Favorites
                                </Navbar.Link>

                                {user.isBusiness && (
                                    <Navbar.Link
                                        as={Link}
                                        to="/my-cards"
                                        className="font-bold w-full text-center"
                                        onClick={closeMenu}
                                    >
                                        My Cards
                                    </Navbar.Link>
                                )}
                            </>
                        )}

                        {!user && (
                            <>
                                <Navbar.Link
                                    as={Link}
                                    to="/signin"
                                    className="font-bold w-full text-center"
                                    onClick={closeMenu}
                                >
                                    Sign In
                                </Navbar.Link>

                                <Navbar.Link
                                    as={Link}
                                    to="/signup"
                                    className="font-bold w-full text-center"
                                    onClick={closeMenu}
                                >
                                    Sign Up
                                </Navbar.Link>
                            </>
                        )}

                        {/* Dark Mode Toggle (Mobile) */}
                        <DarkThemeToggle className="mx-auto" />

                        {/* Search Input (Mobile) */}
                        <div className="relative w-full">
                            <TextInput
                                type="text"
                                placeholder="Search..."
                                className="pr-10"
                                onChange={search}
                            />
                            <BiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </Navbar.Collapse>
                )}
            </Navbar>
        </header>
    );
};

export default Header;
