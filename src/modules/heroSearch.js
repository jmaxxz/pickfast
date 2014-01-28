//require underscore

window = window || {};
window.dota =  window.dota || {};
window.dota.heroSearch = (function (){

  function match(query) {
    var heros = window.dota.heros;
    query = query || '';
    var result = [];

    for(var name in heros){
      if(name.indexOf(query) >= 0){
        result.push(heros[name]);
      }
    }

    return result;
  }

  return {
    match: match
  };
})();