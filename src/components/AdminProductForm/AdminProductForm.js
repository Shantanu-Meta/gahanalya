"use client"
import React, { useState, useContext, useRef } from 'react';
import './style.css';
import { toast } from 'react-toastify';
import adminContetx from '@contextAPI/adminContext/adminContetx';
import Loader from '@components/Loader/Loader';


const AdminProductForm = () => {
  const { addProduct, loader , setLoader} = useContext(adminContetx);
  const formRef = useRef(null);

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    tag: '',
    image: '',
    size: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormState({ ...formState, [name]: e.target.files[0] });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let imageToSend = formState.image; // Image to send to backend
  
      // If there's an image, try to remove background
      if (formState.image) {
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', formState.image);
        setLoader(1);
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          body: formData,
          headers: {
            'X-Api-Key': process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY,
          },
        });
        setLoader(0)
        if (response.ok) {
          const imageBlob = await response.blob();
          const imageName = formState.image.name;
          imageToSend = new File([imageBlob], imageName); // Use the background removed image
          toast.success("Using new image");
        } else {
          toast.error("Using original image");
        }
      }
  
      // Prepare form data for the product
      const productFormData = new FormData();
      productFormData.append('name', formState.name);
      productFormData.append('description', formState.description);
      productFormData.append('price', formState.price);
      productFormData.append('tag', formState.tag);
      productFormData.append('size', formState.size);
      productFormData.append('image', imageToSend);
      const productResponse = await addProduct(productFormData);

      if (productResponse?.success) {
        toast.success("Successfully added product");
        formRef.current.reset();
        setFormState({
          name: '',
          description: '',
          price: '',
          tag: '',
          image: '',
          size: '',
        });
      } else {
        toast.error("Some error occured" + productResponse?.error);
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 mt-[4rem] bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover bg-center">
      {loader ? <Loader/> : ""}
      <div className="mx-auto w-full max-w-[550px] p-5  shadow-md rounded-md bg-black/30 ">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
              Product Name
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              id="name"
              value={formState.name}
              placeholder="Product Name"
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
              Product Description
            </label>
            <textarea
              onChange={handleInputChange}
              name="description"
              id="description"
              value={formState.description}
              placeholder="Product Description"
              required
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
            ></textarea>
          </div>
          <div className="flex w-full justify-between items-center gap-3">
            <div className="mb-5 w-full">
              <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                Price
              </label>
              <input
                onChange={handleInputChange}
                type="number"
                name="price"
                id="price"
                value={formState.price}
                required
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
              />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="tag" className="mb-3 block text-base font-medium text-[#07074D]">
                Tag
              </label>
              <select
                name="tag"
                id="tag"
                value={formState.tag}
                required
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
                onChange={handleInputChange}
              >
                <option value="">Select tag</option>
                <option value="gold" className='bg-yellow-400 text-black text-[1.2rem]'>Gold</option>
                <option value="silver" className='bg-yellow-400 text-black text-[1.2rem]'>Silver</option>
              </select>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="size" className="mb-3 block text-base font-medium text-[#07074D]">
              Size
            </label>
            <select
              name="size"
              id="size"
              value={formState.size}
              required
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
              onChange={handleInputChange}
            >
              <option value="">Select Size</option>
              <option value="adult" className='bg-yellow-400 text-black text-[1.2rem]'>Adult</option>
              <option value="Teen" className='bg-yellow-400 text-black text-[1.2rem]'>Teen</option>
              <option value="any" className='bg-yellow-400 text-black text-[1.2rem]'>Any</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="image" className="mb-3 block text-base font-medium text-[#07074D]">
              Product Image
            </label>
            <input
              onChange={handleInputChange}
              type="file"
              name="image"
              id="image"
              required
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:shadow-md"
            />
          </div>
          <div>
            <button
              className="hover:shadow-form rounded-md  py-3 px-8 text-base font-semibold bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all  outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
