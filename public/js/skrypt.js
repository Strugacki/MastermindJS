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
        console.log(Number.isInteger(Number.parseInt(max)));
        console.log('size: ' + size + ' dim: ' + dim + ' max: ' + max);
        var url = '/play/size/' + size +'/dim/' + dim + '/max/' + max;
            console.log(url);
        
        $.ajax({
        
            url: "/play/size/" + size +"/dim/" + dim + "/max/" + max +"/",
            dataType: 'json',
            method: 'GET'
        
        }).done(function(data){
            var size = data['puzzle'].size;
            var dim = data['puzzle'].dim;
            var max = data['puzzle'].max;
            var data = data['puzzle'].data;
            $('.notesRows').remove();
            $('.cols').remove();
            $('.mark').remove();
            $('.gameField').append('<div class="cols"><table><tr></tr></table></div>');
            for(i=0;i<size;i++){
                $('tr').append('<td><input type="text" class="answer"/></td>');
            }
            $('.markButton').append('<button class="mark" id="mark">Zatwierdź Odpowiedź</button>');
            console.log(data);
            $('.notesCols').append('<table class="notesRows"></table>');
            
            $('.mark').on('click',function(){
                var answers = [];
                $('tr input').each(function(){
                   var value = Number.parseInt($(this).val());
                    answers.push(value);
                    console.log(value);
                });
                
                var urlWithMarks = '/mark/';
                var loop = answers.length;
                for(j=0;j<loop;j++){
                    urlWithMarks += (answers[j] + '/');
                }
                console.log(urlWithMarks);
                
                $.ajax({
                    url: urlWithMarks,
                    dataType: 'json',
                    method: 'GET'
                }).done(function(data){
                    console.log('No działa');
                    if(Number.parseInt(data['counter']) === 0 ){
                        $('button.mark').remove();
                    }
                    var notes = data['notes'];
                    var row = '<tr>';
                    for(i=0;i<notes.length;i++){
                        row += '<td class="' + notes[i] + '">' + notes[i] + '</td>'
                    }
                    row += '</tr>';
                    $('.notesRows').append(row);
                    
                });
            }); 
        });
    });

});
