/* ============================================================
 * Authors: Feiping Huang, Zheng-Yu Chen
 * ============================================================ */

!function( $ ){
  fetch = function(el, template, dataSource, params) {
    $.get(dataSource, params, function(data, textStatus, xhr) {
      var loadMore = $(el).find(".load-more");
      for(i in data){
        if (data[i].length > 0){
          loadMore.before(template(data));
        } else {
          loadMore.remove();
        }
        break;
      }
      if (params.page == 1) loadMore.show();
    });
  };
  $.fn.tableViewController = function(options) {
    options.sortby || (options.sortby = "created_at");
    options.order || (options.order = "asc");
    
    var params = {page: 1, sortby: options.sortby, order: options.order}
    
    // compile the particular handlebar template
    var template = Handlebars.compile($(options.template).html());
    
    // generate load-more button
    var loadMore = $("<button/>").addClass("load-more").text("Load More...").data("page", 1).hide();
    this.append(loadMore);
    
    var that = this;

    // bind load-more click event
    this.find(".load-more").live("click", function(){
      params.page = ++$(this).data().page
      fetch(that, template, options.dataSource, params);
    });
    
    // fetch the initialize data
    fetch(this, template, options.dataSource, params);
    
    return this;
  }
}( window.jQuery );