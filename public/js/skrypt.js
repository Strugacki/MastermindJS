/*jshint jquery: true, devel: true */
$(function () {
    alert('Zacznij grę!');
    
    
    $('.newGame').on('click', function(){
        var size = Number.parseInt($('#size').val());
        var dim = Number.parseInt($('#dim').val());
        var max = Number.parseInt($('#max').val());
        if(size === null || !Number.isInteger(size)){
            console.log('size error!');
            size = 5;
        }
        if(dim === null || !Number.isInteger(dim)){
            console.log('dim error!');
            dim = 9;
        }
        if(max === null || !Number.isInteger(max)){
            console.log('max error!');
            max = null;
        }
        console.log(Number.isInteger(Number.parseInt(size)));
        console.log('size: ' + size + ' dim: ' + dim + ' max: ' + max);
        var url = '/play/size=' + size +'?dim=' + dim + '?max=' + max;
            console.log(url);
        
        $.ajax({
        
            url: "/play/size=" + size +"?dim=" + dim + "?max=" + max,
            dataType: 'json',
            method: 'GET'
        
        }).done(function(data){
            console.log(data);
        })
    });
});
