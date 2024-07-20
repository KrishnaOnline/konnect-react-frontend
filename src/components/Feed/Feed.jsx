import CreatePost from "./CreatePost";
import Posts from "./Posts";

function Feed() {
	return (
        <div className="flex flex-col lg:ml-10 xl:ml-0 md:ml-0 w-full lg:w-[600px] md:-translate-y-20 lg:translate-y-0 items-center justify-center">
            {/* <p>Feed</p> */}
            <div className="w-[100%] mb-8">
                <CreatePost/>
            </div>
            {/* <div className="h-[0.9px] w-full bg-gray-300"></div> */}
            <div className="w-[100%]">
                <Posts/>
            </div>
        </div>
    );
}

export default Feed;
