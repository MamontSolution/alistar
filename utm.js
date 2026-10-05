/* Передаёт UTM-метки из адреса страницы в ссылки на оформление займа.
   Метки запоминаются на время сессии, чтобы не терялись при переходах по сайту. */
(function(){
  var KEYS = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term', 'click_id', 'utm_referrer', 'click_hash'];
  var STORE = 'alistar_utm';
  var TARGET = 'celfin.ru/order';

  function collect(){
    var query = new URLSearchParams(window.location.search);
    var found = {};
    var has = false;
    KEYS.forEach(function(k){
      var v = query.get(k);
      if (v) { found[k] = v; has = true; }
    });
    try {
      if (has) sessionStorage.setItem(STORE, JSON.stringify(found));
      else found = JSON.parse(sessionStorage.getItem(STORE)) || {};
    } catch (e) {}
    return found;
  }

  function apply(){
    var params = collect();
    if (!Object.keys(params).length) return;
    document.querySelectorAll('a[href*="' + TARGET + '"]').forEach(function(a){
      var url = new URL(a.getAttribute('href'), window.location.href);
      Object.keys(params).forEach(function(k){ url.searchParams.set(k, params[k]); });
      a.setAttribute('href', url.toString());
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
