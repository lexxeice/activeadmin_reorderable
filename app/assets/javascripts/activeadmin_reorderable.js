$.fn.reorderable = function(opts) {
  // This helper fixes the table row width collapsing when being dragged
  function reorderableTableHelper(e, ui) {
    ui.children().each(function() {
      var $cell = $(this);

      $cell.width($cell.width());
    });

    return ui;
  }

  // This helper sets the table row placeholder height to the height of the row being moved
  function reorderableTableStart(e, ui) {
    ui.placeholder.height(ui.helper.outerHeight());

    return ui;
  }

  function reorderableTableStop(e, ui) {
    var currentPosition, newPosition, nextPosition, prevPosition,
        $row    = ui.item,
        $rows   = $row.parent().children('tr'),
        $table  = $row.closest('table'),
        $handle = $row.find('.reorder-handle'),
        url     = $handle.data('reorder-url'),
        index   = function(i) { return $rows.index(i) + 1; };

    $table.find('tbody tr').each(function(index) {
      var $row     = $(this),
          newClass = ''

      $row.removeClass('odd').removeClass('even');

      if ((index + 1) % 2 == 0) {
        newClass = 'even';
      } else {
        newClass = 'odd';
      }

      $row.addClass(newClass);
    });

    currentPosition = $row.find(".col-position").text();
    prevPosition = $row.prev().find(".col-position").text();
    nextPosition = $row.next().find(".col-position").text();

    if ( currentPosition < nextPosition ) {
      newPosition = prevPosition;
    } else {
      newPosition = nextPosition || prevPosition;
    }

    console.log(currentPosition)

    $row.find('.col-position').text(newPosition);

    $.post(url, { position: newPosition }, function () {
      window.location.reload();
    });
  }

  return this.each(function() {
    var opts = $.extend({
      items:  'tbody tr',
      handle: '.reorder-handle',
      axis:   'y',
      helper: reorderableTableHelper,
      start:  reorderableTableStart,
      stop:   reorderableTableStop,
    }, opts || {});

    $(this).sortable(opts);
  });
};

$(function() {
  $('.aa-reorderable').reorderable();
});
