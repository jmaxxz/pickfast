describe('counterPicker', function() {
  var oldHeros;
  beforeEach(function(){
    oldHeros = window.dota.heros;
    window.dota.heros = {
      'little rock':{
        winningMatchups: {
          'scissors': 1
        }
      },
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
      expect(counters[0].name).toBe('rock');
      expect(counters.length).toBe(2);
    });
    it('Also lists a little rock as ok counter scissors',function (){
      var counters = cp.counter(['scissors']);
      expect(counters[1].name).toBe('little rock');
      expect(counters.length).toBe(2);
    });
  });
});