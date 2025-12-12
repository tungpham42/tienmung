// src/giftService.ts
import { GiftRecord } from "./types";

const STORAGE_KEY = "wedding_gift_db";

export const giftService = {
  // Lấy danh sách
  getAll: (): GiftRecord[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Thêm mới
  add: (record: GiftRecord): GiftRecord[] => {
    const currentData = giftService.getAll();
    const newData = [record, ...currentData]; // Mới nhất lên đầu
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  },

  // Xóa
  delete: (id: string): GiftRecord[] => {
    const currentData = giftService.getAll();
    const newData = currentData.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  },
};
