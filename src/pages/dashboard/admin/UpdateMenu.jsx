import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Loading from "../../../components/Loading";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // image hosting key
  const image_hosting = process.env.IMAGE_HOSTING_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting}`;
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic
      .post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "Failed",
          title: "Error at image upload",
          showConfirmButton: false,
          timer: 1500,
        });
      });

    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };

      const postMenuItem = axiosPublic.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      {!loading ? (
        <>
          <h2 className="text-2xl font-semibold my-4">
            Update This <span className="text-green">Menu Item</span>
          </h2>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Recipe Name*</span>
                </label>
                <input
                  type="text"
                  defaultValue={item.name}
                  {...register("name", { required: true })}
                  placeholder="Recipe Name"
                  className="input input-bordered w-full "
                />
              </div>

              {/* 2nd row */}
              <div className="flex items-center gap-4">
                {/* categories */}
                <div className="form-control w-full my-6">
                  <label className="label">
                    <span className="label-text">Category*</span>
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="select select-bordered"
                    defaultValue={item.category}
                  >
                    <option disabled value="default">
                      Select a category
                    </option>
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="dessert">dessert</option>
                    <option value="drinks">Drinks</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>

                {/* prices */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={item.price}
                    {...register("price", { required: true })}
                    placeholder="Price"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* 3rd row */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipe Details</span>
                </label>
                <textarea
                  defaultValue={item.recipe}
                  {...register("recipe", { required: true })}
                  className="textarea textarea-bordered h-24"
                  placeholder="Tell the worlds about your recipe"
                ></textarea>
              </div>

              {/* 4th row */}
              <div className="form-control w-full my-6">
                <input
                  {...register("image", { required: false })}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
              </div>

              <button className="btn bg-green text-white px-6">
                Update Item <FaUtensils />
              </button>
            </form>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UpdateMenu;
