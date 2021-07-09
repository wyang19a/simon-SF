({
    onInit : function(cmp, event, helper) {
        cmp.set('v.message', 'Click Start! to begin!')
    },
    onGameBtnClick : function(cmp, event, helper) {
        // console.log(event.target.getAttribute('data-id'))
        let trace = cmp.get('v.trace')
        helper.incrementStep(cmp, event)
        if (cmp.get('v.userStep') == trace.length) {
            if (event.target.getAttribute('data-id') != trace[trace.length - 1]) {
                cmp.set('v.gameOver', true)
                helper.resetGame(cmp, event)
                helper.hardReset(cmp, event)
                document.querySelectorAll('.game-btn').forEach(btn => {
                    btn.classList.add('disabled')
                })
                document.querySelector('.start-btn').style.display = 'block'
            } else {
                if (cmp.get('v.highestStep') < cmp.get('v.userStep')) {
                    cmp.set('v.highestStep', cmp.get('v.userStep'))
                }
                helper.updateUserTrace(cmp, event)
                helper.compareTraces(cmp, event)
            }
        } else {
            helper.updateUserTrace(cmp, event)
        }
        // helper.assignMove(cmp, event)
    },
    onGameStartClick : function(cmp, event, helper) {
        helper.createNewGame(cmp, event)
        helper.initializeGame(cmp, event)
        helper.hideStartBtn(cmp, event)
        setTimeout(function() {
            helper.userTurn(cmp, event)
        }, 1000)
        helper.setMessage(cmp)
    }
})
