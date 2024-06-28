import {useRef} from "react";

function UserSaved() {
    const saves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const savedUrl = "https://cdn.pixabay.com/video/2023/01/25/147898-792811387_tiny.mp4"

	return (
        <div className="mt-5 flex flex-wrap gap-1 items-center justify-center">
            {
                saves.map((p, i) => {
                    const videoRef = useRef(null);
                    const handleMouseEnter = () => {
                        videoRef.current.play();
                    }
                    const handleMouseLeave = () => {
                        videoRef.current.pause();
                    }
                    const handleVideoEnd = () => {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                    }
                    return (
                        <div key={i}>
                            <video 
                                ref={videoRef}
                                controls
                                className="h-[400px] w-fit /*w-[350px]*/ rounded-lg hover:shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                                src={savedUrl}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onEnded={handleVideoEnd}
                                onClick={() => {
                                    window.open(savedUrl, '_blank')
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default UserSaved;
