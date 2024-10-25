import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../Store/UserSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const nav = useNavigate();
    const dispatch = useDispatch();

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (!token || !user?._id) return;

        try {
            axios.defaults.headers.common["x-auth-token"] = token;
            const res = await axios.get(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`
            );
            dispatch(userActions.login(res.data));
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        if (user?._id) getData();
    }, [user?._id]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
            <Card className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    {/* Profile Image */}
                    <div className="relative w-32 h-32">
                        <img
                            src={user?.image?.url || "https://via.placeholder.com/150"}
                            alt={user?.image?.alt || "No Image Available"}
                            className="w-full h-full object-cover rounded-full shadow-md"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>

                    {/* User Info */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-primary-900 dark:text-white">
                            {user?.name.first} {user?.name.middle} {user?.name.last}
                        </h2>
                        <p className="text-sm text-primary-600 dark:text-gray-400">
                            {user?.email}
                        </p>
                        <p className="mt-2 text-sm text-primary-700 dark:text-gray-300">
                            📱 {user?.phone}
                        </p>
                    </div>

                    {/* Address Section */}
                    <div className="w-full mt-4">
                        <p className="text-center font-medium text-primary-700 dark:text-gray-300">
                            Address:
                        </p>
                        <p className="text-sm text-center text-primary-600 dark:text-gray-400">
                            {user?.address.houseNumber}, {user?.address.street}, {user?.address.city}, {user?.address.country}
                        </p>
                    </div>

                    {/* Edit Button */}
                    <Button
                        className="mt-6 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold px-8 py-2 rounded-full transition-all duration-300"
                        onClick={() => nav(`/edit-user/${user?._id}`)}
                    >
                        Edit Profile
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
