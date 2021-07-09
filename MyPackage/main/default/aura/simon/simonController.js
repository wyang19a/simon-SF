({
    onGameBtnClick : function(cmp, event, helper) {
        // console.log(event.target.getAttribute('data-id'))
        let trace = cmp.get('v.trace')
        console.log('trace length', trace.length)
        console.log('yoyoyo', cmp.get('v.userStep'))
        helper.incrementStep(cmp, event)
        if (cmp.get('v.userStep') == trace.length) {
            helper.updateUserTrace(cmp, event)
            helper.compareTraces(cmp, event)
        } else {
            helper.updateUserTrace(cmp, event)
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
