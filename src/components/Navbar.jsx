
export function Navbar() {
    

    return(
        <div className="flex bg-white border-black border-b-1 fixed right-0 left-0 top-0 justify-between p-2 h-12">
            <div className="text-blue-900 font-bold text-xl">
                EventsPRO
            </div>
            <div>
                <button className="mr-3">Home</button>
                <button className="mr-2">About</button>
            </div>
        </div>
        
    )
}