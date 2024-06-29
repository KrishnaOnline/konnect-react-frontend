import Search from "./Search";
import Suggestions from "./Suggestions";

function Rightbar() {
	return (
        <div className="flex flex-col mx-2 fixed pt-24 top-0 h-screen">
            <div className="">
                <Search/>
            </div>
            <div className="border mt-2">
                <Suggestions/>
            </div>
        </div>
    );
}

export default Rightbar;
