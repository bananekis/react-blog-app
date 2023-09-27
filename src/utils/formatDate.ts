import { format } from "date-fns";
import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd.MM.yyyy");
};

export const formatTimeAgo = (isoDate: string) => {
  const date = parseISO(isoDate);
  return formatDistanceToNow(date, { addSuffix: true });
};
