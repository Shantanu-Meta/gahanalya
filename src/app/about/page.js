import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="md:w-[80%] mx-auto pt-[7rem] w-[95%]">
      <div className="w-full">
        <h2 className="w-full text-center drop-shadow-sm text-3xl">
          <span className="text-yellow-400">The Brand</span> Story
        </h2>
      </div>
      <div className="infos flex justify-between items-center bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover rounded-md mt-4 flex-col  md:flex-row">
        <div className="main-container">
          <div className="inner-container">
            <div className="txt p-2">
              <h3>
                Every journey has a beginning, GAHANALYA began in 2004 and grew
                to be India’s one of the largest jewellery house with a legacy
                of over eight decades.
              </h3>
              <p>
                {" "}
                The founder, Shri. ShyamSundar Dutta’s vision and passion for
                creating bold and legendary jewellery designs, has been able to
                carve a way for the company to establish trust amongst its
                customers for generations now.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-[2rem] md:pt-0 lg:w-[30vw] w-full">
          <Image
            src="/assets/LOGO.png"
            width={200}
            height={200}
            alt="GAHANALYA logo"
            unoptimized={true} priority
            className="bg-black rounded-md shadow-md"
          />
        </div>
      </div>

      <div className="w-full mt-[4rem]">
        <h2 className="w-full text-center drop-shadow-sm text-3xl text-yellow-500 drop=-shadow-md">Shop Loction</h2>
      </div>

      <div className="w-full flex justify-between items-center mt-4 bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover
      md:flex-row flex-col p-[1rem]">
        <div className="flex flex-col justify-center md:pl-[1rem]">
          <h2 className="text-2xl">Gahanalya</h2>
          <p className="txt">Trisulapatty, Bolpur, Opposite to Mahabir rice mill </p>
          <p className="txt">Birbhum, West Bengal - 731204</p>
          <p className="txt2 text-red-500">
          <i className="ri-phone-line text-xl"></i>: +91-9093446447 <br /> <br /> <i className="ri-whatsapp-line text-xl"></i>:{" "}
            <a href="https://wa.me/9093446447" target="_blank">
              9674400480{" "}
            </a>
            <br /> <i className="ri-mail-unread-line text-xl"></i>:{" "}
            <a href="mail_to:shantanubhs1985@gmail.com" target="_blank">
              shantanubhs1985@gmail.com
            </a>
          </p>
          <div className="storeTiming">
            <h5>
              Store Timing
            </h5>
            <div className="allTiming">
              <p>
                Mon-Sun
                <br />
                <span>9:00 AM - 1:30 PM</span>
                <br />
                <span>4:30 PM - 8:30 PM</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mapBG p-[1rem] md:p-0">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d406.145459852321!2d87.70133555590262!3d23.66789165297771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9c34c13159a47%3A0xfe093570067acf3!2sPHOTOtech!5e0!3m2!1sen!2sin!4v1712949994633!5m2!1sen!2sin" width="400" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
};

export default About;