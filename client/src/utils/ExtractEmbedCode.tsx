export const extractEmbedCode = (driveLink: string): string | null => {
  try {
    const fileIdMatch = driveLink.match(/[-\w]{25,}/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[0];
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return embedUrl;
    }
  } catch (error) {
    console.error("Error extracting Drive link:", error);
  }
  return null;
};    

