import { Button, Flex } from "antd";
import { Link } from "react-router";

export default function Page404() {
    return (
        <div className="max-w-[500px] mx-auto mt-20">
            <p className="text-center text-white font-semibold text-xl">Halaman Tidak Di Temukan</p>
            <Link to={"/"}>
                <Button className="mx-auto block mt-5">Back To Home</Button>
            </Link>
        </div>
    )
}