$(function () {
    $('#goLink').on('click', Start);
});

function Start() {
    //Clear content
    var mainContainer = $('#mainContainer');
    mainContainer.html('');

    var totalThreads = $('#threadsInput').val();
    for (var i = 0; i < totalThreads; i++) {
        mainContainer.append('<div class="SolutionContainer" style="border:solid 1px;">');
    }

    $('.SolutionContainer').each(TrySolution);
}

function TrySolution() {
    var myContainer = this;
    var board = [   [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 0, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0]];

    var stackTrace = [];
    while (true) {

        //obtener todos los posibles movimientos
        var movements = GetPosibleMovements(board);
        if (movements.length > 0) {
            //seleccionar uno al azar
            var movement = movements[Math.floor(Math.random() * movements.length)];
            //agregar ese movimiento en el stacktrace de esta jugada
            stackTrace.push(movement);
            //aplicar el cambio sobre el tablero

            //render del tablero
            RenderBoard(board, myContainer);
        }
        else {
            break;
            console.info("Termine!");
        }
    }

    
}


function GetPosibleMovements(board) {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (board[i][j] == 1)
            {

            }
        }
    }
}

function RenderBoard(board, container) {
    //Draw table in container
    var output = '<table>';
    for (var i = 0; i < 7; i++) {
        output+='<tr>';
        for (var j = 0; j < 7; j++) {
            output+='<td>';
            output+=board[i][j];
            output+='</td>';
        }
        output+='</tr>';
    }
    output+='</table>';
    $(container).html(output);
}
