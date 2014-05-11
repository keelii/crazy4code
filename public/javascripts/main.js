$(function() {
    var exchangeCode = $('#exchange_code');

    exchangeCode.click(function() {
        var codeIn = $('#code-in');
        var codeOut = $('#code-out');
        var temp;

        temp = codeIn.val();
        codeIn.val(codeOut.val());
        codeOut.val(temp);
    });

    if (cfg.formatType) {
        $('#format-type').val(cfg.formatType);
    }
});

$(document).foundation();