String.prototype.toUpperCaseFirstChar = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

Number.prototype.currencyFormat = function () {
  return '$' + this.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
