import sharp from "sharp";

export const generateThumbnail = async (
  inputPath: string,
  outputPath: string,
  width = 300,
): Promise<void> => {
  try {
    // サムネイル生成
    await sharp(inputPath).resize(width).toFile(outputPath);
    console.log(`Thumbnail created at: ${outputPath}`);
  } catch (error) {
    console.error("Error generating thumbnail:", error);
  }
};
