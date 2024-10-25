import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FloatingLabel, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../../Validations/CreateCardSchema";
import Swal from "sweetalert2";

const EditCards = () => {
    const [card, setCard] = useState<TCard | null>(null);
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid }, 
        reset 
    } = useForm({
        defaultValues: card || {},
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    const getCardData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
            setCard(res.data);
            reset(res.data);  // Update form values with fetched data
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                icon: "error",
                timer: 2000,
                toast: true,
                showCloseButton: true,
            });
        }
    };

    const onSubmit = async (form: TCard) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, form);
            Swal.fire({
                title: "Success!",
                text: "Card details updated successfully.",
                icon: "success",
                timer: 2000,
                showCloseButton: true,
                background: '#1a202c', // Dark mode
                color: '#f7fafc',
            });
            nav("/mycards");
        } catch (error) {
            Swal.fire({
                title: "Update Failed!",
                icon: "error",
                timer: 2000,
                toast: true,
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        getCardData();
    }, [id]);

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-4 p-4 m-auto rounded-lg shadow-lg bg-gradient-to-r from-green-100 to-green-200 dark:from-gray-800 dark:to-gray-700"
        >
            <h1 className="pt-20 text-2xl font-bold text-center text-gray-800 dark:text-white">
                Editing Card Details
            </h1>

            {/* Title and Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Title</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("title")} />
                    <span className="text-red-500">{errors.title?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Subtitle</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("subtitle")} />
                    <span className="text-red-500">{errors.subtitle?.message}</span>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="text-sm font-medium text-gray-800 dark:text-white">Description</label>
                <textarea 
                    {...register("description")} 
                    className="w-full p-3 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-white resize-none"
                    placeholder="Write your card description here..."
                />
                <span className="text-red-500">{errors.description?.message}</span>
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Phone</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("phone")} />
                    <span className="text-red-500">{errors.phone?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Email</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("email")} />
                    <span className="text-red-500">{errors.email?.message}</span>
                </div>
            </div>

            {/* Web and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Web</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("web")} />
                    <span className="text-red-500">{errors.web?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Image URL</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("image.url")} />
                    <span className="text-red-500">{errors.image?.url?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Image Alt</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("image.alt")} />
                    <span className="text-red-500">{errors.image?.alt?.message}</span>
                </div>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Country</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.country")} />
                    <span className="text-red-500">{errors.address?.country?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">City</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.city")} />
                    <span className="text-red-500">{errors.address?.city?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">State</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.state")} />
                    <span className="text-red-500">{errors.address?.state?.message}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">Street</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.street")} />
                    <span className="text-red-500">{errors.address?.street?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">House Number</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.houseNumber")} />
                    <span className="text-red-500">{errors.address?.houseNumber?.message}</span>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-800 dark:text-white">ZIP</label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.zip")} />
                    <span className="text-red-500">{errors.address?.zip?.message}</span>
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={!isValid} 
                className="m-auto w-[20%] bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
                Update Changes
            </Button>
        </form>
    );
};

export default EditCards;
