
var Book=require('../models/bookModel');
var Category=require('../models/categoryModel');


module.exports= function (router) {
    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    router.get('/doctor', function (req, res) {
        Book.find({}, function (err,doctor) {
            if(err){
                console.log(err);
            }
            var model={
                doctor: doctor
            };
            res.render('manage/doctor/index', model);
        });
    });

    router.get('/doctor/add', function (req, res) {
       Category.find({}, function (err, categories) {
           if(err){
               console.log(err);
           }

           var model={
               categories:categories
           };

           res.render('manage/doctor/add', model);
       });
    });

    router.post('/doctor', function (req, res) {
        var title=req.body.title && req.body.title.trim();
        var category=req.body.category && req.body.category.trim();
        var author=req.body.author && req.body.author.trim();
        var publisher=req.body.publisher && req.body.publisher.trim();
        var price=req.body.price && req.body.price.trim();
        var description=req.body.description && req.body.description.trim();
        var cover=req.body.cover && req.body.cover.trim();


        if(title==='' || price===''){
            req.flash('error', "Please fill out the required Fields");
            res.location('/manage/doctor/add');
            res.redirect('/manage/doctor/add');
        }

        if(isNaN(price)){
            req.flash('error', "Price must be a number");
            req.location('/manage/doctor/add');
            req.redirect('/manage/doctor/add');
        }

        var newBook= new Book({
            title:title,
            category:category,
            description:description,
            author:author,
            publisher:publisher,
            cover:cover,
            price:price
        });

        newBook.save(function (err) {
            if(err){
                console.log('Save Error', err)
            }

            req.flash('success', "Book added successfully");
            req.location('/manage/doctor');
            req.redirect('/manage/doctor');

        })
    });

    router.get('/doctor/edit/:id', function (req, res) {
        Category.find({}, function (err, categories) {
            Book.findOne({_id:req.params.id}, function (err,book) {
                if(err){
                    console.log(err);
                }

                var model={
                    book:book,
                    categories:categories
                };

                res.render('manage/doctor/edit', model)
            });
        });
    });


    router.post('/doctor/edit/:id', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();


        Book.update({_id:req.params.id},{
            title:title,
            category:category,
            description:description,
            author:author,
            publisher:publisher,
            cover:cover,
            price:price
        }, function (err) {
            if(err){
                console.log('update error', err);
            }

            req.flash('success', "Book Updated");
            res.location('/manage/doctor');
            res.redirect('/manage/doctor');
        });
    });


    //Delete Book
    router.post('/doctor/delete/:id', function (req, res) {
        Book.remove({_id: req.params.id},function (err) {
            if(err){
                console.log('Save Error', err)
            }

            req.flash('success', "Book Deleted");
            res.location('/manage/doctor');
            res.redirect('/manage/doctor');

        })
    });


    //Get categories
    router.get('/categories', function (req, res) {
       Category.find({}, function (err, categories) {
           if(err){
               console.log(err);
           }

           var model={
               categories: categories
           };

           res.render('manage/categories/index', model);
       })
    });


    //Display Category add Form
    router.get('/categories/add', function (req, res) {
        res.render('manage/categories/add');
    });

    //Add a new Category
    router.post('/categories', function (req, res) {
        var name= req.body.name && req.body.name.trim();

        if(name===''){
            req.flash('error', "Please fill out the required Fields");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }

        var newCategory=new Category({
            name: name
        });

        newCategory.save(function (err) {
            if (err){
                console.log('save err', err);
            }

            req.flash('success', "Category Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories')
        })
    });

    //Display Category edit form
    router.get('/categories/edit/:id', function (req, res) {
        Category.findOne({_id:req.params.id}, function (err,category) {
            if(err){
                console.log(err);
            }
            var model={
                category:category
            };
            res.render('manage/categories/edit', model);
        });
    });

    //Edit Categories
    router.post('/categories/edit/:id', function (req, res) {
        var name = req.body.name && req.body.name.trim();

       Category.update({_id:req.params.id}, {
           name:name
       }, function (err) {
           if(err){
               console.log('update error', err);
           }

           req.flash('success', "Category Updated");
           res.location('/manage/categories');
           res.redirect('/manage/categories');

       });
    });


    //Delete Category
    router.post('/categories/delete/:id', function (req, res) {
        Category.remove({_id: req.params.id},function (err) {
            if(err){
                console.log('Save Error', err)
            }

            req.flash('success', "Category Deleted");
            res.location('/manage/categories');
            res.redirect('/manage/categories');

        })
    });


};
