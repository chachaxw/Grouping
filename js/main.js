$(document).ready(function() {
    var allMan = data.man_all,
        allWomen = data.women_all,
        num = 4,
        time = 3000;

    initBtn(allMan, allWomen, num, time);
    
});

// 分组动画效果1
function getGroup(allMan, allWomen, num, time){

    var all = allMan.concat(allWomen);

    var flex = $('.flex-item>div');
    var btn = $('.start-button');

    btn.on('click', function() {

        if($('.group-list').attr('data-loading') == 'false') {
            var _this = $(this);
            $('.group-list').attr('data-loading', 'true');
            _this.text('WAITING').attr('disabled', true).addClass('loading active');

            var j = s(allMan, allWomen, num, all);
            console.log(j);
            for(var i = 0, l = j.length; i < l ; i += 1) {
                flex.eq(i).empty();
                var t1 = setTimeout((function(i) {
                    return function() {
                        for(var k = 0, h = j[i].length; k < h; k += 1) {
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
                            })(k), k * time);
                        }
                    }
                })(i), time);
            }
        }else {
            $('.group-list').attr('data-loading', 'false');
            _this.text('START').attr('disabled', false).removeClass('loading active');
        }

    });

}

/**
 * 分组算法
 * @param man_all 男生总数
 * @param women_all 女生总数
 * @param group_num 分组数
 * @param all 总人数
 * @return rs 分组结果
 */
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

/**
 * 二维数组整理
 */
function z(arr) {
  var newArr = [];
  for(var i = 0, l = arr.length; i < l ; i += 1) {
    for(var k = 0, h = arr[i].length; k < h; k += 1) {
      newArr.push({
        id: i,
        user: arr[i][k],
      });
    }
  }

  return newArr;
}

/**
 * 按钮点击效果
 */
function initBtn(allMan, allWomen, num, time) {
  var btn = $('.start-button');
  var isGrouping = false;
  var turbVal = { val: 0.000001 };
  var turbValX = { val: 0.000001 };
  var turb = $('#filter feTurbulence')[0];

  var btnTl = new TimelineLite({
    paused: true,
    onUpdate: function() {
      turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
    },
    onComplete: function() {
      btnTl.reverse();
    },
    onReverseComplete: function() {
      btnTl.restart();
    }
  });
  btnTl.to(turbValX, 0.6, { val: 0.02, ease: Power0.easeNone }, 0);
  btnTl.to(turbVal, 0.1, { val: 0.02 ,ease: Power0.easeNone }, 0);

  btn.on('click', function() {
    if(isGrouping) {
      btn.text('START');
      btnTl.pause()
      var btnTl2 = new TimelineLite({
        onUpdate: function() {
          turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
        }
      });
      btnTl2.to(turbVal, 0.1, { val: 0.000001 });
      btnTl2.to(turbValX, 0.1, { val: 0.000001 }, 0);
      isGrouping = false;
    } else {
      btn.text('WAITING');
      btnTl.play();
      isGrouping = true;
    }
  });
}
