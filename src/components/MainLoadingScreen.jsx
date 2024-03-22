
export function MainLoadingScreen() {

    return (
        <div className="">
            <div className="bg-black flex w-screen h-screen text-white justify-center items-center text-6xl font-fira-mono bg-glow">
                <span className="loading-char" style={{ animationDelay: '0.15s' }}>E</span>
                <span className="loading-char" style={{ animationDelay: '0.30s' }}>v</span>
                <span className="loading-char" style={{ animationDelay: '0.45s' }}>e</span>
                <span className="loading-char" style={{ animationDelay: '0.60s' }}>n</span>
                <span className="loading-char" style={{ animationDelay: '0.75s' }}>t</span>
                <span className="loading-char" style={{ animationDelay: '0.90s' }}>s</span>
                <span className="loading-char" style={{ animationDelay: '1.05s' }}>P</span>
                <span className="loading-char" style={{ animationDelay: '1.20s' }}>R</span>
                <span className="loading-char" style={{ animationDelay: '1.35s' }}>O</span>
            </div>
        </div>
    )
}