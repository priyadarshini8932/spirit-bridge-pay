// Mock API service - replace with real Express backend calls

export interface Donation {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

// Simulated DB
let donations: Donation[] = [
  { id: "1", name: "Ramesh Kumar", email: "ramesh@example.com", phone: "9876543210", amount: 1100, paymentMethod: "UPI", transactionId: "TXN001ABC", date: "2026-03-15" },
  { id: "2", name: "Priya Sharma", email: "priya@example.com", phone: "9123456789", amount: 5100, paymentMethod: "Card", transactionId: "TXN002DEF", date: "2026-03-12" },
  { id: "3", name: "Ankit Patel", email: "ankit@example.com", phone: "9988776655", amount: 2100, paymentMethod: "Net Banking", transactionId: "TXN003GHI", date: "2026-03-10" },
];

let messages: ContactMessage[] = [
  { id: "1", name: "Suresh Verma", email: "suresh@example.com", message: "When are the timings for Janmashtami celebrations?", date: "2026-03-14" },
  { id: "2", name: "Meena Devi", email: "meena@example.com", message: "I would like to volunteer for prasadam distribution.", date: "2026-03-11" },
];

// Mock API functions
export const api = {
  getDonations: (): Donation[] => donations,
  addDonation: (d: Omit<Donation, "id" | "transactionId" | "date">): Donation => {
    const newDonation: Donation = {
      ...d,
      id: String(donations.length + 1),
      transactionId: "TXN" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString().split("T")[0],
    };
    donations = [...donations, newDonation];
    return newDonation;
  },
  getTotalDonations: (): number => donations.reduce((sum, d) => sum + d.amount, 0),
  getMessages: (): ContactMessage[] => messages,
  addMessage: (m: Omit<ContactMessage, "id" | "date">): ContactMessage => {
    const newMsg: ContactMessage = {
      ...m,
      id: String(messages.length + 1),
      date: new Date().toISOString().split("T")[0],
    };
    messages = [...messages, newMsg];
    return newMsg;
  },
  login: (email: string, password: string): boolean => {
    return email === "admin@temple.com" && password === "admin123";
  },
};
