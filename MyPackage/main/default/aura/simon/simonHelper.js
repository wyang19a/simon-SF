({
    createNewGame : function(cmp, event) {
        const newGame = cmp.get('c.createNewGame')
        newGame.setCallback(this, function(response) {
            const state = response.getState()
            if (state === "SUCCESS") {
                const res = response.getReturnValue()
                cmp.set('v.gameId', res.Id)
            }
        })
        $A.enqueueAction(newGame)
    },
    initializeGame : function(cmp, event) {
        let traceList = cmp.get('v.trace');
        const currentTrace = Math.floor(Math.random() * 4) // => random Integer from 0 to 3
        cmp.set('v.currentTrace', currentTrace)
        traceList.push(currentTrace)

        const newTraceBtn = document.querySelectorAll(`[data-id='${currentTrace}']`)[0]
        console.log(newTraceBtn)
        newTraceBtn.classList.add('blink')
        setTimeout(function() {
            newTraceBtn.classList.remove('blink')
            this.userTurn(cmp, event)
        }, 2000)
        // choose random of 4
        // update `Game__c` trace attribute
        // let user choose
        // compare with trace
        // if correct, repeat
        // if not, flag.
    },
    // assignMove : function(cmp, event) {
    //     let traceList = cmp.get('v.trace');
    //     const currentTrace = Math.floor(Math.random() * 4) // => random Integer from 0 to 3
    //     cmp.set('v.currentTrace', currentTrace)
    //     traceList.push(currentTrace)
    // },
    userTurn : function(cmp, event) {
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.classList.remove('disabled')
        })
    }
})
