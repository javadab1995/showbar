import dayjs from "dayjs";

export function getStatus(data, type) {
  const today = dayjs();

  const start = dayjs(data.start_date);
  const end = dayjs(data.end_date);

  if (data.status === "finished") {
    return {
      key: "finished",
      label: "پایان یافته",
    };
  }
if (data.status === "inactive") {
  return {
    key: "inactive",
    label:"غیرفعال",
  };
}

  if (today.isBefore(start)) {
    return {
      key: "planned",
      label:` شروع تا ${start.diff(today, "day")} روز دیگر` 
    };
  }

  if (today.isAfter(end)) {
    return {
      key: "finished",
      label: "پایان یافته",
    };
  }

  return {
    key: "active",
    label:type === "term" ? `  پایان تا ${end.diff(today, "day")} روز دیگر` : "فعال"
  }


 
}