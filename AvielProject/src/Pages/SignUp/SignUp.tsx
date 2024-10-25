import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import SignupSchema from "../../Validations/SignupSchema.joi";
import { FloatingLabel, Button, Checkbox, Label } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const nav = useNavigate();

    const initialFormData = {
        name: { first: "", middle: "", last: "" },
        phone: "",
        email: "",
        password: "",
        image: { url: "", alt: "" },
        address: { state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0 },
        isBusiness: false,
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(SignupSchema),
    });

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', form);
            Swal.fire({
                title: "Register Successful!",
                icon: "success",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true,
            });
            nav('/login');
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                showCloseButton: true,
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen p-10 bg-primary-50 dark:bg-gray-700 transition-colors duration-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-4xl p-6 space-y-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:from-gray-700 dark:to-gray-800 transition-colors duration-300"
            >
                <h1 className="text-3xl font-bold text-center text-primary-900 dark:text-white">
                    Sign Up
                </h1>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter First Name"
                            id="firstName"
                            {...register("name.first", { required: true })}
                        />
                        <span className="text-sm text-red-800">{errors.name?.first?.message}</span>
                    </div>

                    <div>
                        <Label htmlFor="middleName">Middle Name</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Middle Name (Optional)"
                            id="middleName"
                            {...register("name.middle")}
                        />
                    </div>

                    <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Last Name"
                            id="lastName"
                            {...register("name.last", { required: true })}
                        />
                        <span className="text-sm text-red-800">{errors.name?.last?.message}</span>
                    </div>
                </div>

                {/* Phone and Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Phone Number"
                            id="phone"
                            type="tel"
                            {...register("phone", { required: true, pattern: /^[0-9]+$/ })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Email Address"
                            id="email"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <Label htmlFor="password">Password *</Label>
                    <FloatingLabel
                        variant="filled"
                        label="Enter Password"
                        id="password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <span className="text-sm text-red-800">{errors.password?.message}</span>
                </div>

                {/* Image Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Image URL"
                            id="imageUrl"
                            {...register("image.url")}
                        />
                    </div>

                    <div>
                        <Label htmlFor="imageAlt">Image Alt</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Image Alt Text"
                            id="imageAlt"
                            {...register("image.alt")}
                        />
                    </div>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="country">Country *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter Country"
                            id="country"
                            {...register("address.country", { required: true })}
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>

                    <div>
                        <Label htmlFor="city">City *</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter City"
                            id="city"
                            {...register("address.city", { required: true })}
                        />
                        <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                    </div>

                    <div>
                        <Label htmlFor="state">State</Label>
                        <FloatingLabel
                            variant="filled"
                            label="Enter State (Optional)"
                            id="state"
                            {...register("address.state")}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox id="business" {...register("isBusiness")} />
                    <Label htmlFor="business">Business User</Label>
                </div>

                <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full sm:w-1/4 mx-auto bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white"
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default Register;
