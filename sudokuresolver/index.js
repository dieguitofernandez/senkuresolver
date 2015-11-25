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
            ApplyMovement(board, movement);
            //render del tablero
            RenderBoard(board, myContainer);
        }
        else {
            myContainer.append("Termine!");
            break;
        }
    }

    
}

function ApplyMovement(board, mov) {
    if (mov.sentido == "arriba")
    {
        board[mov.fila][mov.columna] = 0;
        board[mov.fila -1][mov.columna] = 0;
        board[mov.fila -2][mov.columna] = 1;
    }
    if (mov.sentido == "abajo") {
        board[mov.fila][mov.columna] = 0;
        board[mov.fila +1][mov.columna] = 0;
        board[mov.fila +2][mov.columna] = 1;
    }
    if (mov.sentido == "izq") {
        board[mov.fila][mov.columna] = 0;
        board[mov.fila][mov.columna - 1] = 0;
        board[mov.fila][mov.columna - 2] = 1;
    }
    if (mov.sentido == "der") {
        board[mov.fila][mov.columna] = 0;
        board[mov.fila][mov.columna + 1] = 0;
        board[mov.fila][mov.columna + 2] = 1;
    }
}


//i = filas
//j = columnas
function GetPosibleMovements(board) {
    var movements = [];
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (board[i][j] == 1)
            {
                //pruebo para arriba
                //Columnas centrales
                if(1<j && j<5 && i>1 && board[i-1][j] && !board[i-2][j])
                {
                    movements.push({ fila: i, columna: j, sentido: "arriba" });
                }
                //columnas laterales
                if((j<2 || j>4) && i==4 && board[i-1][j] && !board[i-2][j])
                {
                    movements.push({ fila: i, columna: j, sentido: "arriba" });
                }

                //pruebo para abajo
                //columnas centrales
                if (1 < j && j < 5 && i < 5 && board[i + 1][j] && !board[i + 2][j]) {
                    movements.push({ fila: i, columna: j, sentido: "abajo" });
                }
                //columnas laterales
                if ((j < 2 || j > 4) && i == 2 && board[i + 1][j] && !board[i + 2][j]) {
                    movements.push({ fila: i, columna: j, sentido: "abajo" });
                }

                //i = filas
                //j = columnas
                //pruebo izq
                //filas centrales
                if (1 < i && i < 5 && j > 1 && board[i][j - 1] && !board[i][j - 2]) {
                    movements.push({ fila: i, columna: j, sentido: "izq" });
                }
                //filas de arriba y abajo
                if ((i < 2 || i > 4) && j == 4 && board[i][j-1] && !board[i][j-2]) {
                    movements.push({ fila: i, columna: j, sentido: "izq" });
                }

                //pruebo derecha
                //filas centrales
                if (1 < i && i < 5 && j < 5 && board[i][j + 1] && !board[i][j + 2]) {
                    movements.push({ fila: i, columna: j, sentido: "der" });
                }
                //filas de arriba y abajo
                if ((i < 2 || i > 4) && j == 2 && board[i][j + 1] && !board[i][j + 2]) {
                    movements.push({ fila: i, columna: j, sentido: "der" });
                }
            }
        }
    }
    return movements;
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
