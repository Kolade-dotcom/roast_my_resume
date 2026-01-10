import fs from 'fs';
import path from 'path';
import { PaymentRecord } from '@/types';

interface PaymentStore {
  payments: Record<string, PaymentRecord>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): PaymentStore {
  ensureDataDir();
  if (!fs.existsSync(PAYMENTS_FILE)) {
    return { payments: {} };
  }
  const data = fs.readFileSync(PAYMENTS_FILE, 'utf-8');
  return JSON.parse(data) as PaymentStore;
}

function writeStore(store: PaymentStore): void {
  ensureDataDir();
  fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export function savePayment(record: PaymentRecord): void {
  const store = readStore();
  store.payments[record.sessionId] = record;
  writeStore(store);
}

export function getPayment(sessionId: string): PaymentRecord | null {
  const store = readStore();
  return store.payments[sessionId] || null;
}

export function updatePayment(
  sessionId: string,
  updates: Partial<Omit<PaymentRecord, 'sessionId'>>
): PaymentRecord | null {
  const store = readStore();
  const existing = store.payments[sessionId];
  if (!existing) {
    return null;
  }
  const updated = { ...existing, ...updates };
  store.payments[sessionId] = updated;
  writeStore(store);
  return updated;
}
