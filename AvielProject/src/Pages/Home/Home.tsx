import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { TRootState } from "../../Store/BigPie";

const Home = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const navigate = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
    const user = useSelector((state: TRootState) => state.UserSlice);

    const getData = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
            );
            setCards(res.data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const searchCards = useMemo(() => {
        return cards.filter((item) =>
            item.title.toLowerCase().includes(searchWord.toLowerCase())
        );
    }, [cards, searchWord]);

    const navToCard = (id: string) => {
        navigate("/card/" + id);
    };

    const isLikedCard = (card: TCard) => {
        return user?.user ? card.likes.includes(user.user._id) : false;
    };

    const likeUnlikeCard = async (card: TCard, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering navigation on click
        try {
            const res = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
            );

            if (res.status === 200) {
                const updatedCards = cards.map((c) =>
                    c._id === card._id
                        ? {
                              ...c,
                              likes: c.likes.includes(user.user!._id)
                                  ? c.likes.filter((id) => id !== user.user!._id)
                                  : [...c.likes, user.user!._id],
                          }
                        : c
                );
                setCards(updatedCards);
            }
        } catch (error) {
            console.error("Error liking/unliking card:", error);
        }
    };

    return (
        <div className="min-h-screen bg-primary-50 dark:bg-gray-700 transition-colors duration-300">
            <h1 className="text-center text-3xl p-4 font-extrabold text-primary-900 dark:text-white">
                Cards Page
            </h1>
            <p className="text-center text-xl m-2 font-semibold text-primary-600 dark:text-gray-300">
                Here you can find business cards from all categories
            </p>
            <hr className="w-[80vw] h-1 m-4 mx-auto bg-primary-200 dark:bg-gray-600 border-0 rounded" />

            {/* Responsive Grid for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
                {searchCards.map((item: TCard) => (
                    <Card
                        key={item._id}
                        className="cursor-pointer hover:shadow-lg transition-all bg-white dark:bg-gray-800 dark:text-white"
                        onClick={() => navToCard(item._id)}
                    >
                        <img
                            src={item.image.url}
                            alt={item.image.alt}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h1 className="text-xl font-bold text-primary-900 dark:text-white">
                                {item.title}
                            </h1>
                            <h3 className="text-md text-primary-700 dark:text-gray-300">
                                {item.subtitle}
                            </h3>
                            <p className="text-sm text-primary-500 dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                        <hr className="my-2 border-primary-200 dark:border-gray-700" />
                        {user?.user && (
                            <FaHeart
                                size={24}
                                className="m-auto cursor-pointer"
                                color={isLikedCard(item) ? "red" : "gray"}
                                onClick={(e) => likeUnlikeCard(item, e)}
                            />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
