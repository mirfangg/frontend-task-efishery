export const formatPriceIDR = (x) => {
  return `Rp ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (!isNaN(date.getTime())) {
    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}-${month}-${year}`;
  }
};
