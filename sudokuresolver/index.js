$(function () {
    $('#goLink').on('click', Start);
});

function Start() {
    //Clear content
    var mainContainer = $('#mainContainer');
    mainContainer.html('');

    var totalThreads = $('#threadsInput').val();
    for (var i = 0; i < totalThreads; i++) {
        mainContainer.append('<div class="SolutionContainer">');
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

    RenderBoard(board, myContainer);
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
