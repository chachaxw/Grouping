;(function(){
    var man_all = [
        '刘克亮','吴亮亮','江育麟',
        '张彦蔚','毛阿斌','黄哲宇',
        '黄志坡','陈少芳','柯宇楠',
        '汪叶金','王潇','罗云志',
        '陈式坚','陈宇哲','周伟'
    ];
    var women_all = ['林素娜','张嘉炜','杨洁','李小霞','叶颖诗'];
    var all = man_all.concat(women_all);
    var group_num = 4;

    var flex = $('.flex-item');
    var btn = $('.start-button');

    btn.on('click', function() {

        if($('.group-list').attr('data-loading') == 'false') {
            var _this = $(this);
            $('.group-list').attr('data-loading', 'true');
            _this.text('WAITING').attr('disabled', true).addClass('loading active');

            var j = s(man_all, women_all, group_num, all);

            for(var i = 0, l = j.length; i < l ; i ++) {
                flex.eq(i).empty();
                var t1 = setTimeout((function(i) {
                    return function() {
                        for(var k = 0, h = j[i].length; k < h; k++) {
                            var t2 = setTimeout((function(k){
                                return function() {
                                    name = j[i][k];
                                    var span = '<div><span class="round animated bounceInDown">' + name + '</span></div>';

                                    flex.eq(i).append(span);
                                    if($('.group-list .round').length == all.length){
                                        $('.group-list').attr('data-loading', 'false');
                                        _this.text('START').attr('disabled', false).removeClass('loading active');
                                        return clearTimeout(t1), clearTimeout(t2);
                                    }
                                }
                            })(k), k * 1500);
                        }
                    }
                })(i), 1500 );
            }
        }else {
            $('.group-list').attr('data-loading', 'false');
            _this.text('START').attr('disabled', false).removeClass('loading active');
        }

    });

})();

function s(man_all, women_all, group_num, all) {
    man_all.sort(function () {
       return 0.5 - Math.random();
    });
    women_all.sort(function () {
       return 0.5 - Math.random();
    });
    all = man_all.concat(women_all);

    var rs = [];
    for (var k = 0; k < group_num; k++) {
       rs[k] = [];
    }
    for (var i = 0; i < all.length; i++) {
       rs[i % group_num].push(all[i]);
    }
    return rs;
}
