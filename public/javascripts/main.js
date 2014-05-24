$(function() {
    var exchangeCode = $('#exchange_code');
    var chooseFont = $('#choose-font');
    var charactorList = $('#charactor-list');
    var fsAdd = $('#fs-add');
    var fsReduce = $('#fs-reduce');
    var fontResult = $('#font-result');
    var indentWithTabs = $('#indent_with_tabs');

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

    function setFontResult() {
        var fontName = charactorList.css('font-family');
        var fontSize = charactorList.css('font-size');

        fontResult.val( 'font-size:' + fontSize + '; ' + 'font-family:' + fontName );
    }

    chooseFont.bind('change', function() {
        var fontName = $(this).val();
        charactorList.css('font-family', fontName);

        setFontResult();
    });
    charactorList.delegate('li', 'click', function() {
        $(this).toggleClass('actived');
    });
    fsAdd.bind('click', function() {
        var currentSize = parseInt(charactorList.css('font-size'), 10);

        charactorList.css('font-size', currentSize += 2);
        setFontResult();
    });
    fsReduce.bind('click', function() {
        var currentSize = parseInt(charactorList.css('font-size'), 10);

        charactorList.css('font-size', currentSize -= 2);
        setFontResult();
    });

    indentWithTabs.bind('change', function() {
        var isChecked = $(this).is(':checked');
        $('input[name="indent_size"]').prop('checked', false);
        if ( isChecked ) {
            $('#indent_size_1').prop('checked', true);
        } else {
            $('#indent_size_4').prop('checked', true);
        }
        
    });
});

$(document).foundation();