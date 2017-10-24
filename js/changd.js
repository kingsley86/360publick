function CloseDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
}
function ShowDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'block';
    document.getElementById(bg_div).style.display = 'block';
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
    $("#" + bg_div).height($(document).height());
}


function setvendor(o, name) {
    var val = $(o).val();
    var service = '';
    var tag = '';
    var adv = '';

    if (name == 'service') {
        $("input[name^=service]:checked").each(function() {
            service += $(this).val() + ",";
        });
        service = service.replace(/,$/, "");

        val = service;
    }
    
    if (name == 'spa_tag') {
        $("input[name^=tag]:checked").each(function() {
            tag += $(this).val() + ",";
        });
        tag = tag.replace(/,$/, "");

        val = tag;
    }

    if (name == 'advantage') {
        $("input[name^=adv]:checked").each(function() {
            adv += $(this).val() + ",";
        });
        adv = adv.replace(/,$/, "");
        val = adv;
    }

    if (Trim(name,'g') != '') {

        $.get('setvendor', {'name': name, 'val': val}, function(data) {

            if (data.int == 1) {

                $('#save').removeAttr("disabled");
            }

        }, 'json')

    }
}

function logout() {
    var url = $('#return_url').val();


    $.get('logout_url_' + url + '.html', function(data) {
        alert("退出成功！");

    })

    $.getJSON("http://m.360changdi.com/logout.html?url=" + url + "&jsoncallback=?", function(data) {

        window.location.href = data.url;

    })


}

$(document).ready(function() {
    $(".vendor-index .ui-select").click(function() {
        $(this).parent("td").siblings().find(".ui-menu").fadeOut();
        var tpe = $(this).attr('dir');
        var itemid = $(this).attr('itemid')>0?$(this).attr('itemid'):0;
        $(this).find(".ui-menu").fadeToggle();
        $(".ui-menu .item").click(function() {
            $(this).parent(".ui-menu").siblings(".option-item").html($(this).html())
            var lang = $(this).attr('lang');
            $(this).parent(".ui-menu").siblings(".option-item").attr('lang', lang);
            //$(this).parent(".ui-menu").siblings(".option-item").html($(this).html())


        })
        var lang = $(this).find(".option-item").attr('lang');

        if (tpe == 'city_id' && lang > 0) {

            var str = '<div class="item" lang="0">请选择县</div>';
            var sing = '<div class="item" lang="0">请选择</div>';
            $.get('district_id_' + lang + '.html', function(data) {
                for (var o in data) {

                    str += '<div class="item"  lang="' + data[o].district_id + '">' + data[o].district_name + '</div>';
                }
                $('#spa_district').html(str);

            }, 'json');

            $.get('distyle_id_' + lang + '.html', function(data) {

                for (var o in data) {

                    sing += '<div class="item"  lang="' + data[o].style_id + '">' + data[o].style_name + '</div>';
                }
                $('#spa_style').html(sing);



            }, 'json');
            $('#district_id').find(".option-item").html('请选择县、区');
            $('#street_id').find(".option-item").html('请选择商圈')
            $('#style_id').find(".option-item").html('请选择场地类型')

        } else if (tpe == 'district_id' && lang > 0) {

            var str = '<div class="item" lang="0">请选择商圈</div>';
            $.get('distreet_id_' + lang + '.html', function(data) {
                for (var o in data) {

                    str += '<div class="item"  lang="' + data[o].street_id + '">' + data[o].street_name + '</div>';
                }
                $('#spa_street').html(str);

            }, 'json');
            $('#street_id').find(".option-item").html('请选择商圈')

        } else if (tpe == 'unit_id' && lang > 0) {
            bsaeinfo()
        }

        if ((tpe == 'city_id' || tpe == 'district_id' || tpe == 'style_id' || tpe == 'street_id') && lang > 0 && itemid <= 0) {

            $.get('setvendor', {'name': tpe, 'val': lang}, function(data) {
                if (data.int == 1) {

                    $('#save').removeAttr("disabled");
                }

            }, 'json')

        }
    })
    $(".ui-select").click(function(event) {
        var src = $(this).attr("hc-name");
        $(this).siblings(".ui-menu").css("display", "block");
        $(this).siblings(".ui-menu").children(".item").click(function() {
            $(this).parent(".ui-menu").siblings(".ui-select").html($(this).html());
            // if (src == 'index') {
            //     var lang = $(this).attr('lang');

            //     window.location.href = 'index_cid_' + lang + '.html';
            // }else 
            if (src == 'slist') {
                var lang = $(this).attr('lang');
                var url = '';

                if ($(this).parent(".ui-menu").siblings(".ui-select").attr("id") == 'cityb') {
                    var lib
                    
                    //url = 'slist_cid_'+lang+'_lid_'+lib+'.html';
                    url = 'slist_ric_' + lang + '-0-0-0.html';
                    // alert(lib);

                } else {
                    var service = ''
                    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
                    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
                    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
                    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
                    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
                    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
                    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
                    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
                    $("input[name^=stylelid]:checked").each(function() {
                        service += $(this).val() + "a";
                    });
                    var lid = service.substring(0, service.length - 1);

                    var mid = '';
                    $("input[name^=price]:checked").each(function() {
                        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
                    });
                    mid = mid == '' ? 0 : mid;

                    var pri = '';
                    var min = $("#pri_min").val();
                    var max = $("#pri_max").val();
                    var pri = min + 'a' + max;
                    pri = pri =='a' || mid != 0 ? '0a0' : pri;

                    var pid='';
                    $("input[name^=headcounts]:checked").each(function() {
                        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
                    });
                    pid = pid =='' ? 0 : pid;

                    var peo='';
                    var min1 = $("#peo_min").val();
                    var max1 = $("#peo_max").val();
                    var peo = min1 + 'a' + max1;
                    peo = peo =='a' || pid != 0 ? '0a0' : peo;

                    var tagid = $("#atype").attr('lang');

                    //alert(lid)
                    if ($(this).parent(".ui-menu").siblings(".ui-select").attr("id") == 'rs') {
                        var url = 'slist_ric_' + cid + '-' + lang + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
                        //url = 'slist_cid_'+cid+'_sid_'+lang+'_xid_'+xid+'_lid_'+lid+'_uid_'+uid+'_oid_'+oid+'_key_'+key+'.html';
                    } else if ($(this).parent(".ui-menu").siblings(".ui-select").attr("id") == 'ys') {
                        //url = 'slist_cid_'+cid+'_sid_'+sid+'_xid_'+lang+'_lid_'+lid+'_uid_'+uid+'_oid_'+oid+'_key_'+key+'.html';
                        var url = 'slist_ric_' + cid + '-' + sid + '-' + lang + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
                    }

                }
                window.location.href = url;

            } else if (src == "article") {
                var htm = $(this).html();
                var lang = $(this).attr('lang');
                $(this).parent(".ui-menu").siblings(".ui-select").html(htm);
                $(this).parent(".ui-menu").siblings(".ui-select").attr('lang', lang);

            } else if (src == "art_index") {
                var htm = $(this).html();
                var lang = $(this).attr('lang');
                $('#style_id').attr('lang', 0);
                $('#style_id').html('场地类型');
                $('#district_id').attr('lang', 0);
                $('#district_id').html('所在县区');
                $.get('showstyle_id_' + lang + '.html', function(data) {
                    var res = JSON.parse(data);
                    $('#szxq').html(res.str1);
                    $('#hdlx').html(res.str2);
                });
                $(this).parent(".ui-menu").siblings(".ui-select").html(htm);
                $(this).parent(".ui-menu").siblings(".ui-select").attr('lang', lang);

            } else if (src == "art_district") {
                var htm = $(this).html();
                var lang = $(this).attr('lang');
                $(this).parent(".ui-menu").siblings(".ui-select").html(htm);
                $(this).parent(".ui-menu").siblings(".ui-select").attr('lang', lang);
            } else if (src == "art_activity") {
                var htm = $(this).html();
                var lang = $(this).attr('lang');
                $(this).parent(".ui-menu").siblings(".ui-select").html(htm);
                $(this).parent(".ui-menu").siblings(".ui-select").attr('lang', lang);
            } else {
                downlist.css("display", "none");
            }
            $(".ui-menu").css("display", "none");
        })
        event.stopPropagation();
    })
    $(document).click(function() {
        $(".ui-menu").css("display", "none");
                  $(".fun-content").css("display", "none");
    })
    $(".review-img").hover(function() {
        $(this).children(".detail-tooltips").show();
    }, function() {
        $(this).children(".detail-tooltips").hide();
    })

    var morebtn = $("div[data-btn='more']");
    morebtn.click(function() {
        $(this).toggleClass("show-more");
        $(".fn-top").toggleClass("bottom-line");
        $(".fn-more").toggle();
    })
})


function demandsum() {
    var start_time = Trim($("#start_time").html(), 'g');
    var city_id = $("#city_id").attr('lang');
    var style_id = $("#style_id").attr('lang');
    var district_id = $("#district_id").attr('lang');
    var activity_id = $("#activity_id").attr('lang');
    var demand_name = Trim($("#demand_name").val(), 'g');
    var demand_tell = Trim($("#demand_tell").val(), 'g');
    var sms_code = Trim($("#demand_code").val(), 'g');
    var demand_sum = Trim($("#demand_sum").val(), 'g');
    var demand_desc = $("#demand_desc").val();
    
    if (start_time == '' || start_time == '开始日期') {
        alert('活动日期必须选择！');
        return false;
    }
    if (city_id <= 0) {
        alert('活动城市必须选择！');
        return false;
    }
    if (district_id <= 0) {
        alert('县区必须选择！');
        return false;
    }
    if (style_id <= 0) {
        alert('场地类型必须选择！');
        return false;
    }
    if (activity_id <= 0) {
        alert('活动类型必须选择！');
        return false;
    }

    if(demand_tell == ''){
        alert("请填写手机号");
        return false;
    }

    if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(demand_tell)) {
        alert('手机号格式错误！');
        return false;
    }
    if (sms_code == '') {
        alert('短信验证码不能为空')
        return false;
    }

    var data = {
        'demand_tell': demand_tell,
        'sms_code': sms_code}

    $.ajax({
        type: "post",
        url: "chekcode.html",
        data: data,
        async: false,
        success: function(result) {
            int = result;
        }
    });

    var int;

    if (int == -1) {
        alert('短信验证码错误')
        return false;
    } else if (int == -2) {
        alert('短信验证码已失效')
        return false;
    } else if (int == -3) {
        alert('短信验证码已经超时')
        return false;
    }

    var da = {
        'demand_name': demand_name,
        'demand_tell': demand_tell,
        'city_id': city_id,
        'district_id': district_id,
        'activity_id': activity_id,
        'demand_sum': demand_sum,
        'style_id': style_id,
        'start_time': start_time,
        'demand_desc': demand_desc
    };

    $.post("sumcode.html", da, function(result) {
        $.post("smsstatus.html", data, function(res) {
	        var res = JSON.parse(result);
	        var data = res.info;
	        var siteid = res.site_id;
	        var demandid = res.demand_id;
	        $.post("/dxtz.php", {sj: demand_tell, data: data, siteid: siteid, demandid: demandid}, function(result) {
	            if (result.indexOf('success') > 0) {
	                alert('发送成功!')
	                history.go(0);
	            } else {
	                alert('发送失败！~请重试');
	                history.go(0);
	            }
	        });
        });
    })

}



function price(site_id) {
    var price_time = Trim($("#price_time").html(), 'g');
    var time_id = $("#day").attr('lang');
    var price_num = Trim($("#price_num").val(), 'g');
    var price_money = Trim($("#price_money").val(), 'g');
    var price_name = Trim($("#price_name").val(), 'g');
    var price_tell = Trim($("#price_tell").val(), 'g');
    var price_desc = $("#price_desc").val();
    var styleid = $("#styleid").attr('lang');
    var sms_code = Trim($("#sms_code").val(), 'g');
    var is_postpone;

    var int;
    $('#is_postpone').is(':checked') == true ? is_postpone = 1 : is_postpone = 0;
    var advantage = [];
   $("input[name^=firstservice]:checked").each(function(index,ele) {
    advantage.push($(ele).attr("value"));
    });


    if (time_id <= 0) {
        alert('请选择租用天数')
        return false;
    }

    if (styleid <= 0) {
        alert('请选择活动类型')
        return false;
    }

    if (price_num == '') {
        alert('请填写参与人数')
        return false;
    }

    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(price_num)) {
        alert('参与人数只能为数字!');
        return false;
    }

    if (!re.test(price_money) && price_money !== '') {
        alert('预算只能为数字!');
        return false;
    }

    if (price_name == '') {
        alert('姓名不能为空')
        return false;
    }

    if (price_tell == '') {
        alert('请填写手机号')
        return false;
    }

    if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(price_tell)) {
        alert('手机号格式错误');
        return false;
    }

    if (sms_code == '') {
        alert('请填写验证码！')
        return false;
    }


    var data = {
        'demand_tell': price_tell,
        'sms_code': sms_code}



    $.ajax({
        type: "post",
        url: "chekcode.html",
        data: data,
        async: false,
        success: function(result) {
            int = result;
        }
    });

    if (int == -1) {
        alert('短信验证码错误')
        return false;
    } else if (int == -2) {
        alert('短信验证码已失效')
        return false;
    } else if (int == -3) {
        alert('短信验证码已经超时')
        return false;
    }


    var da = {
        'price_time': price_time,
        'time_id': time_id,
        'price_num': price_num,
        'price_money': price_money,
        'price_name': price_name,
        'price_tell': price_tell,
        'price_desc': price_desc,
        'site_id': site_id,
        'son_id': 0,
        'is_postpone': is_postpone,
        'advantage':advantage,
        'activity_id': styleid
    };

    $.post("addprice", da, function(status) {
        alert("增加成功！")
        if (status >= 1) {

            setTimeout(window.location.href = 'article_id_' + site_id + '.html', 3000);

        }
    });
    //alert(site_id)
}

function price_sum(site_id) {

    var price_time = Trim($("#price_time1").html(), 'g');
    var time_id = $("#yt").attr('lang');
    var price_num = Trim($("#price_num1").val(), 'g');
    var price_money = Trim($("#price_money1").val(), 'g');
    var price_name = Trim($("#price_name1").val(), 'g');
    var price_tell = Trim($("#price_tell1").val(), 'g');
    var price_desc = $("#price_desc1").val();
    var son_id = $("#son_id").val();
    var styleid = $("#styleid1").attr('lang');
    var sms_code = Trim($("#sms_code1").val(), 'g');
    var is_postpone;
    var advantage = [];
   $("input[name^=secondservice]:checked").each(function(index,ele) {
    advantage.push($(ele).attr("value"));
    });
    var int;
    $('#is_postpone1').is(':checked') == true ? is_postpone = 1 : is_postpone = 0;
    


    if (time_id <= 0) {
        alert('请选择租用天数')
        return false;
    }

    if (styleid <= 0) {
        alert('请选择活动类型')
        return false;
    }

    if (price_num == '') {
        alert('请填写参与人数')
        return false;
    }
    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(price_num)) {
        alert('参与人数只能为数字!');
        return false;
    }

    if (!re.test(price_money) && price_money !== '') {
        alert('预算只能为数字!');
        return false;
    }

    if (price_name == '') {
        alert('姓名不能为空')
        return false;
    }

    if (price_tell == '') {
        alert('请填写手机号')
        return false;
    }

    if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(price_tell)) {
        alert('手机号/固定电话格式错误');
        return false;
    }

    if (sms_code == '') {
        alert('请填写验证码！')
        return false;
    }

    var data = {
        'demand_tell': price_tell,
        'sms_code': sms_code}


    $.ajax({
        type: "post",
        url: "chekcode.html",
        data: data,
        async: false,
        success: function(result) {
            int = result;
        }
    });

    if (int == -1) {
        alert('短信验证码错误')
        return false;
    } else if (int == -2) {
        alert('短信验证码已失效')
        return false;
    } else if (int == -3) {
        alert('短信验证码已经超时')
        return false;
    }

    var da = {
        'price_time': price_time,
        'time_id': time_id,
        'price_num': price_num,
        'price_money': price_money,
        'price_name': price_name,
        'price_tell': price_tell,
        'price_desc': price_desc,
        'site_id': 0,
        'son_id': son_id,
        'is_postpone': is_postpone,
        'advantage':advantage,
        'activity_id': styleid
    };


    $.post("addprice", da, function(status) {
        alert("增加成功！")
        if (status >= 1) {

            setTimeout(window.location.href = 'article_id_' + site_id + '.html', 3000);

        }
    });

}

function Trim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
    {
        result = result.replace(/\s/g, "");
    }
    return result;
}

function findlx(o) {
    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service.substring(0, service.length - 1);

    lid = lid == '' ? 0 : lid;
    var tagid = $("#atype").attr('lang');

    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ '0' + '-'+'0a0'+'-'+'0'+'-'+'0a0'+'-'+tagid+'.html';
    //var url ='slist_cid_'+cid+'_sid_'+sid+'_xid_'+xid+'_lid_'+lid+'_uid_'+uid+'_oid_'+oid+'_key_'+key+'.html'; 

    window.location.href = url;

}

function findunit(o) {
    var i = $('#findunit').find('.active');
    $(i).removeClass('active');
    $(o).removeClass('active');
    $(o).addClass('active');
    var lang = $(o).attr('lang');

    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service.substring(0, service.length - 1);
    var mid = '';
    $("input[name^=price]:checked").each(function() {
        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    mid = mid == '' ? 0 : mid;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid='';
    $("input[name^=headcounts]:checked").each(function() {
        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    pid = pid =='' ? 0 : pid;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;
    var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + lang + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    //var url ='slist_cid_'+cid+'_sid_'+sid+'_xid_'+xid+'_lid_'+lid+'_uid_'+lang+'_oid_'+oid+'_key_'+key+'.html'; 

    window.location.href = url;

}


function findorder(o, id , sorts) {
    var i = $('#findorder').find('.selected');
    $(i).removeClass('selected');
    $(o).removeClass('selected');
    $(o).addClass('selected');

    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    var oid = id;
    var sorts = sorts;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service.substring(0, service.length - 1);

    var mid = '';
    $("input[name^=price]:checked").each(function() {
        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    mid = mid == '' ? 0 : mid;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid='';
    $("input[name^=headcounts]:checked").each(function() {
        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    pid = pid =='' ? 0 : pid;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;
    var tagid = $("#atype").attr('lang');

    if(sorts !== undefined){
        var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc +'-'+sorts+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    }else{
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';

    }
    //var url ='slist_cid_'+cid+'_sid_'+sid+'_xid_'+xid+'_lid_'+lid+'_uid_'+uid+'_oid_'+oid+'_key_'+key+'.html'; 

    window.location.href = url;

}

function findli(o) {

    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    //alert(zb);return false;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service;
    var str = 'a' + lid;
    var int = 'a' + $(o).val() + 'a';
    if ($(o).is(':checked') == true) {
        if (str.indexOf(int) < 0) {
            lid = lid + $(o).val() + 'a'
        }
    } else {
        //alert(lid);return false;
        if (str.indexOf(int) >= 0) {
            lid = str.replace(int, 'a');
        }

    }
    if (lid[0] == 'a') {
        lid = lid.substring(1);
    }

    if (lid[lid.length - 1] == 'a') {
        lid = lid.substring(0, lid.length - 1);
    }

    lid = lid == '' ? 0 : lid;

    var mid = '';
    $("input[name^=price]:checked").each(function() {
        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    mid = mid == '' ? 0 : mid;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid='';
    $("input[name^=headcounts]:checked").each(function() {
        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    pid = pid =='' ? 0 : pid;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;

    var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';

    //var url ='slist_cid_'+cid+'_sid_'+sid+'_xid_'+xid+'_lid_'+lid+'_uid_'+uid+'_oid_'+oid+'_key_'+key+'.html'; 

    window.location.href = url;


}

function findli1(o) {

    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    //alert(zb);return false;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service;
    lid = lid == '' ? 0 : lid;

    var mid='';
    mid = $(o).val().replace(/(^\s*)|(\s*$)/g, ""); 
    mid = mid =='' ? 0 : mid;
    var one = $(o).attr('info');

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 || one == 'one' ? '0a0' : pri;

    var pid='';
    $("input[name^=headcounts]:checked").each(function() {
        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    pid = pid =='' ? 0 : pid;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;
    var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+mid +'-' +pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    window.location.href = url;
}

function findli2(o) {
    var service = ''
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    //alert(zb);return false;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service;
    lid = lid == '' ? 0 : lid;

    var mid = '';
    $("input[name^=price]:checked").each(function() {
        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    mid = mid == '' ? 0 : mid;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid='';
    pid = $(o).val().replace(/(^\s*)|(\s*$)/g, ""); 
    pid = pid =='' ? 0 : pid;
    var two = $(o).attr('info');

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 || two == 'two' ? '0a0' : peo;
    var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    window.location.href = url;
}

function findli11(){
    var service = '';
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    //alert(zb);return false;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service;
    lid = lid == '' ? 0 : lid;

    var mid = 0;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid='';
    $("input[name^=headcounts]:checked").each(function() {
        pid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    pid = pid =='' ? 0 : pid;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;
   var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    window.location.href = url;
}

function findli22(){
    var service = '';
    var cid = $('#downlistb').find('.active1').attr('lang') > 0 ? $('#downlistb').find('.active1').attr('lang') : 0;
    var sid = $('#downlistd').find('.active1').attr('lang') > 0 ? $('#downlistd').find('.active1').attr('lang') : 0;
    var xid = $('#downliste').find('.active1').attr('lang') > 0 ? $('#downliste').find('.active1').attr('lang') : 0;
    var uid = $('#findunit').find('.active').attr('lang') > 0 ? $('#findunit').find('.active').attr('lang') : 0;
    var oid = $('#findorder').find('.selected').attr('lang') > 0 ? $('#findorder').find('.selected').attr('lang') : 0;
    var key = $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "") == '' ? '0a0' : $('#searchQ').val().replace(/(^\s*)|(\s*$)/g, "");
    var zb = $('#zuobiao').val() != '' ? $('#zuobiao').val() : 0;
    var gjc = $('#gjc').val() ? $('#gjc').val() : 0;
    //alert(zb);return false;
    $("input[name^=stylelid]:checked").each(function() {
        service += $(this).val() + "a";
    });
    var lid = service;
    lid = lid == '' ? 0 : lid;
    
    var mid = '';
    $("input[name^=price]:checked").each(function() {
        mid = $(this).val().replace(/(^\s*)|(\s*$)/g, ""); 
    });
    mid = mid == '' ? 0 : mid;

    var pri = '';
    var min = $("#pri_min").val();
    var max = $("#pri_max").val();
    var pri = min + 'a' + max;
    pri = pri =='a' || mid != 0 ? '0a0' : pri;

    var pid=0;

    var peo='';
    var min1 = $("#peo_min").val();
    var max1 = $("#peo_max").val();
    var peo = min1 + 'a' + max1;
    peo = peo =='a' || pid != 0 ? '0a0' : peo;
    var tagid = $("#atype").attr('lang');
    var url = 'slist_ric_' + cid + '-' + sid + '-' + xid + '-' + lid + '-' + oid + '-' + uid + '-' + key + '-' + zb + '-' + gjc + '-' +'0'+'-'+ mid + '-'+pri+'-'+pid+'-'+peo+'-'+tagid+'.html';
    window.location.href = url;

}

function hotseach(cid, key) {
    var lid = $("#style").val();
    var key = key == '' ? '0a0' : key;
    var style = $('#style').val();
    //var url ='slist_cid_'+cid+'_sid_0_xid_0_lid_'+lid+'_uid_0_oid_1_key_'+key+'.html'; 
    var url = 'slist_ric_' + cid + '-0-0-' + style + '-0-0-' + key + '-' + 0 + '-' + 0 + '.html';

    window.location.href = url;

}

function seach(cid) {
    var key = $("#searchQ").val() == '' ? '0a0' : $("#searchQ").val();
    var lid = $("#style").val();
    var style = $('#style').val();
    //var url ='slist_cid_'+cid+'_sid_0_xid_0_lid_'+lid+'_uid_0_oid_1_key_'+key+'.html'; 
    // var url = 'slist_ric_' + cid + '-0-0-' + '0' + '-0-0-' + key + '-' + 0 + '-' + 0 + '.html';
    var url = 'slist_ric_' + cid + '-0-0-' + '0' + '-2-0-' + key + '-' + 0 + '-' + 0 + '-'+ 2 +'.html';
    window.location.href = url;

}
function show(obj, obox, ev) {
    $(obj).siblings(".tab-item").removeClass("state-focus");
    $(obox).siblings(".tab-content").hide();
    $(obj).toggleClass("state-focus")
    $(obox).toggle();

}

$(document).ready(function() {
    $(".rate-button").click(function() {
        var lang = $(this).attr('lang');
        $("#son_id").val(lang);
        $(".dialog-inquiry-mask").css("display", "block")
        $(".dialog-inquiry").css("display", "block")
        $("body").css("overflow", "hidden");
    })
    $(".dialog-close").click(function() {
        $(".dialog-inquiry-mask").css("display", "none")
        $(".dialog-inquiry").css("display", "none")
        $("body").css("overflow", "auto");
    })
    $(".dialog-inquiry-mask").click(function() {
        $(".dialog-inquiry-mask").css("display", "none")
        $(".dialog-inquiry").css("display", "none")
        $("body").css("overflow", "auto");
    })
})
$(document).ready(function() {
    $(".searcher-last").click(function() {
        $(".dialog-inquiry-mask").css("display", "block")
        $(".dialog-inquiry").css("display", "block")
        $("body").css("overflow", "hidden");
    })
    $(".fbxu").click(function() {
        $(".dialog-inquiry-mask").css("display", "block")
        $(".dialog-inquiry").css("display", "block")
        $("body").css("overflow", "hidden");
    })
    $(".dialog-close").click(function() {
        $(".dialog-inquiry-mask").css("display", "none")
        $(".dialog-inquiry").css("display", "none")
        $("body").css("overflow", "auto");
    })
    $(".dialog-inquiry-mask").click(function() {
        $(".dialog-inquiry-mask").css("display", "none")
        $(".dialog-inquiry").css("display", "none")
        $("body").css("overflow", "auto");
    })
})
$(document).ready(function() {
    $(".space-more").click(function() {
        $(".space-list").css("height", "auto");
        $(".space-more").css("display", "none")
    })
    $("#weixin").mouseover(function() {
        $("#weixinQrcode").show()
    })
    $("#weixin").mouseout(function() {
        $("#weixinQrcode").hide()
    })
})
$(document).ready(function() {
    $("#btnzj").click(function() {
        var newinner = $(".signame").html();
        var inner = ' <div class="sigdiv"><label class="item item-input">详细信息名称<input type="text" maxlength="11" required="" placeholder="详细信息名称" class="ng-pristine ng-invalid ng-invalid-required ng-valid-pattern ng-valid-maxlength ng-touched"></label><label class="item item-input"> 详细信息价格<input type="text" maxlength="11" required="" placeholder="详细信息价格（￥）" class="ng-pristine ng-invalid ng-invalid-required ng-valid-pattern ng-valid-maxlength ng-touched"><select  class="ng-pristine ng-invalid ng-invalid-required ng-valid-maxlength ng-touched"><option >天</option><option>人</option><option>小时</option><option>面议</option><option>半天</option></select></label></div>'
        $(".signame").html(newinner + inner);
    })
    $(".space-select").click(function() {
        $(this).find(".reivew-post-select-menu").fadeToggle()
        $(this).find(".item").click(function() {
            $(".c-space").html($(this).html());
            if ($(this).attr('lang') > 0) {
                $(".c-space").attr('lang', $(this).attr('lang'));
            }
        })
    })
    $(".review-star").click(function() {
        $(".review-star").removeClass("active");
        var index = $(this).index();
        var tip = {"0": "非常差", "1": "差", "2": "一般", "3": "好", "4": "非常好"};
        $(".review-star-tip").html(tip[index])
        for (var i = 0; i <= index; i++) {
            $(".review-star").eq(i).addClass("active")
        }
    })
})

$(window).scroll(function() {
    var ritsid = $(".list-side").outerHeight();
    var whight = parseInt(1445 - ritsid);
    if (($(window).scrollTop() > 200) && ($(window).scrollTop() < whight)) {
        $(".list-side").css("position", "fixed");
    }
    if ($(window).scrollTop() > whight) {
        $(".list-side").css("position", "absolute");
    }
    else if ($(window).scrollTop() < 200) {
        $(".list-side").css("position", "absolute");
    }
})
