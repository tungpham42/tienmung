// src/utils.ts
import { CalculatorInput } from "./types";

// Format 500000 -> 500.000 đ
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const calculateGiftAmount = (data: CalculatorInput): number => {
  let baseAmount = 300000; // Sàn thấp nhất

  // 1. Hệ số quan hệ
  switch (data.relationship) {
    case "family":
      baseAmount += 500000;
      break;
    case "closeFriend":
      baseAmount += 300000;
      break;
    case "colleague":
      baseAmount += 200000;
      break;
    case "ex":
      baseAmount += 1000000;
      break; // Người yêu cũ thì phải sang
    case "social":
      baseAmount += 0;
      break;
    default:
      baseAmount += 0;
  }

  // 2. Hệ số địa điểm
  if (data.location === "luxury") baseAmount += 500000;
  else if (data.location === "restaurant") baseAmount += 200000;

  // 3. Hệ số thu nhập
  if (data.incomeLevel === "student")
    baseAmount = Math.max(300000, baseAmount - 200000); // Giảm nhưng không dưới 300k
  if (data.incomeLevel === "rich") baseAmount *= 1.5;

  // 4. Đi kèm
  if (data.companion) baseAmount += 500000;

  // Làm tròn lên cho đẹp (bội số của 50k)
  return Math.ceil(baseAmount / 50000) * 50000;
};
