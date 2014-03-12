//require underscore

window = window || {};
window.dota =  window.dota || {};
window.dota.counterPicker = (function (){

  function counter(team) {
    var heros = window.dota.heros;
    var matches = [];
    for (var i in heros) {
      var currentHero = heros[i];
      var matchUpScore  = 0;

      if(team.indexOf(i) >= 0) continue;

      for (var j = team.length - 1; j >= 0; j--) {
        var tMem = team[j];
        var winningness = currentHero.winningMatchups[tMem];

        if(winningness){
          matchUpScore += winningness;
        }
      }

      if(matchUpScore > 0){
        matches.push({name:i, score:matchUpScore});
      }

    }

    return matches.sort(function(a, b){ return b.score - a.score; });
  }

  return {
    counter:counter
  };
})();