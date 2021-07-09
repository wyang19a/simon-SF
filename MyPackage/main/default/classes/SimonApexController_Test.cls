// Test class for deployment, not following any best/good practices
@isTest
private class SimonApexController_Test {
    @isTest
    static void newGameTest() {
        Game__c myGame = SimonApexController.createNewGame();
        Game__c theGame = [SELECT Id FROM Game__c WHERE Id = :myGame.Id];
        System.assertEquals(theGame, myGame);
    }
    
    @isTest
    static void updateGameTest() {
        Game__c newGame = new Game__c();
        String gameId = newGame.Id;
        insert newGame;

        Game__c resultingGame = SimonApexController.updateGameTrace(gameId, '0, 1, 2', 2);
        Game__c queriedGame = [SELECT Move_Trace__c, Game_Over__c, Record__c FROM Game__c WHERE Id = :gameId];
        System.assertEquals(resultingGame.Move_Trace__c, queriedGame.Move_Trace__c);
    }
}
