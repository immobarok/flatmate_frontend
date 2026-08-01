import { UserRole, UserStatus } from "../auth/auth.types";

export interface UserResponse {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  status: UserStatus;
  messId?: string | null;
  balance?: number;
}

export interface ActiveMonth {
  id: string;
  name: string;
  startDate: string | Date;
  messTotalMeals: number;
  messTotalBazaar: number;
  currentMealRate: number;
}

export interface BazaarItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
}

export interface PendingBazaar {
  id: string;
  bazaarDate: string | Date;
  items: BazaarItem[];
}

export interface ApprovedBazaar {
  id: string;
  amount: number;
  bazaarDate: string | Date;
  items: BazaarItem[];
}

export interface MealCancellation {
  id: string;
  reason?: string;
  requestedAt: string | Date;
  dailyRecord: {
    date: string | Date;
  };
}

export interface CurrentMonthStats {
  myTotalMeals: number;
  myEstimatedCost: number;
  myTotalDeposit: number;
  myPendingBazaars: PendingBazaar[];
  myApprovedBazaars: ApprovedBazaar[];
  myCancellations: MealCancellation[];
}

export interface MemberDashboardResponse {
  user: UserResponse;
  activeMonth: ActiveMonth | null;
  currentMonthStats: CurrentMonthStats | null;
}

export interface AdminMonthStats {
  monthName: string;
  messTotalMeals: number;
  messTotalBazaar: number;
  currentMealRate: number;
  pendingBazaarsCount: number;
  pendingCancellationsCount: number;
}

export interface AdminDashboardResponse {
  totalActiveMembers: number;
  totalMessBalance: number;
  currentMonthStats: AdminMonthStats | null;
}
