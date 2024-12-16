import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday } from "date-fns";
import { ja } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTimestamp = (): string => {
  return new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
};

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return "今日";
  } else if (isYesterday(date)) {
    return "昨日";
  } else {
    return format(date, "MM月dd日", { locale: ja });
  }
};
