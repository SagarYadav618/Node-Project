module.exports=function (router) {
    router.get('/about', function (req, res) {
      console.log("abc")
        res.render('pages/about');
    });
  
  }
// module.exports = router;
