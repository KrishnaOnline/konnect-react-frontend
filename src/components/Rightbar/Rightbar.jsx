import Search from "./Search";
import Suggestions from "./Suggestions";

function Rightbar() {
	return (
        <div className="flex flex-col mx-2 sticky top-0 h-screen pt-5">
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
