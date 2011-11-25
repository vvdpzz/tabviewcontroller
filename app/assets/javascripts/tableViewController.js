/* ============================================================
 * Authors: Feiping Huang, Zheng-Yu Chen
 * ============================================================ */

!function( $ ){
  fetch = function(el, template, dataSource, params) {
    var loadMore = $(el).find(".load-more");
    var blueText = loadMore.find(".blue-text");
    var spinner = loadMore.find(".spinner");
    blueText.hide();
    spinner.show();
    $.get(dataSource, params, function(data, textStatus, xhr) {
      for(var i in data){
        if (data.hasOwnProperty(i)){
          if (data[i].length > 0){
            loadMore.before(template(data));
            spinner.hide();
            blueText.show();
          } else {
            loadMore.remove();
          }
          break;
        }
      }
    });
  };
  $.fn.tableViewController = function(options) {
    options.sortby || (options.sortby = "created_at");
    options.order || (options.order = "asc");
    
    var params = {page: 1, sortby: options.sortby, order: options.order}
    
    // compile the particular handlebar template
    var template = Handlebars.compile($(options.template).html());
    
    // generate load-more button
    var loadMore = $('<div/>').addClass("load-more")
    .append('<div class="blue-text">载入更多</div>')
    .append('<div class="spinner">').data("page", 1);
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