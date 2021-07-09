({
    onGameBtnClick : function(cmp, event, helper) {
        console.log(event.target.getAttribute('data-id'))
        helper.incrementStep(cmp, event)
        let trace = cmp.get('v.trace')
        if (cmp.get('v.userStep') == trace.length) {
            helper.compareTraces(cmp, event)
        }
        // helper.assignMove(cmp, event)
    },
    onGameStartClick : function(cmp, event, helper) {
        // Hide start button once game begins

        helper.createNewGame(cmp, event)
        helper.initializeGame(cmp, event)
        helper.hideStartBtn(cmp, event)
        setTimeout(function() {
            helper.userTurn(cmp, event)
        }, 1000)
    }
})
