public with sharing class SimonApexController {
    @AuraEnabled
    public static Game__c createNewGame(){
        Game__c newGame = new Game__c();
        insert newGame;
        return newGame;
    }
    @AuraEnabled
    public static Boolean updateGameTrace(String gameId, String trace) {
        Move_Trace__c newTrace = new Move_Trace__c();
        newTrace.Game__c = gameId;
        newTrace.Trace__c = trace;
    }
}
