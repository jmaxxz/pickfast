describe('heroSearch', function() {
  var oldHeros;
  beforeEach(function(){
    oldHeros = window.dota.heros;
    window.dota.heros = {'Drow Ranger':{name:'Drow Ranger'}, 'Axe':{name:'Axe'}, 'Windranger':{name:'Windranger'}};
  });

  afterEach(function(){
    window.dota.heros = oldHeros;
  });

  var hs = window.dota.heroSearch;
  describe('.match', function(){
    var match = hs.match;

    it('is a function', function() {
      expect(typeof(match)).toEqual('function');
    });

    it('returns an array', function(){
      var result = match();
      expect(typeof(result)).toBe('object');
      expect(result.length).toBeDefined();
    });

    it('returns all hero\'s who\'s names contain the query', function (){
      var result = _.map(match('anger'),(function(v){return v.name;}));
      expect(_.contains(result, 'Drow Ranger')).toBe(true);
      expect(_.contains(result, 'Windranger')).toBe(true);
      expect(result.length).toBe(2);
    });

    it('treats no search term as an empty string', function (){
      expect(match()).toEqual(match(''));
    });
    it('"" returns all heros', function() {
      var result = match('');
      expect(result.length).toBe(3);
    });
  });
});