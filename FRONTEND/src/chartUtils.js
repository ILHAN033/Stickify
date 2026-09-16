const dayInMilliseconds = 86400000;

const formatDay = (date, options) =>
  new Intl.DateTimeFormat("en-US", options).format(date);

export const getChartData = (items, range, currentTime) => {
  const totalDays = range === "7" ? 7 : 30;
  const bucketSize = range === "7" ? 1 : 5;
  const endOfToday = new Date(currentTime);

  endOfToday.setHours(24, 0, 0, 0);

  const buckets = Array.from(
    { length: totalDays / bucketSize },
    (_, index) => {
      const end = new Date(
        endOfToday.getTime() - index * bucketSize * dayInMilliseconds
      );
      const start = new Date(
        end.getTime() - bucketSize * dayInMilliseconds
      );

      return { start, end };
    }
  ).reverse();

  const counts = buckets.map(({ start, end }) =>
    items.filter((item) => item.id >= start.getTime() && item.id < end.getTime()).length
  );
  const maximum = Math.max(...counts, 0);
  const labels = buckets.map(({ start, end }) => {
    if (bucketSize === 1) {
      return formatDay(start, { weekday: "short" });
    }

    return `${formatDay(start, { month: "short", day: "numeric" })}-${formatDay(
      new Date(end.getTime() - dayInMilliseconds),
      { day: "numeric" }
    )}`;
  });

  return {
    labels,
    counts,
    values: counts.map((count) => (maximum ? (count / maximum) * 100 : 0)),
  };
};