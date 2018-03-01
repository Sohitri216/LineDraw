$(function () {
    var mouseDownX = 0;
    var mouseDownY = 0;
    var elemClicked;
    var rect;
    var arrow;
    var paper = Raphael("svg_paper", 800, 600);

    function DrawArrow(x, y) {
    console.log('In Arrow');
        var element = paper.path("M" + x + " " + y);
        element.attr({
            stroke: "#111",
            "stroke-width": 4,
            "arrow-end": "classic-medium-medium"
        });
        return element;
    }


// Start, move, and up are the drag functions
    start = function () {
// storing original coordinates
        this.ox = this.attr("x");
        this.oy = this.attr("y");
        this.attr({
            opacity: 1
        });
        if (this.attr("y") < 60 && this.attr("x") < 60) this.attr({
            fill: "#f2f2f2"
        });
    }, move = function (dx, dy) {               

// Move will be called with dx and dy
        if (this.attr("y") > 600 || this.attr("x") > 800) this.attr({
            x: this.ox + dx,
            y: this.oy + dy
        });
        else {
            nowX = Math.min(800, this.ox + dx);
            nowY = Math.min(600, this.oy + dy);
            nowX = Math.max(0, nowX);
            nowY = Math.max(0, nowY);
            this.attr({
                x: nowX,
                y: nowY
            });                   
            
            if (this.attr("fill") != "#f2f2f2") this.attr({
                fill: "#f2f2f2"
            });
        }

    }, up = function () {
// restoring state
        this.attr({
            opacity: .5
        });
        if (this.attr("y") < 60 && this.attr("x") < 60) this.attr({
            fill: "#AEAEAE"
        });
    };

// Arrow button click
    $("#arrow").click(function (e) {
        console.log('Arrow click',e);
        $('#svg_paper').unbind('mousedown');
        $('#svg_paper').unbind('mousemove');
        $('#svg_paper').unbind('mouseup');

        $("#svg_paper").mousedown(function (e) {
            console.log('Arrow click 1',e);
// Prevent text edit cursor while dragging in webkit browsers
            e.originalEvent.preventDefault();

            var offset = $("#svg_paper").offset();
            mouseDownX = e.pageX - offset.left;
            mouseDownY = e.pageY - offset.top;
           
            arrow = DrawArrow(mouseDownX, mouseDownY);

            $("#svg_paper").mousemove(function (e) {
                var offset = $("#svg_paper").offset();
                var upX = e.pageX - offset.left;
                var upY = e.pageY - offset.top;

                var path = "M" + mouseDownX + " " + mouseDownY +
                        "L" + (upX > 0 ? upX : 0) + " " + (upY > 0 ? upY : 0);
                arrow.attr("path", path);
            });

        });

        $("#svg_paper").mouseup(function (e) {
            $('#svg_paper').unbind('mousemove');
            var BBox = arrow.getBBox();
            if (BBox.width == 0 && BBox.height == 0) arrow.remove();
        });

    });

// Clear canvas
    $("#clr").click(function (e) {
        paper.clear();
    });
});

(function () {
    console.log('1');
Raphael.fn.toJSON = function(callback) {
var
    data,
    elements = new Array,
    paper    = this
    ;

for ( var el = paper.bottom; el != null; el = el.next ) {
    data = callback ? callback(el, new Object) : new Object;

    if ( data ) elements.push({
        data:      data,
        type:      el.type,
        attrs:     el.attrs,
        transform: el.matrix.toTransformString(),
        id:        el.id
        });
}

var cache = [];
var o = JSON.stringify(elements, function (key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
});
cache = null;
return o;
}

Raphael.fn.fromJSON = function(json, callback) {
var
    el,
    paper = this
    ;

if ( typeof json === 'string' ) json = JSON.parse(json);

for ( var i in json ) {
    if ( json.hasOwnProperty(i) ) {
        el = paper[json[i].type]()
            .attr(json[i].attrs)
            .transform(json[i].transform);

        el.id = json[i].id;

        if ( callback ) el = callback(el, json[i].data);

        if ( el ) paper.set().push(el);
    }
}
}
})();