import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../../hooks/useRole";
import { useState } from "react";
import toast from "react-hot-toast";
import HostModal from "../../../Modal/HostModal";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const GuestMenu = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandle = async () => {
    console.log("host request");

    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };

      const { data } = await axiosSecure.put(`/user`, currentUser);
      if (data.modifiedCount > 0) {
        toast.success("Please! Wait for Admin Confirmation");
      } else {
        toast.success("Please! Wait for Admin Approval");
      }
    } catch (err) {
      toast.error("err.message");
    } finally {
      closeModal();
    }
  };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {role === "guest" && (
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
        </div>
      )}
      {/* modal */}
      <HostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandle={modalHandle}
      ></HostModal>
    </>
  );
};

export default GuestMenu;
