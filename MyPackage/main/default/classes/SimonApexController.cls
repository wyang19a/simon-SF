public with sharing class SimonApexController {
    @AuraEnabled
    public static Game__c createNewGame(){
        Game__c newGame = new Game__c();
        insert newGame;
        return newGame;
    }
    @AuraEnabled
    public static Game__c updateGameTrace(String gameId, String trace, Integer record) {
        Game__c myGame = [SELECT Id FROM Game__c WHERE Id = :gameId LIMIT 1];
        myGame.Move_Trace__c = trace;
        myGame.Game_Over__c = true;
        myGame.Record__c = record;
        update myGame;
        return myGame;
    }
}
