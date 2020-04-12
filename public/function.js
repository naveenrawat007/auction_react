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
    return  monthNames[monthIndex]+ " " + day + ', ' + year;
  }
  else {
    return "";
  }
}
function formatFullDate(date) {
  if (date !== ""){
    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return  monthIndex+1+ "/" + day + '/' + year;
  }
  else {
    return "";
  }
}
function formatTime(time) {
  if (time !== ""){
    time = new Date(time)
    var hour = time.getHours();
    var minute = time.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    var ampm = "am";
    if( hour > 12 ) {
      hour -= 12;
      ampm = "pm";
    }
    return hour + ":" + minute + " " +ampm
  }
  else {
    return "";
  }
}

loadStripe = (key) => {

  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v2/";
    s.onload = () => {
      window['Stripe'].setPublishableKey(key);
    }
    window.document.body.appendChild(s);
  }
}
