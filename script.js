/* ==========================================================
   Kimana Gas Express — WhatsApp order link generator
   ========================================================== */
(function () {
  "use strict";

  // Business WhatsApp number in international format (no + or leading 0)
  var WHATSAPP_NUMBER = "254113556385";

  /**
   * Builds a wa.me link for a given product/service name.
   * @param {string} productName
   * @returns {string} full wa.me URL
   */
  function buildWhatsAppLink(productName) {
    var message;

    if (!productName || productName.trim().toLowerCase() === "general enquiry") {
      message =
        "Hello Kimana Gas, I would like to make an enquiry / place an order. " +
        "Please assist me with delivery to my location in Kimana.";
    } else {
      message =
        "Hello Kimana Gas, I would like to order a " +
        productName.trim() +
        " to be delivered to my location in Kimana.";
    }

    var encodedMessage = encodeURIComponent(message);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodedMessage;
  }

  /**
   * Intercepts a click on any element carrying a data-product attribute,
   * builds the correct WhatsApp deep link, and opens it in a new tab.
   */
  function handleOrderClick(event) {
    event.preventDefault();
    var target = event.currentTarget;
    var productName = target.getAttribute("data-product") || "General Enquiry";
    var link = buildWhatsAppLink(productName);
    window.open(link, "_blank", "noopener");
  }

  function init() {
    var orderTriggers = document.querySelectorAll("[data-product]");
    orderTriggers.forEach(function (el) {
      el.addEventListener("click", handleOrderClick);
    });

    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
