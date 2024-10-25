import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";
import Swal from "sweetalert2";

const MyCards = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
    const user = useSelector((state: TRootState) => state.UserSlice);

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
            const res = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
            );
            setCards(res.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to load cards",
                timer: 2000,
                showCloseButton: true,
            });
        }
    };

    const searchCards = () => 
        cards.filter((item) =>
            item.title.toLowerCase().includes(searchWord.toLowerCase())
        );

    const isLikedCard = (card: TCard) =>
        user?.user ? card.likes.includes(user.user._id) : false;

    const navToCard = (id: string) => nav(`/card/${id}`);
    const navToCreate = () => nav("/createcards");

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
                Swal.fire({ icon: "success", title: "Action succeeded", timer: 1500 });
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Action failed", timer: 1500 });
        }
    };

    const deleteCard = async (card: TCard) => {
        try {
            await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
            );
            setCards(cards.filter((c) => c._id !== card._id));
            Swal.fire({ icon: "success", title: "Card Deleted", timer: 1500 });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to delete",
                footer: '<a href="#">Need help?</a>',
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-primary-50 dark:bg-gray-800 transition-colors duration-300 p-6">
            <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-4">My Cards</h1>
            <p className="text-lg text-primary-600 dark:text-gray-300 mb-8">
                These cards were created by you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-11/12 max-w-7xl mx-auto">
                {searchCards().map((item: TCard) => (
                    <Card
                        key={item._id}
                        className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
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
                        <div className="flex justify-evenly mt-4">
                            <FaHeart
                                size={20}
                                className="cursor-pointer"
                                color={isLikedCard(item) ? "red" : "gray"}
                                onClick={() => likeUnlikeCard(item)}
                            />
                            <FaPencil
                                size={20}
                                className="cursor-pointer"
                                onClick={() => nav(`/cardedit/${item._id}`)}
                            />
                            <FaTrash
                                size={20}
                                className="cursor-pointer"
                                onClick={() => deleteCard(item)}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            <div onClick={navToCreate} className="fixed bottom-10 right-10 bg-cyan-300 p-4 pb-20 rounded-full cursor-pointer shadow-lg hover:bg-cyan-400 transition">
                <PiPlus size={30}/>
            </div>
        </div>
    );
};

export default MyCards;
