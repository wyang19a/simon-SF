({
    onGameBtnClick : function(cmp, event, helper) {
        console.log(event.target.getAttribute('data-id'))
    },
    onGameStartClick : function(cmp, event, helper) {
        helper.initializeGame(cmp, event);
    }
})
