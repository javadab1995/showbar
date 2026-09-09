function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "همین الان";
  }

  if (minutes < 60) {
    return `${minutes} دقیقه پیش`;
  }

  const hours = Math.floor(minutes / 60);

  return `${hours} ساعت پیش`;
}
