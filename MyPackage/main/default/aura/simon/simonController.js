({
    onGameBtnClick : function(cmp, event, helper) {
        // console.log(event.target.getAttribute('data-id'))
        let trace = cmp.get('v.trace')
        helper.incrementStep(cmp, event)
        if (cmp.get('v.userStep') == trace.length) {
            if (event.target.getAttribute('data-id') != trace[trace.length - 1]) {
                helper.resetGame(cmp, event)
                helper.hardReset(cmp, event)
                document.querySelectorAll('.game-btn').forEach(btn => {
                    btn.classList.add('disabled')
                })
                document.querySelector('.start-btn').style.display = 'block'
            } else {
                helper.updateUserTrace(cmp, event)
                helper.compareTraces(cmp, event)
            }
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
