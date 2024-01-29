import React from "react";

const Upload = () => {

    return (
        <div>
            <div className="bg-blue-100 rounded-lg p-8 mb-4 mt-4 w-38 h-38 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-blue-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <div className="ml-2 w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-blue-500 border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Upload;
