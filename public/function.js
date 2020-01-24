function format_currency(number) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return formatter.format(number)
}

function custom_accord() {
  $("div.accordion  button").click(function() {
    $(this).parent().parent().toggleClass("show_plus")
  })
}
function formatDate(date) {
  if (date !== ""){
    date = new Date(date)
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  else {
    return "";
  }
}
