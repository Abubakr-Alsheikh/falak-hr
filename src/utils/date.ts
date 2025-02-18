export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "غير محدد"; // Or any other placeholder
  }
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG"); // Format as Arabic date
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "تاريخ غير صالح";
  }
};
