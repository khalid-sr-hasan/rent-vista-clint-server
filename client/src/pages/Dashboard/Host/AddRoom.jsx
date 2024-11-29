import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utiles";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);
  // console.log(imagePreview);

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    // endDate: null,
    key: "selection",
  });

  // date range handler
  const handleDates = (range) => {
    // console.log(range);
    setDates(range.selection);
  };

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post("/room", roomData);
      return data;
    },
    onSuccess: () => {
      // console.log("data saved successfully");
      toast.success("Room Added Successfully");
      navigate("/dashboard/my-listings");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(image);
      // console.log(image_url);

      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bedrooms,
        bathrooms,
        description,
        image: image_url,
        host,
      };
      // console.table(roomData);
      // post request to server
      await mutateAsync(roomData);
    } catch (err) {
      // console.log(err.message);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Form | Dashboard</title>
      </Helmet>
      {/* form */}
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      ></AddRoomForm>
    </div>
  );
};

export default AddRoom;
