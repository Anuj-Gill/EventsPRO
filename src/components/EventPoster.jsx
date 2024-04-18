import { useEffect, useState } from "react";


export function EventPoster({ driveLink }) {
    const [posterURL, setPosterURL] = useState();

    useEffect(() => {
        function extractEmbedCode(driveLink) {
            const fileId = driveLink.match(/[-\w]{25,}/)[0]; // Extract file ID
            const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            setPosterURL(embedUrl);
        }
        extractEmbedCode(driveLink);
    }, []);

    return (
        <div className="poster-container mt-12 ml-5"> {/* A container for poster */}
            <iframe src={posterURL} width="340" height="480" allow="autoplay"></iframe>
        </div>
    )


}