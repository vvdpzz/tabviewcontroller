/* ============================================================
 * Authors: Feiping Huang, Zheng-Yu Chen
 * ============================================================ */

!function( $ ){
  fetch = function(el, template, dataSource, params, callback) {
    $.get(dataSource, params, function(data, textStatus, xhr) {
      for(i in data){
        if (data[i].length > 0){
          $(el).find(".load-more").before(template(data));
        } else {
          $(el).find(".load-more").remove();
        }
        break;
      }
      if (callback) callback(el);
    });
  };
  $.fn.tableViewController = function(options) {
    options.sortby || (options.sortby = "created_at");
    options.order || (options.order = "asc");
    
    var params = {page: 1, sortby: options.sortby, order: options.order}
    
    // compile the particular handlebar template
    var template = Handlebars.compile($(options.template).html());
    
    // generate load-more button
    var loadMore = $("<button/>").attr({class: "load-more", "data-page": 1 }).text("Load More...").hide();
    this.append(loadMore);
    
    var that = this;

    // bind load-more click event
    this.find(".load-more").live("click", function(){
      data = $(this).data();
      params.page = ++data.page
      fetch(that, template, options.dataSource, params, null);
    });
    
    var callback = function(el){
      $(el).find(".load-more").show();
    }
    
    // fetch the initialize data
    fetch(this, template, options.dataSource, params, callback);
    
    return this;
  }
}( window.jQuery );