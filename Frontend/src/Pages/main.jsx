import { Button, Carousel, Flex, Input, Space, Tag } from "antd";
import Navbar from "../Components/Nav";
import Images from "../assets/About.png";
import ImageSale from "../assets/sale.png";
import image1 from "../assets/Baju1.png";
import image2 from "../assets/Baju2.png";
import image3 from "../assets/Baju3.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Category from "../data/category.json";
import FooterImage from "../assets/footer.png";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function CarouselEvent() {
  let DataContent = {
    text: "Sales Direct Products menampilkan produk baru di setiap harinya",
    tag: ["Discount %", "12.12", "FREE🔥"],
    img: ImageSale,
  };

  return (
    <>
      <div className="w-full h-[705px] relative pt-5 overflow-hidden bg-primary">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full z-[1] bg-gradient-to-r from-secondary sm:from-20% to-transparent" />
        <img
          src={DataContent.img}
          alt=""
          className="absolute w-full h-full object-cover object-center opacity-30"
        />
        <div className="relative flex flex-col justify-center items-start w-1/2 h-full z-[5] text-white px-10">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {DataContent.text}
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {DataContent.tag.map((tag, index) => (
              <div
                key={`tag-${index}`}
                className="py-1 px-4 rounded border border-white"
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-lg mb-6">
            Discover the latest update in Genshin Impact, featuring the historic
            Pyro Archon. Dive into the new adventures and challenges awaiting in
            version 5.3!
          </p>
          <button
            className="py-2 px-6 bg-red-500 text-white rounded font-semibold flex items-center gap-2 hover:bg-red-600 active:scale-95 transition-all group"
            onClick={() => alert("Learn More Clicked")}
          >
            Buy Now
            <FaArrowRight className="text-white transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </>
  );
}

function AboutMe() {
  return (
    <div className="w-11/12 md:max-w-[950px] mx-auto my-20 flex flex-col md:flex-row items-center gap-10 mt-20">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={Images}
          alt="About Us"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side: Text */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-white mb-4">
          About Sales Direct
        </h2>
        <p className="text-lg text-white/80 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          repudiandae repellat ad. Quibusdam autem soluta magnam eaque cum unde
          iusto. Exercitationem deserunt provident ullam, aperiam quisquam optio
          numquam maiores aliquid.
        </p>
        <p className="text-lg text-white/80 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
          dolore dicta? Delectus iusto excepturi molestias quod aut est non
          labore qui nihil inventore, ipsam optio!
        </p>
      </div>
    </div>
  );
}

function CategoryList() {
  let [Data, SetData] = useState();

  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  useEffect(() => {
    SetData(chunkArray(Category, 4));
  }, []);

  return (
    <div className="w-11/12 md:max-w-[950px] mx-auto my-20 ">
      <p className="text-xl font-semibold text-white mb-8">
        Browse By Category
      </p>
      <Carousel arrows dots={false}>
        {Data?.map((dt, id) => {
          return (
            <div className="px-8 md:px-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                {dt.map((dp, it) => {
                  return (
                    <Link
                      to={`/category/${dp.uuid}`}
                      className="bg-secondary border-2 rounded-xl border-white p-3 aspect-square flex flex-col gap-4 justify-center items-center group hover:bg-white cursor-pointer transition-all"
                    >
                      <Icon
                        icon={dp.icon ?? "game-icons:ghost"}
                        className="text-7xl md:text-8xl block mx-auto text-white group-hover:text-primary"
                      />
                      <p className="bg-white text-secondary font-semibold rounded-xl max-md:text-xs py-2 px-4 text-center w-11/12 group-hover:bg-secondary group-hover:text-white">
                        {dp.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

function ListContext() {
  let data = [
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image1,
      created_at: "12 Dec 2024",
      author: "Bukalapak",
    },
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image2,
      created_at: "12 Dec 2024",
      author: "Tokopedia",
    },
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image3,
      created_at: "12 Dec 2024",
      author: "Shopee",
    },
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image3,
      created_at: "12 Dec 2024",
      author: "Shopee",
    },
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image3,
      created_at: "12 Dec 2024",
      author: "Shopee",
    },
    {
      title: "Baju murah kalao punya uang sendiri dan banyak",
      image: image3,
      created_at: "12 Dec 2024",
      author: "Shopee",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-10 my-20 w-10/12 mx-auto">
      {data.map((dt, id) => {
        return (
          <div
            className="bg-zinc-950 p-5 rounded-xl shadow-md"
            key={`data${id}`}
          >
            <div className="relative">
              <img
                src={dt.image}
                alt=""
                className="aspect-video rounded-xl w-full"
              />
            </div>
            <p className="my-3 text-white font-semibold">{dt.title}</p>
            <div className="flex gap-10 text-xs mt-3">
              <p className="text-white">{dt.author}</p>
              <p className="text-white/50">{dt.created_at}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FooterContext() {
  let Medsos = [
    {
      icon: "mdi:instagram",
      url: "https://www.instagram.com/rovino_ramadhani/",
    },
    { icon: "cib:facebook", url: "https://www.facebook.com/rovinor/" },
    {
      icon: "simple-icons:linkedin",
      url: "https://www.linkedin.com/in/rovino-ramadhani/",
    },
  ];
  return (
    <footer className="bg-black/20 pt-10 pb-5">
      <div className="grid md:grid-cols-3 gap-5 w-11/12 mx-auto">
        <div>
          <p className="text-5xl font-semibold text-white">WAOW</p>
          <Flex gap={10} className="mt-5">
            {Medsos.map((dt, id) => {
              return (
                <a
                  target="_blank"
                  href={dt.url}
                  key={`medsos ${id}`}
                  className="bg-white/30 flex justify-center items-center w-9 h-9 rounded-full"
                >
                  <Icon icon={dt.icon} className="text-xl text-white" />
                </a>
              );
            })}
          </Flex>
          <Flex gap={10} className="mt-10">
            <p className="font-semibold text-white">Home</p>
            <p className="font-semibold text-white">Work</p>
            <p className="font-semibold text-white">Blog</p>
            <p className="font-semibold text-white">About</p>
          </Flex>
        </div>
        <Flex justify="center" align="center" vertical={true}>
          <div>
            <p className="mb-3 font-semibold text-white">Subscribe to WAOW</p>
            <Space.Compact>
              <Input />
              <Button type="primary">Submit</Button>
            </Space.Compact>
          </div>
        </Flex>
        <Flex justify="center" align="center">
          <img src={FooterImage} className="h-[200px]" alt="" />
        </Flex>
      </div>
    </footer>
  );
}

export function Footers() {
  return (
    <footer className="bg-blue-800 p-6 text-black">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-3xl">Direct Sales</h3>
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
              Eos, aliquam ut incidunt veniam tempora <br /> eveniet possimus
              illo quos veritatis rem sed, temporibus rerum odio obcaecati!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4 ml-10">
            <h3 className="font-bold text-lg">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Partnership
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 ml-10">
            <h3 className="font-bold text-lg">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 ml-10">
            <h3 className="font-bold text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Legal
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">© 2023 AR Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function () {
  return (
    <>
      <CarouselEvent />
      <AboutMe />
      {/* <CategoryList /> */}
      <ListContext />
      {/* <FooterContext /> */}
      <Footers />
    </>
  );
}
