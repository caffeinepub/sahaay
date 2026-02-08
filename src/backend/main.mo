import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

actor {
  type Language = {
    #en;
    #hi;
  };

  type Citation = {
    source : Text;
    description : Text;
  };

  type KnowledgeItem = {
    id : Nat;
    lawName : Text;
    description : Text;
    citation : Citation;
    language : Language;
  };

  type ProcessStep = {
    id : Nat;
    processName : Text;
    steps : [Text];
    citation : Citation;
    language : Language;
  };

  type LifeGuide = {
    id : Nat;
    situation : Text;
    guidance : Text;
    citation : Citation;
    language : Language;
  };

  type Message = {
    sender : Text;
    text : Text;
    timestamp : Int;
  };

  type Session = {
    id : Nat;
    messages : [Message];
    language : Language;
    context : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  module Session {
    public func compareById(a : Session, b : Session) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let knowledgeItems = Map.empty<Nat, KnowledgeItem>();
  let processSteps = Map.empty<Nat, ProcessStep>();
  let lifeGuides = Map.empty<Nat, LifeGuide>();
  let userSessions = Map.empty<Principal, [Session]>();

  let disclaimer = "SAHAAY provides general information. Always verify with authorities.";
  let capabilities = "SAHAAY can explain laws, guide you through processes, and provide situational advice.";
  let limitations = "SAHAAY cannot provide specific legal advice or represent you.";

  public shared ({ caller }) func initialize() : async () {
    let sampleKnowledge = {
      id = 1;
      lawName = "RTI Act";
      description = "The Right to Information Act allows citizens to seek information from the government.";
      citation = {
        source = "Government of India";
        description = "RTI Act 2005";
      };
      language = #en;
    };

    let sampleProcess = {
      id = 1;
      processName = "Aadhaar Enrollment";
      steps = ["Visit center", "Fill form", "Provide biometrics"];
      citation = {
        source = "UIDAI";
        description = "Official Aadhaar website";
      };
      language = #en;
    };

    let sampleGuide = {
      id = 1;
      situation = "Job Loss";
      guidance = "Register with Employment Exchange and apply for government schemes.";
      citation = {
        source = "Ministry of Labor";
        description = "Job loss assistance";
      };
      language = #en;
    };

    knowledgeItems.add(1, sampleKnowledge);
    processSteps.add(1, sampleProcess);
    lifeGuides.add(1, sampleGuide);
  };

  public query ({ caller }) func getDisclaimer() : async Text {
    disclaimer;
  };

  public query ({ caller }) func getCapabilities() : async Text {
    capabilities;
  };

  public query ({ caller }) func getLimitations() : async Text {
    limitations;
  };

  public query ({ caller }) func getLanguageModules(language : Language) : async ([KnowledgeItem], [ProcessStep], [LifeGuide]) {
    let knowledgeIter = knowledgeItems.values();
    let filteredKnowledge = knowledgeIter.toArray().filter(func(item) { item.language == language });

    let processIter = processSteps.values();
    let filteredProcess = processIter.toArray().filter(func(item) { item.language == language });

    let guideIter = lifeGuides.values();
    let filteredGuides = guideIter.toArray().filter(func(item) { item.language == language });

    (filteredKnowledge, filteredProcess, filteredGuides);
  };

  public shared ({ caller }) func createSession(language : Language, context : Text) : async Nat {
    let sessions = switch (userSessions.get(caller)) {
      case (null) { [] };
      case (?s) { s };
    };

    let newId = if (sessions.size() == 0) { 1 } else {
      var currentMax = 0;
      for (session in sessions.values()) {
        if (session.id > currentMax) {
          currentMax := session.id;
        };
      };
      currentMax + 1;
    };

    let session : Session = {
      id = newId;
      messages = [];
      language;
      context;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    let newSessions = sessions.concat([session]);
    userSessions.add(caller, newSessions);
    newId;
  };

  public shared ({ caller }) func addMessage(sessionId : Nat, message : Message) : async () {
    switch (userSessions.get(caller)) {
      case (null) { Runtime.trap("Session not found") };
      case (?sessions) {
        let updatedSessions = sessions.map(
          func(s) {
            if (s.id == sessionId) {
              {
                id = s.id;
                messages = s.messages.concat([message]);
                language = s.language;
                context = s.context;
                createdAt = s.createdAt;
                updatedAt = Time.now();
              };
            } else { s };
          }
        );
        userSessions.add(caller, updatedSessions);
      };
    };
  };

  public query ({ caller }) func getSession(sessionId : Nat) : async Session {
    let sessions = switch (userSessions.get(caller)) {
      case (null) { Runtime.trap("No sessions for user") };
      case (?s) { s };
    };

    let session = sessions.find(func(s) { s.id == sessionId });
    switch (session) {
      case (null) { Runtime.trap("Session not found") };
      case (?s) { s };
    };
  };

  public query ({ caller }) func getAllSessions() : async [Session] {
    switch (userSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions.sort(Session.compareById) };
    };
  };

  public query ({ caller }) func getAllKnowledgeItems() : async [KnowledgeItem] {
    knowledgeItems.values().toArray();
  };

  public query ({ caller }) func getAllProcessSteps() : async [ProcessStep] {
    processSteps.values().toArray();
  };

  public query ({ caller }) func getAllLifeGuides() : async [LifeGuide] {
    lifeGuides.values().toArray();
  };

  public query ({ caller }) func getKnowledgeItem(id : Nat) : async KnowledgeItem {
    switch (knowledgeItems.get(id)) {
      case (null) { Runtime.trap("Knowledge item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getProcessStep(id : Nat) : async ProcessStep {
    switch (processSteps.get(id)) {
      case (null) { Runtime.trap("Process step not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getLifeGuide(id : Nat) : async LifeGuide {
    switch (lifeGuides.get(id)) {
      case (null) { Runtime.trap("Life guide not found") };
      case (?item) { item };
    };
  };
};
