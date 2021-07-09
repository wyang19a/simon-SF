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
    },
    pickUntilNonRepeat : function(cmp, traceList) {
        const currentTrace = Math.floor(Math.random() * 4)
        // console.log('current Trace: ', currentTrace)
        // console.log('assignd Trace: ', traceList[traceList.length - 1])

        if(currentTrace != traceList[traceList.length - 1]) {
            traceList.push(currentTrace)
            cmp.set('v.currentTrace', currentTrace)
        } else {
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
    setMessage : function(cmp) {
        if (cmp.get('v.gameOver')) {
            cmp.set('v.message',  `Game Over! Your Highest Streak was: ${cmp.get('v.highestStep')}`)
        } else {
            cmp.set('v.message', cmp.get('v.trace').length - cmp.get('v.userStep') == 0 
                                    ? 'You got it right! Next round' 
                                    : `You have ${cmp.get('v.trace').length - cmp.get('v.userStep')} move to make.`)       
        }
    },
    incrementStep : function(cmp, event) {
        let step = cmp.get('v.userStep')
        step++
        cmp.set('v.userStep', step)
        this.setMessage(cmp)
    },
    updateUserTrace : function(cmp, event) {
        // get userTrace and answer trace
        let userTrace = cmp.get('v.userTrace')
        let trace = cmp.get('v.trace')
        // push user trace, and set the attribute
        userTrace.push(parseInt(event.target.getAttribute('data-id')))
        cmp.set('v.userTrace', userTrace)
        
        // if clicked data-id does not match the corresponding index in trace list,
        if (event.target.getAttribute('data-id') != trace[userTrace.length - 1]) {
            // Game over
            cmp.set('v.message', `Game Over! Your Highest Streak was: ${cmp.get('v.highestStep')}`)
            cmp.set('v.gameOver', true)
            document.querySelectorAll('.game-btn').forEach(btn => {
                btn.classList.add('disabled')
            })
            // Post Game Result here
            const postGameResult = cmp.get('c.updateGameTrace')
            postGameResult.setParams({
                'gameId': cmp.get('v.gameId'),
                'trace': cmp.get('v.trace').join(', '),
                'record': cmp.get('v.highestStep')
            })
            postGameResult.setCallback(this, function(response) {
                const state = response.getState()
                if (state === "SUCCESS") {
                    const res = response.getReturnValue()
                    console.log('SUCCESS!', res)
                }
            })
            $A.enqueueAction(postGameResult)
            // once game result method is on queue,
            // hardReset game, and renew game vars
            this.resetGame(cmp, event)
            this.hardReset(cmp, event)
            document.querySelector('.start-btn').style.display = 'block'
        } 
    },
    compareTraces : function(cmp, event) {
        let trace = cmp.get('v.trace')
        // if two sets match,
        if (JSON.stringify(cmp.get('v.userTrace')) == JSON.stringify(trace)) {
            // renew game vars, assign new move, and play the traces
            this.resetGame(cmp, event)
            this.assignMove(cmp, event)
            this.playTraces(cmp, event)
        }
    },
    playTraces : function(cmp, event) {
        // get the traces,
        let trace = cmp.get('v.trace')
        // disable game buttons while playing trace.
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.classList.add('disabled')
        })
        // loop thru the trace, assign them `blink` css class and remove it after 1 sec, in succession
        for(let i = 0; i < trace.length; i++) {
            const newTraceBtn = document.querySelectorAll(`[data-id='${trace[i]}']`)[0]
            setTimeout(function() {
                newTraceBtn.classList.add('blink')
                setTimeout(function() {
                    newTraceBtn.classList.remove('blink')
                    cmp.set('v.message', `You have ${cmp.get('v.trace').length} move to make.`)
                }, 1000)
            }, 1000 * i)
        }
        // enable game buttons
        setTimeout(function() {
            document.querySelectorAll('.game-btn').forEach(btn => {
                btn.classList.remove('disabled')
            })
        }, 1000 * trace.length)
    },
    resetGame : function(cmp, event) {
        cmp.set('v.userStep', 0)
        cmp.set('v.userTrace', [])
    },
    hardReset : function(cmp, event) {
        cmp.set('v.trace', [])
        cmp.set('v.gameOver', false)
    }
})
