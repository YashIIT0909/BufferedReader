const LoadingCircle = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full p-5">
            <div
                className="border-4 border-black/10 border-t-[#3498db] rounded-full w-10 h-10 animate-spin mb-2.5"
            // Tailwind's animate-spin uses @keyframes spin
            ></div>
            <p className="text-base text-[#333] m-0">{message}</p>
        </div>
    );
};

export default LoadingCircle;