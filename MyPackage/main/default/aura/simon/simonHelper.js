({
    initializeGame : function(cmp, event) {
        const newGame = cmp.get('c.createNewGame')
        newGame.setCallback(this, function(response) {
            const state = response.getState()
            if (state === "SUCCESS") {
                const res = response.getReturnValue()
                cmp.set('v.gameId', res.Id)
            }
        })
        $A.enqueueAction(newGame)
    }
})
