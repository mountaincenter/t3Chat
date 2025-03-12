import fs from "fs/promises";

/**
 * 指定したファイルを一定期間後に削除する
 * @param filePath 削除対象のファイルパス
 * @param daysAfter 削除までの日数（デフォルト7日）
 */
export const scheduleFileDeletion = async (
  filePath: string,
  daysAfter = 7,
): Promise<void> => {
  const millisecondsInDay = 86400000; // 1日をミリ秒に変換

  setTimeout(() => {
    fs.unlink(filePath)
      .then(() => console.log(`File deleted: ${filePath}`))
      .catch((error) =>
        console.error(`Failed to delete file: ${filePath}`, error),
      );
  }, daysAfter * millisecondsInDay);
};
