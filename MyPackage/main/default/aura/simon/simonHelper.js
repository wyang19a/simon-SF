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
    pickUntilNonRepeat : function(cmp, traceList) {
        const currentTrace = Math.floor(Math.random() * 4)
        console.log('current Trace: ', currentTrace)
        console.log('assignd Trace: ', traceList[traceList.length - 1])

        if(currentTrace != traceList[traceList.length - 1]) {
            traceList.push(currentTrace)
            cmp.set('v.currentTrace', currentTrace)
        } else {
            console.log('reassessing')
            this.pickUntilNonRepeat(cmp, traceList)
        }
    },
    assignMove : function(cmp, event) {
        let traceList = cmp.get('v.trace');
        // const currentTrace = Math.floor(Math.random() * 4) // => random Integer from 0 to 3
        this.pickUntilNonRepeat(cmp, traceList)
        this.playTraces(cmp, event)
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
    updateUserTrace : function(cmp, event) {
        let userTrace = cmp.get('v.userTrace')
        let trace = cmp.get('v.trace')
        userTrace.push(parseInt(event.target.getAttribute('data-id')))
        if (event.target.getAttribute('data-id') != trace[userTrace.length - 1]) {
            // console.log('incorrect!!!!!')
        } 
    },
    compareTraces : function(cmp, event) {
        let trace = cmp.get('v.trace')
        console.log('trace', trace)
        console.log('user trace', cmp.get('v.userTrace'))
        if (JSON.stringify(cmp.get('v.userTrace')) == JSON.stringify(trace)) {
            console.log('i"m here')
            this.resetGame(cmp, event)
            this.assignMove(cmp, event)
            this.playTraces(cmp, event)
            this.userTurn(cmp, event)
        // this.initializeGame(cmp, event)
        // setTimeout(function() {
        //     this.userTurn(cmp, event)
        // }, 1000)
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
    },
    resetGame : function(cmp, event) {
        console.log('resetting steps')
        cmp.set('v.userStep', 0)
        cmp.set('v.userTrace', [])
        // document.querySelectorAll('.game-btn').forEach(btn => {
        //     btn.classList.add('disabled')
        // })
    }
})
