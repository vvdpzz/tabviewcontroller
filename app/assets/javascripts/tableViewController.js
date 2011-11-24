/* ============================================================
 * Authors: Feiping Huang, Zheng-Yu Chen
 * ============================================================ */

!function( $ ){
  fetch = function(template, el, page, url, sortby, order) {
    $.get(url, {page: page, sortby: sortby, order: order}, function(data, textStatus, xhr) {
      if (page == 1){
        $(el).append(template(data));
        // generate load-more button
        var loadMore = $("<button/>").attr({class: "load-more", "data-page": 1 }).text("Load More...");
        $(el).append(loadMore);

        // bind load-more click event
        $(el).find(".load-more").live("click", function(){
          data = $(this).data();
          fetch(template, el, ++data.page, url, sortby, order);
        });
      } else {
        for(i in data){
          if (data[i].length > 0){
            $(el).find(".load-more").before(template(data));
          } else {
            $(el).find(".load-more").remove();
          }
          break;
        } 
      }
    });
  };
  $.fn.tableViewController = function(options) {
    options.sortby || (options.sortby = "created_at");
    options.order || (options.order = "asc");
    
    // compile the particular handlebar template
    var template = Handlebars.compile($(options.template).html());
    
    // fetch the initialize data
    fetch(template, this, 1, options.dataSource, options.sortby, options.order);
    
    return this;
  }
}( window.jQuery );