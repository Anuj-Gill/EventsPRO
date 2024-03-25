
export function Navbar() {
    

    return(
        <div className="flex border-black border-b-1 fixed right-0 left-0 top-0 justify-between shadow-md h-12 mt-3">
            <div className="text-[#FF8C00] font-bold text-xl pl-3 pt-1">
                EventsPRO
            </div>
            <div className="flex justify-between items-center">
                <button className="mr-3 bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full px-5 flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold">Home</button>
                <button className="mr-2 bg-transparent text-white border-[3px] border-[#FF8C00] rounded-full px-5 flex items-center transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold ">About</button>
            </div>
        </div>
        
    )
}