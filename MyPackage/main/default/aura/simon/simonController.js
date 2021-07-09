({
    onGameBtnClick : function(cmp, event, helper) {
        console.log(event.target.getAttribute('data-id'))
        helper.assignMove(cmp, event)
    },
    onGameStartClick : function(cmp, event, helper) {
        helper.createNewGame(cmp, event)
        helper.initializeGame(cmp, event)

        setTimeout(function() {
            helper.userTurn(cmp.event)
        }, 3000)
    }
})
