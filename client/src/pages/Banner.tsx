import { FaHome } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const Banner = () => {
    return (
        <div className="hidden sm:flex sm:flex-row justify-end items-center gap-1.5 text-xs hover:underline hover:underline-offset-2 text-slate-800">
            {/* <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://x.com/joanne_kim__"
                >
                    <FaXTwitter className="size-4" />
                </a> */}
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://joannekim.dev/"
            >
                <FaHome className="size-3.5" />
            </a>
            {/* <a href="mailto:joanne.kim0328@gmail.com">
                <MdEmail className="size-3.5" />
            </a> */}
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/joanne5548/parkmark"
            >
                <SiGithub className="size-3.5" />
            </a>
        </div>
    );
};

export default Banner;
