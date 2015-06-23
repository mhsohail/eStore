
var Invoice = JSON.parse(localStorage.getItem("Invoice"));
var invoiceHtml = "<tr><td>Transaction ID</td><td>" + Invoice.TransactionID + "</td></tr>";
invoiceHtml += "<tr><td>Message</td><td>" + Invoice.Message + "</td></tr>";
invoiceHtml += "<tr><td>Amount</td><td>" + Invoice.Amount + "</td></tr>";

document.getElementById("invoice").innerHTML = invoiceHtml;