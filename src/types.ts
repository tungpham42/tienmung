// src/types.ts

export type RelationshipType =
  | "family"
  | "closeFriend"
  | "colleague"
  | "social"
  | "ex";

// Dữ liệu lưu trong LocalStorage
export interface GiftRecord {
  id: string;
  name: string;
  relationship: RelationshipType;
  amount: number;
  eventDate: string; // Format: YYYY-MM-DD
  location: string;
  isReturned: boolean;
}

// Dữ liệu đầu vào Form tính toán
export interface CalculatorInput {
  relationship: RelationshipType;
  location: "luxury" | "restaurant" | "home";
  incomeLevel: "student" | "worker" | "rich";
  companion: boolean;
}
