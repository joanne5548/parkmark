/**
 * If no date is provided, return the current date
 */
export const formatDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date();
    return date.toLocaleDateString();
};
