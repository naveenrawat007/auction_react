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
