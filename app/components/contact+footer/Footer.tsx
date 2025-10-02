import { useView } from "@/contexts/ViewContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-scroll";
import React from "react";

const curYear = new Date().getFullYear();

export default function Footer() {
  const { setSectionInView } = useView();

  return (
    <section
      id="footer"
      className="my-6 sm:my-8 text-sm sm:text-base lg:text-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left"
    >
      <p>
        <span className="text-xl sm:text-2xl">&copy;</span> {curYear} . MOHAMED ASIF M . ALL RIGHTS RESERVED
      </p>
      <p className="text-sm text-white/60 mt-2 md:mt-0">
        Developed with ❤️ by{" "}
        <span className="font-medium text-white/80">Asif</span>
      </p>
      <Link
        className="md:flex hidden items-center gap-1 leading-tight hover:text-white/80 transition-colors"
        to="home"
        smooth={true}
        spy={true}
        duration={500}
        href="#home"
        data-blobity-offset-x="2"
        data-blobity-offset-y="0"
        onClick={() => setSectionInView("home")}
      >
        <Icon icon="mdi:arrow-top" className="text-2xl rounded-2xl" />
        <p className="underline leading-tight">SCROLL TO TOP</p>
      </Link>
    </section>
  );
}