import { useEffect, useState } from "react";
import { TUser } from "../../Types/TUser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button } from "flowbite-react";
import { joiResolver } from "@hookform/resolvers/joi";
import EditUserSchema from "../../Validations/EditUserSchema";

const UpdateUser = () => {
    const [editUser, setEditUser] = useState<TUser>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
            const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`);
            setEditUser(res.data);
            console.log("Fetched User Data:", res.data);
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

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: editUser,
        mode: "onChange",
        resolver: joiResolver(EditUserSchema),
    });

    const onSubmit = async (formData: TUser) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
            const response = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, formData);

            console.log("Updated User Data:", response.data);
            Swal.fire({
                title: "Success!",
                text: "Your profile has been updated.",
                icon: "success",
                timerProgressBar: true,
                background: "#1a1a1a",
                color: "#ffffff",
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
            });
            navigate("/profile");
        } catch (error) {
            console.error("Failed to update user:", error);
            Swal.fire({
                title: "Update Failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        getUserData();
    }, [id]);

    useEffect(() => {
        if (editUser) reset(editUser);
    }, [editUser, reset]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-gray-900 transition-colors duration-500">
            <div className="w-4/5 max-w-2xl p-8 rounded-lg shadow-lg bg-primary-100 dark:bg-gray-800">
                <h1 className="text-3xl font-semibold text-center text-primary-900 dark:text-gray-100 mb-6">
                    Edit User Profile
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="First Name"
                                {...register("name.first")}                            />
                            <span className="text-sm text-red-500">{errors.name?.first?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Middle Name"
                                {...register("name.middle")}                            />
                            <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Last Name"
                                {...register("name.last")}                            />
                            <span className="text-sm text-red-500">{errors.name?.last?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Phone Number"
                                {...register("phone")}                            />
                            <span className="text-sm text-red-500">{errors.phone?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Image URL"
                                {...register("image.url")}                            />
                            <span className="text-sm text-red-500">{errors.image?.url?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Image Alt Text"
                                {...register("image.alt")}                            />
                            <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Country"
                                {...register("address.country")}                            />
                            <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="City"
                                {...register("address.city")}                            />
                            <span className="text-sm text-red-500">{errors.address?.city?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="State"
                                {...register("address.state")}                            />
                            <span className="text-sm text-red-500">{errors.address?.state?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="Street"
                                {...register("address.street")}                            />
                            <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="House Number"
                                {...register("address.houseNumber")}                            />
                            <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                        </div>
                        <div>
                            <FloatingLabel
                                variant={"filled"} label="ZIP Code"
                                {...register("address.zip")}                            />
                            <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValid}
                        className="w-full bg-primary-500 hover:bg-primary-400 text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                        Update Profile
                    </Button>
                </form>
            </div>
        </main>
    );
};

export default UpdateUser;
