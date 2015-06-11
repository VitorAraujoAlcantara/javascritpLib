function tableFixedHeaderFooter(idHeader, idBody, idFooter) {
    var $body = $("#" + idBody),
            $header = $("#" + idHeader),
            $footer = $("#" + idFooter);
    
    if ( idHeader){
        document.getElementById(idHeader).classList.add('table-container-header');
    }
    
    if ( idBody){
        document.getElementById(idBody).classList.add('table-container-body');
    }
    
    if ( idFooter){
        document.getElementById(idFooter).classList.add('table-container-footer');
    }

     /*Get ScrollBar width(From: http://bootstrap-table.wenzhixin.net.cn/)*/
    var scrollBarWidth = (function () {
        var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                w1, w2;
        outer.append(inner);
        $('body').append(outer);
        w1 = inner[0].offsetWidth;
        outer.css('overflow', 'scroll');
        w2 = inner[0].offsetWidth;
        if (w1 === w2) {
            w2 = outer[0].clientWidth;
        }
        outer.remove();
        return w1 - w2;
    })();

    /* Scroll horizontal */
    $body.on('scroll', function () {
        $header.scrollLeft($(this).scrollLeft());
        $footer.scrollLeft($(this).scrollLeft());
    });

    /* Redraw Header/Footer */
    var redraw = function () {
        var tds = $body.find("> table > tbody > tr:first-child > td");
        tds.each(function (i) {
            var width = $(this).innerWidth(),
                    lastPadding = (tds.length - 1 === i ? scrollBarWidth : 0);
            lastHeader = $header.find("th:eq(" + i + ")").innerWidth(width + lastPadding);
            lastFooter = $footer.find("th:eq(" + i + ")").innerWidth(width + lastPadding);
        });
    };

    /* Selection */
    $body.find("> table > tbody > tr > td").click(function (e) {
        $body.find("> table > tbody > tr").removeClass("info");
        $(e.target).parent().addClass('info');
    });

    /* Listen to Resize Window */
    $(window).resize(redraw);
    redraw();
}

