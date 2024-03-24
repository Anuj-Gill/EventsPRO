
export function Navbar() {
    

    return(
        <div className="flex bg-white border-black border-b-1 fixed right-0 left-0 top-0 justify-between shadow-md p-2 h-12">
            <div className="text-[#FF8C00] font-bold text-xl">
                EventsPRO
            </div>
            <div className="flex justify-between items-center">
                <button className="mr-3 bg-transparent border-[3px] border-[#FF8C00] rounded-full px-5">Home</button>
                <button className="mr-2 bg-transparent border-[3px] border-[#FF8C00] rounded-full px-5">About</button>
            </div>
        </div>
        
    )
}