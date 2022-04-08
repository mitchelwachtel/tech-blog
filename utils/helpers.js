module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
// ifEquals was used to determine if the current_user if viewing their own blog or their own comment
  ifEquals: (arg1, arg2) => {
    return arg1 === arg2;
  },
};
