import * as fs from 'fs';
import * as path from 'path';

const STATE_FILE = path.join(__dirname, 'generator-state.json');

export interface GeneratorState {
  [topicId: string]: {
    generatedConcepts: string[];
    objectives: string[];
  }
}

export function loadState(): GeneratorState {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }
  return {};
}

export function saveState(state: GeneratorState) {
  if (!fs.existsSync(path.dirname(STATE_FILE))) {
    fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

export function getAvoidConcepts(topicId: string): string[] {
  const state = loadState();
  if (!state[topicId]) return [];
  return [...state[topicId].generatedConcepts, ...state[topicId].objectives];
}

export function addConcepts(topicId: string, concepts: string[], objectives: string[]) {
  const state = loadState();
  if (!state[topicId]) {
    state[topicId] = { generatedConcepts: [], objectives: [] };
  }
  state[topicId].generatedConcepts.push(...concepts);
  state[topicId].objectives.push(...objectives);
  saveState(state);
}
