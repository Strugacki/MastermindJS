/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        return {
            "retMsg": "kurwyWinoIPianino",
            "puzzle": puzzle
        };
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    console.log(Number.parseInt(req.params.length));
    console.log(Number.parseInt(req.params[4]));
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim =   req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max =  req.params[6];
    }
    res.json(newGame());
};

exports.mark = function (req, res) {
        var markAnswer = function () {
        var move = req.params[0].split('/');
        req.session.puzzle.max = Number.parseInt(req.session.puzzle.max) - 1;
        console.log('Pozostała ilość prób: ' + Number.parseInt(req.session.puzzle.max));
        var counter = Number.parseInt(req.session.puzzle.max);
        move = move.slice(0, move.length - 1);
        console.log(move);
        var notes = [] ;
        for(i=0;i<move.length;i++){
            if(Number.parseInt(move[i]) === Number.parseInt(req.session.puzzle.data[i])){
                console.log('OK');
                notes.push('black');
            }else{
                console.log('BAD');
                notes.push('white');
            }
        }
        return {
            "notes": notes,
            "retMsg": "pierdol się",
            "counter": counter
        };
    };
    res.json(markAnswer());
};
