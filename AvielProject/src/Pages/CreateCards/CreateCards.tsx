import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { CreateCardSchema } from "../../Validations/CreateCardSchema";
import { FloatingLabel, Button } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CardCreation = () => {
    const initialCardData = {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: { url: "", alt: "" },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
    };

    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    const onSubmit = async (form: typeof initialCardData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Card Has Been Created",
                showConfirmButton: false,
                timer: 1500,
                background: '#1a202c',
                color: '#f7fafc',
                iconColor: '#48bb78',
                timerProgressBar: true,
            });
            nav("/mycards");
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true,
                background: '#1a202c',
                color: '#f7fafc',
            });
        }
    };

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-4 p-4 pt-20 m-auto rounded-lg shadow-lg bg-gradient-to-r from-green-100 to-green-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700"
        >
            <h1 className="mt-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
                Card Creation
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Title
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("title")} />
                    <span className="text-sm text-red-500">{errors.title?.message}</span>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Subtitle
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("subtitle")} />
                    <span className="text-sm text-red-500">{errors.subtitle?.message}</span>
                </div>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                    Description
                </label>
                <textarea 
                    {...register("description")} 
                    className="w-full p-3 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-white resize-none" 
                    placeholder="Write your card description here..."
                />
                <span className="text-sm text-red-500">{errors.description?.message}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Phone
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("phone")} />
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Email
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("email")} />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Website
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("web")} />
                    <span className="text-sm text-red-500">{errors.web?.message}</span>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Image URL
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("image.url")} />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Image Alt Text
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("image.alt")} />
                    <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        State
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.state")} />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Country
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.country")} />
                    <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        City
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.city")} />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        Street
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.street")} />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        House Number
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.houseNumber")} />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        ZIP
                    </label>
                    <FloatingLabel label={""} variant={"filled"} {...register("address.zip")} />
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={!isValid} 
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
                Create Card
            </Button>
        </form>
    );
};

export default CardCreation;
