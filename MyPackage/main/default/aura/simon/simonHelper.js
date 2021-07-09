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
        this.playTraces(cmp, event)
        // const newTraceBtn = document.querySelectorAll(`[data-id='${currentTrace}']`)[0]
        // console.log(newTraceBtn)
        // newTraceBtn.classList.add('blink')
        // setTimeout(function() {
        //     newTraceBtn.classList.remove('blink')
        // }, 1000)
        // choose random of 4
        // update `Game__c` trace attribute
        // let user choose
        // compare with trace
        // if correct, repeat
        // if not, flag.
    },
    assignMove : function(cmp, event) {
        let traceList = cmp.get('v.trace');
        const currentTrace = Math.floor(Math.random() * 4) // => random Integer from 0 to 3
        cmp.set('v.currentTrace', currentTrace)
        traceList.push(currentTrace)
    },
    userTurn : function(cmp, event) {
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.classList.remove('disabled')
        })
    },
    hideStartBtn : function(cmp, event) {
        document.querySelector('.start-btn').style.display = 'none'
    },
    incrementStep : function(cmp, event) {
        let step = cmp.get('v.userStep')
        step++
        cmp.set('v.userStep', step)
    },
    compareTraces : function(cmp, event) {
        let trace = cmp.get('v.trace')
        if (cmp.get('v.userStep') == trace.length) {
        console.log('correct, and to next step')
        this.initializeGame(cmp, event)
        setTimeout(function() {
            this.userTurn(cmp, event)
        }, 1000)
    }
        // let trace = cmp.get('v.trace')
        // if (event.target.getAttribute('data-id') == trace[trace.length - 1]) {
        //     if (cmp.get('v.userStep') == trace.length) {
        //         console.log('correct, and to next step')
        //         this.initializeGame(cmp, event)
        //         setTimeout(function() {
        //             this.userTurn(cmp, event)
        //         }, 1000)
        //     } else {
        //         console.log('correct, but not next step yet')
        //     }
        //     // correct
        //     // assign new trace, add to list and let user choose again.
        // } else {
        //     console.log('incorrect!')
        //     // Game over!
        // }
    },
    playTraces : function(cmp, event) {
        let trace = cmp.get('v.trace')
        for(let i = 0; i < trace.length; i++) {
            const newTraceBtn = document.querySelectorAll(`[data-id='${trace[i]}']`)[0]
            setTimeout(function() {
                newTraceBtn.classList.add('blink')
                setTimeout(function() {
                    newTraceBtn.classList.remove('blink')
                }, 1000)
            }, 1000 * i)
            // newTraceBtn.classList.add('blink')
            // setTimeout(function(i) {
            //     newTraceBtn.classList.remove('blink')
            // }, 1000 * i)
        }
    }
})
