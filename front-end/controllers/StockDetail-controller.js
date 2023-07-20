export function convertDateToId(data) {
    return data.map(item => {
      const { date, ...rest } = item;
      return { ...rest, x: date };
    });
  }