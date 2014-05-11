var UglifyJS = require("uglify-js");
var beautifyJS = require('js-beautify').js_beautify;
var beautifyCSS = require('js-beautify').css;
var beautifyHTML = require('js-beautify').html;

var CleanCSS = require('clean-css');

var Html4Entities = require('html-entities').AllHtmlEntities;
var html4Entities = new Html4Entities();

function codeYouWill(source, opts) {
    var result;
    var beautifyConfigs = {
        "indent_size": opts.indentSize || 4,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": opts.indentWithTabs || false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0
    };

    if (opts.type === 'compress_js') {
        var ast = UglifyJS.parse(source);
        ast.figure_out_scope();
        var compressor = UglifyJS.Compressor({
            // "ascii-only": true,
            "drop_console": opts.removeConsole
        });
        ast = ast.transform(compressor, function(r) {
            console.log(r);
        });
        result = ast.print_to_string();
    }
    if (opts.type === 'beautyfiy_js') {
        result = beautifyJS(source, beautifyConfigs);
    }
    if (opts.type === 'beautyfiy_html') {
        result = beautifyHTML(source, beautifyConfigs);
    }
    if (opts.type === 'beautyfiy_css') {
        result = beautifyCSS(source, beautifyConfigs);
    }
    if (opts.type === 'compress_css') {
        // result = compressCSS(source, 0);
        result = new CleanCSS({}).minify(source);
    }
    if (opts.type === 'encode_html') {
        result = html4Entities.encode(source);
    }
    if (opts.type === 'decode_html') {
        result = html4Entities.decode(source);
    }
    return result;
}

function init(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Crazy4code'
        });
    });

    app.get('/regexp', function(req, res) {
        res.render('regexp', {
            title: 'Regexp - Crazy4code'
        });
    });
    app.get('/thanks', function(req, res) {
        res.render('thanks', {
            title: 'thanks - Crazy4code'
        });
    });

    app.get('/tools', function(req, res) {
        res.render('tools', {
            title: 'tools - Crazy4code'
        });
    });
    app.post('/tools', function(req, res) {
        var source = req.body.source;
        var type = req.body['format_type'];
        var removeConsole = typeof req.body['remove_console'] !== 'undefined';
        var indentWithTabs = typeof req.body['indent_with_tabs'] !== 'undefined';
        var indentSize = req.body['indent_size'];

        var result, error;

        try {
            result = codeYouWill(source, {
                type: type,
                removeConsole: removeConsole,
                indentWithTabs: indentWithTabs,
                indentSize: indentSize
            });
        } catch (e) {
            error = e;
        }


        res.render('tools', {
            title: 'tools - Crazy4code',
            type: type,
            source: source,
            result: result,
            error: error
        });
    });
}


module.exports = init;