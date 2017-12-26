import '../css/core.css';
import '../css/index.scss';
import '../css/dialog.css';

;(function($) {
  H.index = {
    init: function () {
      var me = this;
      me.event();
    },
    event: function () {
      $("#main").bind('touchend',function (e) {
        e.preventDefault();
        toUrl('vote.html');
      });
      $("#rule").bind('touchend',function (e) {
        e.preventDefault();
        e.stopPropagation();
        H.dialog.rule.open();
      })
      
    }
  };
})(Zepto);
$(function() {
  H.index.init();
});