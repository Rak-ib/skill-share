// import React from 'react';
import { useState } from 'react';
import { FaVideo } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { TfiWrite } from 'react-icons/tfi';

const EachModule = ({ module,luck }) => {
    // console.log(module)

    const { module_id, module_name, module_video, module_liveClass, video_link } = module;
    const [videos, setVideos] = useState(video_link);
    // console.log("all video link:", videos)

    return (
        <div>
            <div className="collapse collapse-arrow bg-base-200 border-2">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className={`collapse-title text-xl font-medium flex flex-row`}>
                    <div className={` bg-green-400 w-20 h-20  flex flex-row items-center justify-center text-center rounded-lg px-4`}>
                        <p className="font-bold  text-white text-lg">Moudle {module_id}</p>
                    </div>
                    <div className="ml-4">
                        <p> {module_name}</p>
                        <div className="flex flex-row md:gap-4 mt-2">
                            <p className="flex flex-row gap-1  text-sm items-center"><FaVideo></FaVideo> {module_liveClass} টি লাইভ ক্লাস </p>
                            <p className="flex flex-row gap-1 text-sm  items-center"><TfiWrite></TfiWrite> ১ টি এসাইনমেন্ট</p>
                            <p className="flex flex-row gap-1 text-sm  items-center"><RiPagesLine></RiPagesLine> ২ টি টেস্ট</p>
                        </div>
                    </div>
                </div>

                <div className="collapse-content ">



                    {
                        videos.map(video => <div key={video.video_number} className="border-t-2  border-b-2 border-gray-300 py-4 my-4 ">
                            <div className="flex flex-row gap-2">
                                <p className="font-medium">video number: {video.video_number} </p>
                                <button className="bg-black font-semibold text-white px-2 py-1 text-sm rounded-full">Topic: {video.video_topic}</button>
                            </div>
                            <p className="font-semibold text-xl my-2">Introduction to PHP</p>
                            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Open Modal</button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                                    </form>
                                    {luck? <video controls width="100%" height="auto">
                                        <source src={video.video_link} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video> : <p>Enroll to watch </p> }
                                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                </div>
                            </dialog>
                        </div>)
                    }




                </div>

            </div>
        </div>
    );
};

export default EachModule;