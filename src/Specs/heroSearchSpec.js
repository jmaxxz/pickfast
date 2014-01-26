describe('heroSearch', function() {
  var hs = window.dota.heroSearch;
  it("has a match function", function() {
    expect(typeof(hs.match)).toEqual('function');
  });
});