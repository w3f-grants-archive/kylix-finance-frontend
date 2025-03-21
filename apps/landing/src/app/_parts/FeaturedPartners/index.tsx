import { featuredPartnersData } from "~/data";
import styles from "./styles.module.css";
import Link from "next/link";

const FeaturedPartners = () => {
  return (
    <div
      className="flex flex-col gap-10 justify-center items-center w-full relative z-10 scroll-m-[11rem]  lg:max-w-[1900px]"
      id={featuredPartnersData.id}
    >
      <h2 className="text-xl lg:text-3xl font-bold text-white">
        {featuredPartnersData.heading.left}
      </h2>
      <div className="w-full flex items-center gap-10 md:gap-28 justify-center flex-wrap px-8">
        {featuredPartnersData.items.map(({ icon: Icon, link, name }) => (
          <Link
            href={link}
            key={link}
            className="w-32 h-44 lg:w-28 flex flex-col items-center lg:gap-9"
          >
            <Icon className="h-20" />
            <p className="w-36 text-sm lg:text-lg font-medium text-white leading-loose lg:leading-5 -mt-1 text-center">
              {name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPartners;
