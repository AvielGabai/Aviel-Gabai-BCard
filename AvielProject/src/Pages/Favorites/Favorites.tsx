import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Favorites = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const user = useSelector((state: TRootState) => state.UserSlice);
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search
    );

    const getData = async () => {
        try {
            const res = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
            );
            setCards(res.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    };

    const searchCards = () =>
        cards
            .filter((card) => card.likes.includes(user.user!._id))
            .filter((card) =>
                card.title.toLowerCase().includes(searchWord.toLowerCase())
            );

    const isLikedCard = (card: TCard) =>
        user?.user ? card.likes.includes(user.user._id) : false;

    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
            );
            if (res.status === 200) {

                const updatedCards = cards.map((c) =>
                    c._id === card._id
                        ? {
                              ...c,
                              likes: isLikedCard(card)
                                  ? c.likes.filter((id) => id !== user.user!._id)
                                  : [...c.likes, user.user!._id],
                          }
                        : c
                );
                setCards(updatedCards);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-primary-50 dark:bg-gray-800 transition-colors duration-300 p-6">
            <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-6">
                Favorites Page
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-11/12 max-w-6xl">
                {searchCards().map((item: TCard) => (
                    <Card
                        key={item._id}
                        className="p-4 bg-white dark:bg-gray-700 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        <img
                            src={item.image.url}
                            alt={item.image.alt}
                            className="h-48 w-full object-cover rounded-lg cursor-pointer"
                            onClick={() => navToCard(item._id)}
                        />
                        <div className="mt-4 text-center">
                            <h1 className="text-xl font-semibold text-primary-900 dark:text-white">
                                {item.title}
                            </h1>
                            <h3 className="text-md text-primary-700 dark:text-gray-300">
                                {item.subtitle}
                            </h3>
                            <p className="text-sm text-primary-600 dark:text-gray-400 mt-2">
                                {item.description}
                            </p>
                        </div>
                        <hr className="my-4 border-primary-200 dark:border-gray-600" />
                        {user?.user && (
                            <FaHeart
                                size={24}
                                className="m-auto cursor-pointer"
                                color={isLikedCard(item) ? "red" : "gray"}
                                onClick={() => likeUnlikeCard(item)}
                            />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
