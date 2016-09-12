;(function(){
    var man_all = [
        {
            name: '周伟',
            avatar: 'images/zhouwei.png',
        }, {
            name: '程少芳',
            avatar: 'images/chengshaofang.png',
        }, {
            name: '陈宇哲',
            avatar: 'images/chenyuzhe.png',
        }, {
            name: '江育麟',
            avatar: 'images/jiangyulin.png',
        }, {
            name: '柯宇楠',
            avatar: 'images/keyunan.png',
        }, {
            name: '张彦蔚',
            avatar: 'images/zhangyanwei.png',
        }, {
            name: '李昌智',
            avatar: 'images/lichangzhi.png',
        }, {
            name: '李汉健',
            avatar: 'images/lihanjian.png',
        }, {
            name: '刘克亮',
            avatar: 'images/liukeliang.png',
        }, {
            name: '罗云志',
            avatar: 'images/luoyunzhi.png',
        }, {
            name: '毛阿斌',
            avatar: 'images/maoabing.png',
        }, {
            name: '王斌',
            avatar: 'images/wangbin.png',
        }, {
            name: '吴亮亮',
            avatar: 'images/wuliangliang.png',
        }, {
            name: '李汉健',
            avatar: 'images/lihanjian.png',
        }, {
            name: '汪金叶',
            avatar: 'images/wangjinye.png',
        }, {
            name: '王潇',
            avatar: 'images/wangxiao.png',
        },
    ];
    var women_all = [
        {
            name: '杨洁',
            avatar: 'images/yangjie.png',
        }, {
            name: '林素娜',
            avatar: 'images/linsuna.png',
        }, {
            name: '张嘉炜',
            avatar: 'images/zhangjiawei.png',
        }, {
            name: '谢昕怡',
            avatar: 'images/xiexinyi.png',
        }, {
            name: '叶颖诗',
            avatar: 'images/yeyinshi.png',
        }, {
            name: '彭敬嫦',
            avatar: 'images/pengjingchang.png',
        }
    ];

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
                    console.log(i);
                    return function() {
                        for(var k = 0, h = j[i].length; k < h; k++) {
                            var t2 = setTimeout((function(k){
                                return function() {
                                    name = j[i][k].name;
                                    avatar = j[i][k].avatar;
                                    var span = '<div><span class="round animated bounceInDown" style="background-image: url(' + avatar + ')"><span class="over-layout"></span>' + name + '</span></div>';
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
    console.log(rs);
    return rs;
}
