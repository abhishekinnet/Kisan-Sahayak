export type KpiCard = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
};

export type RecentActivity = {
  id: string;
  user: {
    name: string;
    avatar: string;
    avatarHint: string;
  };
  action: string;
  target: string;
  time: string;
};

export type MarketPrice = {
  id: string;
  crop: string;
  category: string;
  localMandiPrice: number;
  stateAvgPrice: number;
};

export type FinancialRecord = {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
};

export type GovernmentScheme = {
    id: string;
    name: string;
    description: string;
    benefits: string[];
    eligibility: string;
    link: string;
};
