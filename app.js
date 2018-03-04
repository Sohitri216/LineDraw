var mouseDownX, mouseDownY, arrow, svgFrame, paper,lineDrawn;
var elem_sr = document.getElementById('left_D3line1');
divDimension_sr = elem_sr.getBoundingClientRect();
var elem_des = document.getElementById('right_D3line1');
divDimension_des = elem_des.getBoundingClientRect();
console.log('data 1 box:', divDimension_sr.top, divDimension_sr.height);
mouseDownX = 0;
mouseDownY = 0;
svgFrame = document.getElementById("svg_paper");
paper = Raphael("svg_paper", 800, 600);

function DrawArrow(x, y) {
    console.log('In Arrow', x, y);
    var element = paper.path("M" + x + " " + y);
    element.attr({
        stroke: "#111",
        "stroke-width": 4,
        "arrow-end": "classic-medium-medium"
    });
    return element;
}

var mousemove = function (e) {
    var offset = svgFrame.getBoundingClientRect();
    var upX = e.clientX;
    var upY = e.clientY;
    var path = "M" + mouseDownX + " " + mouseDownY +
        "L" + (upX > 0 ? upX : 0) + " " + (upY > 0 ? upY : 0);
    arrow.attr("path", path);
};

var mouseup = function (e) {
    svgFrame.removeEventListener('mousemove', mousemove, true);
    // var BBox = arrow.getBBox();
    // if (BBox.width == 0 && BBox.height == 0) arrow.remove();
    if ((e.clientX > divDimension_des.left + divDimension_des.width || e.clientX < divDimension_des.left) ||
        e.clientY > divDimension_des.top + divDimension_des.height || e.clientY < divDimension_des.top) {
        arrow.remove();
        // svgFrame.removeEventListener("mouseup", mouseup, true);
    }
    else {
        console.log('Arrow placed');
        lineDrawn=true;
    }
}

svgFrame.addEventListener("mousedown", function (e) {
    console.log('Arrow click 1', e);
    // Prevent text edit cursor while dragging in webkit browsers
    e.preventDefault();
    // console.log('clicked:', e.pageX, e.pageY);
    var offset = svgFrame.getBoundingClientRect();
    console.log('client x, client y', e.clientX, e.clientY);
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    if ((mouseDownY < divDimension_sr.top + divDimension_sr.height && mouseDownY > divDimension_sr.top) &&
        (mouseDownX < divDimension_sr.left + divDimension_sr.width && mouseDownX > divDimension_sr.left) && !lineDrawn) {
        arrow = DrawArrow(mouseDownX, mouseDownY);
        svgFrame.addEventListener("mousemove", mousemove, true);
        svgFrame.addEventListener('mouseup', mouseup, true);
    }
    else {
        console.log('not in range');
        svgFrame.removeEventListener('mousemove', mousemove, true);
        svgFrame.removeEventListener("mouseup", mouseup, true);

    }
    // svgFrame.addEventListener("mousemove", mousemove, true)
});

// svgFrame.addEventListener('mouseup', mouseup, true);

function clearCanvas() {
    paper.clear();
    lineDrawn=false;
}

