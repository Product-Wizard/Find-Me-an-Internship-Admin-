import React from "react";

interface BlockLoadingIndicatorInterface {
  text?: string;
}
function BlockLoadingIndicator({ text = "" }: BlockLoadingIndicatorInterface) {
  return (
    <div className='fixed flex items-center justify-center top-0 left-0 z-50 bg-[rgba(255,255,255,0.7)] h-screen w-screen'>
      <div className='mb-2 border-2 h-10 w-10 rounded-full border-b-black animate-spin'></div>
      {text ? (
        <p className='text-center font-thin text-lg text-gray-600'>text</p>
      ) : null}
    </div>
  );
}

export default BlockLoadingIndicator;
