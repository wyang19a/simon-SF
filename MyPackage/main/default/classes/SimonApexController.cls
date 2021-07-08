public with sharing class SimonApexController {
    @AuraEnabled
    public static Game__c createNewGame(){
        Game__c newGame = new Game__c();
        insert newGame;
        return newGame;
    }
}
