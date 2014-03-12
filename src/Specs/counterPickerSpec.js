describe('counterPicker', function() {
  var oldHeros;
  beforeEach(function(){
    oldHeros = window.dota.heros;
    window.dota.heros = {
      'rock':{
        winningMatchups: {
          'scissors': 3
        }
      },
      'scissors':{
        winningMatchups: {
          'paper': 3
        }
      },
      'paper':{
        winningMatchups: {
          'rock': 3
        }
      }
  };
  });

  afterEach(function(){
    window.dota.heros = oldHeros;
  });

  var cp = window.dota.counterPicker;
  describe('.counter', function(){
    it('picks rock to counter scissors',function (){
      var counters = cp.counter(['scissors']);
      expect(counters[0]).toBe('rock');
      expect(counters.length).toBe(1);
    });
  });
});