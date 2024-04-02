
export function Navbar() {
    

    return (
        <div className="flex border-black fixed right-0 left-0 top-0 justify-between shadow-md h-12  index-2 backdrop-blur-md p-3 items-center">
            <div className="  text-[#FF8C00] font-bold text-2xl pl-3 pt-4">
                EventsPRO
            </div>
            <div className="flex justify-between items-center mt-4">
                <button className="mr-3 w-32 justify-center bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full py-1 px-6 flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold">Home</button>
                <button className="mr-2 w-32 justify-center bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full py-1 px-[4px] flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold">About</button>
            </div>
        </div>
    )
    
}