import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Session {
    id: bigint;
    context: string;
    messages: Array<Message>;
    createdAt: bigint;
    language: Language;
    updatedAt: bigint;
}
export interface LifeGuide {
    id: bigint;
    language: Language;
    citation: Citation;
    guidance: string;
    situation: string;
}
export interface Citation {
    source: string;
    description: string;
}
export interface Message {
    text: string;
    sender: string;
    timestamp: bigint;
}
export interface ProcessStep {
    id: bigint;
    processName: string;
    language: Language;
    steps: Array<string>;
    citation: Citation;
}
export interface KnowledgeItem {
    id: bigint;
    lawName: string;
    description: string;
    language: Language;
    citation: Citation;
}
export enum Language {
    en = "en",
    hi = "hi"
}
export interface backendInterface {
    addMessage(sessionId: bigint, message: Message): Promise<void>;
    createSession(language: Language, context: string): Promise<bigint>;
    getAllKnowledgeItems(): Promise<Array<KnowledgeItem>>;
    getAllLifeGuides(): Promise<Array<LifeGuide>>;
    getAllProcessSteps(): Promise<Array<ProcessStep>>;
    getAllSessions(): Promise<Array<Session>>;
    getCapabilities(): Promise<string>;
    getDisclaimer(): Promise<string>;
    getKnowledgeItem(id: bigint): Promise<KnowledgeItem>;
    getLanguageModules(language: Language): Promise<[Array<KnowledgeItem>, Array<ProcessStep>, Array<LifeGuide>]>;
    getLifeGuide(id: bigint): Promise<LifeGuide>;
    getLimitations(): Promise<string>;
    getProcessStep(id: bigint): Promise<ProcessStep>;
    getSession(sessionId: bigint): Promise<Session>;
    initialize(): Promise<void>;
}
