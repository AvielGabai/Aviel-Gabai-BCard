import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "flowbite-react";
import Swal from "sweetalert2";

const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getCardData = async () => {
        try {
            const res = await axios.get(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
            );
            setCard(res.data);
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        getCardData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-primary-50 dark:bg-gray-900 transition-all duration-500">
            <div className="flex flex-wrap items-center m-auto gap-3 md:w-4/5 max-md:flex-col">
                <Card
                    key={card?._id}
                    className="
                        m-auto mt-5 h-[600px] w-[450px] 
                        bg-primary-100 dark:bg-gray-800 
                        border border-primary-300 dark:border-gray-700
                        text-primary-900 dark:text-gray-100
                        ring-2 ring-primary-400 dark:ring-gray-600 
                        shadow-lg shadow-primary-300 dark:shadow-gray-900
                        hover:opacity-80 transition-all duration-300"
                >
                    <h1 className="text-2xl font-semibold text-center">
                        {card?.title}
                    </h1>
                    <img
                        src={card?.image.url}
                        alt={card?.image.alt}
                        className="object-cover m-auto w-[250px] h-[200px] rounded-lg"
                    />
                    <hr className="border-primary-300 dark:border-gray-700 my-2" />
                    <div className="flex flex-col gap-4 text-center">
                        <h1>Email: {card?.email}</h1>
                        <h1>Phone: {card?.phone}</h1>
                        <h1 className="overflow-auto max-h-[150px]">
                            Description: {card?.description}
                        </h1>
                        <h1>
                            Address: {`${card?.address.country}, ${card?.address.city}, ${card?.address.street}`}
                        </h1>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CardDetails;
