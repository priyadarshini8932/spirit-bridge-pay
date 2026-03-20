// Mock API service - replace with real Express backend calls

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  password: string;
}

export interface Donation {
  id: string;
  userId?: string;
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
  userId?: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

// Simulated DB
let users: User[] = [
  { id: "admin-1", name: "Temple Admin", email: "admin@temple.com", phone: "9876543210", role: "admin", password: "admin123" },
  { id: "user-1", name: "Ramesh Kumar", email: "ramesh@example.com", phone: "9876543210", role: "user", password: "user123" },
  { id: "user-2", name: "Priya Sharma", email: "priya@example.com", phone: "9123456789", role: "user", password: "user123" },
];

let donations: Donation[] = [
  { id: "1", userId: "user-1", name: "Ramesh Kumar", email: "ramesh@example.com", phone: "9876543210", amount: 1100, paymentMethod: "UPI", transactionId: "TXN001ABC", date: "2026-03-15" },
  { id: "2", userId: "user-2", name: "Priya Sharma", email: "priya@example.com", phone: "9123456789", amount: 5100, paymentMethod: "Card", transactionId: "TXN002DEF", date: "2026-03-12" },
  { id: "3", name: "Ankit Patel", email: "ankit@example.com", phone: "9988776655", amount: 2100, paymentMethod: "Net Banking", transactionId: "TXN003GHI", date: "2026-03-10" },
];

let messages: ContactMessage[] = [
  { id: "1", userId: "user-1", name: "Ramesh Kumar", email: "ramesh@example.com", message: "When are the timings for Janmashtami celebrations?", date: "2026-03-14" },
  { id: "2", name: "Meena Devi", email: "meena@example.com", message: "I would like to volunteer for prasadam distribution.", date: "2026-03-11" },
];

export const api = {
  // Auth
  login: (email: string, password: string): User | null => {
    const user = users.find((u) => u.email === email && u.password === password);
    return user ? { ...user, password: "" } : null;
  },
  register: (name: string, email: string, phone: string, password: string): User | null => {
    if (users.find((u) => u.email === email)) return null;
    const newUser: User = {
      id: "user-" + (users.length + 1),
      name,
      email,
      phone,
      role: "user",
      password,
    };
    users = [...users, newUser];
    return { ...newUser, password: "" };
  },

  // Donations
  getDonations: (): Donation[] => donations,
  getDonationsByUser: (userId: string): Donation[] => donations.filter((d) => d.userId === userId),
  addDonation: (d: Omit<Donation, "id" | "transactionId" | "date">, userId?: string): Donation => {
    const newDonation: Donation = {
      ...d,
      userId,
      id: String(donations.length + 1),
      transactionId: "TXN" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toISOString().split("T")[0],
    };
    donations = [...donations, newDonation];
    return newDonation;
  },
  getTotalDonations: (): number => donations.reduce((sum, d) => sum + d.amount, 0),

  // Messages
  getMessages: (): ContactMessage[] => messages,
  getMessagesByUser: (userId: string): ContactMessage[] => messages.filter((m) => m.userId === userId),
  addMessage: (m: Omit<ContactMessage, "id" | "date">, userId?: string): ContactMessage => {
    const newMsg: ContactMessage = {
      ...m,
      userId,
      id: String(messages.length + 1),
      date: new Date().toISOString().split("T")[0],
    };
    messages = [...messages, newMsg];
    return newMsg;
  },
};
