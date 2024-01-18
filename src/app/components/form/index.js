"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import axios from "axios";
import ImagesPreview from "../imagesPreview";
import UploadImagesPreview from "../uploadedImagesPreview";
import { useLoadingAnimationContext } from "@/app/hooks/useLoadingAnimationContext";

function convertTextToArray(text) {
  return text.split(",");
}
function convertArrayToText(array) {
  if (array) {
    return array.join(", ");
  }
}

export default function ProductForm({
  isEditing,
  productName,
  price,
  quantity,
  description,
  categories,
  sizes,
  imagesUrl,
  productId,
}) {
  const { setShowLoadingAnimation } = useLoadingAnimationContext();
  //successfully uploaded images
  const [uploadedImages, setUploadedImages] = useState(
    isEditing ? imagesUrl : []
  );
  // selected images before upload
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({
    productName: isEditing ? productName : "",
    price: isEditing ? price : "",
    quantity: isEditing ? quantity : "",
    description: isEditing ? description : "",
    categories: isEditing ? convertArrayToText(categories) : "",
    sizes: isEditing ? convertArrayToText(sizes) : "",
  });
  console.log(`price ${formData.price}`);
  console.log(`qauntity ${formData.quantity}`);

  const router = useRouter();

  function goToProductsPage() {
    router.push("/products");
  }
  function changehandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function imageChangeHandler(e) {
    setSelectedImage(e.target.files[0]);
  }

  async function uploadImage(e) {
    e.preventDefault();
    const formToSend = new FormData();
    formToSend.append("image", selectedImage);
    try {
      setShowLoadingAnimation(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/images`,
        formToSend,
        {
          "content-type": "multipart/form-data",
        }
      );
      const { savedImageUrl } = res.data;
      // add to uploadedImages list
      setUploadedImages([...uploadedImages, savedImageUrl]);
    } catch (e) {
      console.log("unsuccessful");
    }
    // reset selected image
    setSelectedImage(null);
    setShowLoadingAnimation(false);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    const { productName, price, description, categories, quantity, sizes } =
      formData;
    // input validation of required fields except "sizes"
    if (
      productName.length > 0 &&
      description.length > 0 &&
      categories.length > 0 &&
      !isNaN(price) &&
      !isNaN(quantity) &&
      uploadedImages.length > 0
    ) {
      const categoriesList = convertTextToArray(categories);
      const sizesList = convertTextToArray(sizes);
      const dataToSend = {
        productName,
        price: Number(price),
        description,
        quantity: Number(quantity),
        sizes: sizesList,
        categories: categoriesList,
        imagesUrl: uploadedImages,
      };

      // send data to server
      try {
        setShowLoadingAnimation(true);
        const serverAddress = process.env.NEXT_PUBLIC_SERVER_URL;
        let res;
        // if we are updating an existing product instaed of creating a new one
        if (isEditing) {
          res = await axios.put(
            `${serverAddress}/products/${productId}`,
            dataToSend
          );
        } else {
          // if we are creating a new product instead
          res = await axios.post(`${serverAddress}/products`, dataToSend);
        }

        if (res.status == 200 || res.status == 201) {
          setShowLoadingAnimation(false);
          goToProductsPage();
        }
      } catch (error) {
        console.log(error);
        setShowLoadingAnimation(false);
      }
    } else {
      // respond to invalide user data
      alert(
        "please fill in the required details, including images. Ensure that Price and Quantity are numbers."
      );
    }
  }

  return (
    <form>
      <h1 className="text-blue-700 text-lg font-extrabold">Add new Product</h1>

      {/* product name */}
      <section className="flex flex-col mt-3">
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          className="p-1"
          name="productName"
          value={formData.productName}
          onChange={changehandler}
        />
      </section>

      {/* product images */}
      <section className="flex flex-col mt-3 content-center">
        <label htmlFor="images" className="image-picker">
          <span className="font-extrabold"> + </span>Add image
        </label>
        <input
          type="file"
          id="images"
          className="p-1 image-picker"
          hidden
          onChange={imageChangeHandler}
          accept="image/*"
        />
        <ImagesPreview file={selectedImage} />
        {selectedImage && (
          <p className="text-sm text-red-500 mt-2">
            Are you sure you want to add this image?{" "}
          </p>
        )}
        {selectedImage && (
          <button
            className="primary-btn image-upload-btn"
            onClick={uploadImage}
          >
            Save and add another image
          </button>
        )}
        {uploadedImages && (
          <>
            <p>successfully uploaded images :</p>
            <UploadImagesPreview images={uploadedImages} />
          </>
        )}
      </section>

      {/* price */}
      <section className="flex flex-col mt-3">
        <label htmlFor="price">price</label>
        <input
          type="number"
          id="price"
          className="p-1"
          name="price"
          value={formData.price}
          onChange={changehandler}
        />
      </section>

      {/* available quantity */}
      <section className="flex flex-col mt-3">
        <label htmlFor="quantity">Available quantity</label>
        <input
          type="number"
          id="quantity"
          className="p-1"
          name="quantity"
          value={formData.quantity}
          onChange={changehandler}
        />
      </section>
      {/* product description */}
      <section className="flex flex-col mt-3">
        <label htmlFor="description">Product Details</label>
        <textarea
          id="description"
          rows="7"
          className="p-1"
          name="description"
          value={formData.description}
          onChange={changehandler}
        ></textarea>
      </section>

      {/* categories*/}
      <section className="flex flex-col mt-3">
        <label htmlFor="Categories">Product Categories</label>
        <textarea
          id="description"
          rows="3"
          className="p-1"
          placeholder="separate different categories by commas e.g electronics, accessories"
          name="categories"
          value={formData.categories}
          onChange={changehandler}
        ></textarea>
      </section>

      {/* available sizes */}
      <section className="flex flex-col mt-3">
        <label htmlFor="sizes">
          Available sizes <span className="text-black">[optional]</span>
        </label>
        <textarea
          id="sizes"
          rows="3"
          className="p-1"
          placeholder="separate different available sizes by commas. For example: 32 inches, 64 inches, sm, md, xxl"
          name="sizes"
          value={formData.sizes}
          onChange={changehandler}
        ></textarea>
      </section>

      {/* submit button */}
      <section className="mt-3">
        <button className="primary-btn rounded" onClick={onSubmitHandler}>
          Submit
        </button>
      </section>
    </form>
  );
}
