import React, { useState } from "react";
import {
  useUpdateBannerMutation,
  useGetBannerQuery,
  useGetBannerByIdQuery,
} from "../../../redux/apiSlice";
import { useDropzone } from "react-dropzone";

const ManageContent = () => {
  const { data: banners } = useGetBannerQuery();
  let bannerId = banners?.[0]?._id;

  console.log(banners);

  const [bannerHeader, setBannerHeader] = useState("");
  const [bannerSubHeader, setBannerSubHeader] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const [updateBanner, { isLoading, isError, error, isSuccess }] =
    useUpdateBannerMutation();

  const handleUpdateBanner = async (e) => {
    e.preventDefault();

    if (!bannerImage) {
      alert("Please upload a banner image");
      return;
    }

    const formData = new FormData();
    formData.append("header", bannerHeader);
    formData.append("subHeader", bannerSubHeader);
    formData.append("image", bannerImage);

    try {
      // Trigger the mutation to update the banner
      await updateBanner({ id: bannerId, formData }).unwrap();
      setBannerHeader("");
      setBannerSubHeader("");
      setBannerImage(null);
    } catch (err) {
      console.error("Failed to update banner:", err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setBannerImage(acceptedFiles[0]);
    },
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Contents</h1>

      {/* Banner Update Section */}
      <div className="mb-8 border border-gray-200 rounded p-4 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Banner Section</h2>
        <form onSubmit={handleUpdateBanner} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Header</label>
            <input
              type="text"
              value={bannerHeader}
              onChange={(e) => setBannerHeader(e.target.value)}
              className="w-full  border border-gray-200 rounded px-3 py-2"
              placeholder="Enter banner header"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subheader</label>
            <input
              type="text"
              value={bannerSubHeader}
              onChange={(e) => setBannerSubHeader(e.target.value)}
              className="w-full  border border-gray-200 rounded px-3 py-2"
              placeholder="Enter banner subheader"
            />
          </div>

          {/* Dropzone for banner image */}
          <div
            {...getRootProps()}
            className="border-dashed border-2   border-gray-400 p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-500">
              Drag & drop an image here, or click to select
            </p>
          </div>
          {bannerImage && (
            <p className="mt-2 text-sm">Selected Image: {bannerImage.name}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            {isLoading ? "Updating..." : "Update Banner"}
          </button>
        </form>

        {/* Error Handling */}
        {isError && <p className="text-red-500 mt-4">{error.message}</p>}

        {/* Success Handling */}
        {isSuccess && (
          <p className="text-green-500 mt-4">Banner updated successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ManageContent;
