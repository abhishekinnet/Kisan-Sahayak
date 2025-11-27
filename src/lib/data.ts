import { PlaceHolderImages } from "./placeholder-images";
import type { FinancialRecord, KpiCard, RecentActivity, MarketPrice, GovernmentScheme } from "./types";
import { CloudRain, DollarSign, Leaf, Sprout } from "lucide-react";

export const kpiData: KpiCard[] = [
  {
    title: "Soil Moisture",
    value: "45%",
    change: "+5%",
    changeType: "increase",
    icon: CloudRain,
  },
  {
    title: "Crop Health",
    value: "92%",
    change: "-1.2%",
    changeType: "decrease",
    icon: Leaf,
  },
  {
    title: "Expected Yield",
    value: "2.5 t/acre",
    change: "+0.1 t",
    changeType: "increase",
    icon: Sprout,
  },
  {
    title: "Market Rate (Wheat)",
    value: "₹2,275/q",
    change: "+₹25",
    changeType: "increase",
    icon: DollarSign,
  },
];

export const chartData = [
  { date: "Jan", rainfall: 30, temperature: 15 },
  { date: "Feb", rainfall: 45, temperature: 18 },
  { date: "Mar", rainfall: 60, temperature: 22 },
  { date: "Apr", rainfall: 80, temperature: 28 },
  { date: "May", rainfall: 110, temperature: 32 },
  { date: "Jun", rainfall: 150, temperature: 30 },
  { date: "Jul", rainfall: 220, temperature: 28 },
  { date: "Aug", rainfall: 200, temperature: 27 },
  { date: "Sep", rainfall: 120, temperature: 26 },
  { date: "Oct", rainfall: 50, temperature: 24 },
  { date: "Nov", rainfall: 20, temperature: 20 },
  { date: "Dec", rainfall: 15, temperature: 16 },
];

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
export const recentActivities: RecentActivity[] = [
  {
    id: "1",
    user: { name: "AI Advisor", avatar: userAvatar?.imageUrl || '', avatarHint: userAvatar?.imageHint || '' },
    action: "diagnosed",
    target: "leaf blight on corn",
    time: "5m ago",
  },
  {
    id: "2",
    user: { name: "System", avatar: userAvatar?.imageUrl || '', avatarHint: userAvatar?.imageHint || '' },
    action: "sent",
    target: "weather alert for heavy rain",
    time: "1h ago",
  },
  {
    id: "3",
    user: { name: "You", avatar: userAvatar?.imageUrl || '', avatarHint: userAvatar?.imageHint || '' },
    action: "added",
    target: "fertilizer expense",
    time: "3h ago",
  },
  {
    id: "4",
    user: { name: "Market Bot", avatar: userAvatar?.imageUrl || '', avatarHint: userAvatar?.imageHint || '' },
    action: "updated",
    target: "wheat prices",
    time: "8h ago",
  },
];

export const allMarketPrices: MarketPrice[] = [
    // Cereals
    { id: '1', crop: 'Wheat', category: 'Cereals', localMandiPrice: 2275, stateAvgPrice: 2250 },
    { id: '2', crop: 'Rice', category: 'Cereals', localMandiPrice: 3800, stateAvgPrice: 3850 },
    { id: '3', crop: 'Maize', category: 'Cereals', localMandiPrice: 1820, stateAvgPrice: 1850 },
    { id: '4', crop: 'Barley', category: 'Cereals', localMandiPrice: 1650, stateAvgPrice: 1640 },
    { id: '5', crop: 'Oats', category: 'Cereals', localMandiPrice: 2100, stateAvgPrice: 2120 },
    { id: '6', crop: 'Sorghum', category: 'Cereals', localMandiPrice: 1900, stateAvgPrice: 1900 },
    { id: '7', crop: 'Rye', category: 'Cereals', localMandiPrice: 1700, stateAvgPrice: 1750 },
    { id: '8', crop: 'Millets', category: 'Cereals', localMandiPrice: 2500, stateAvgPrice: 2480 },
    // Pulses
    { id: '9', crop: 'Chickpea', category: 'Pulses', localMandiPrice: 4850, stateAvgPrice: 4900 },
    { id: '10', crop: 'Lentil', category: 'Pulses', localMandiPrice: 5100, stateAvgPrice: 5150 },
    { id: '11', crop: 'Mung bean', category: 'Pulses', localMandiPrice: 7200, stateAvgPrice: 7150 },
    { id: '12', crop: 'Black gram', category: 'Pulses', localMandiPrice: 6800, stateAvgPrice: 6850 },
    { id: '13', crop: 'Kidney bean', category: 'Pulses', localMandiPrice: 8500, stateAvgPrice: 8500 },
    { id: '14', crop: 'Pea', category: 'Pulses', localMandiPrice: 3500, stateAvgPrice: 3450 },
    { id: '15', crop: 'Soybean', category: 'Pulses', localMandiPrice: 4500, stateAvgPrice: 4600 },
    { id: '16', crop: 'Pigeon pea', category: 'Pulses', localMandiPrice: 6600, stateAvgPrice: 6550 },
    // Oilseeds
    { id: '17', crop: 'Sunflower', category: 'Oilseeds', localMandiPrice: 4800, stateAvgPrice: 4750 },
    { id: '18', crop: 'Canola', category: 'Oilseeds', localMandiPrice: 5200, stateAvgPrice: 5250 },
    { id: '19', crop: 'Mustard', category: 'Oilseeds', localMandiPrice: 5450, stateAvgPrice: 5500 },
    { id: '20', crop: 'Groundnut', category: 'Oilseeds', localMandiPrice: 5500, stateAvgPrice: 5550 },
    { id: '21', crop: 'Sesame', category: 'Oilseeds', localMandiPrice: 9000, stateAvgPrice: 8900 },
    { id: '22', crop: 'Flaxseed', category: 'Oilseeds', localMandiPrice: 6000, stateAvgPrice: 6100 },
    { id: '23', crop: 'Castor', category: 'Oilseeds', localMandiPrice: 5800, stateAvgPrice: 5800 },
    // Vegetables
    { id: '24', crop: 'Tomato', category: 'Vegetables', localMandiPrice: 1500, stateAvgPrice: 1600 },
    { id: '25', crop: 'Potato', category: 'Vegetables', localMandiPrice: 1200, stateAvgPrice: 1250 },
    { id: '26', crop: 'Onion', category: 'Vegetables', localMandiPrice: 2500, stateAvgPrice: 2400 },
    { id: '27', crop: 'Garlic', category: 'Vegetables', localMandiPrice: 7000, stateAvgPrice: 7100 },
    { id: '28', crop: 'Carrot', category: 'Vegetables', localMandiPrice: 1800, stateAvgPrice: 1750 },
    { id: '29', crop: 'Cabbage', category: 'Vegetables', localMandiPrice: 800, stateAvgPrice: 850 },
    { id: '30', crop: 'Cauliflower', category: 'Vegetables', localMandiPrice: 1000, stateAvgPrice: 1000 },
    { id: '31', crop: 'Spinach', category: 'Vegetables', localMandiPrice: 500, stateAvgPrice: 550 },
    { id: '32', crop: 'Okra', category: 'Vegetables', localMandiPrice: 2200, stateAvgPrice: 2100 },
    { id: '33', crop: 'Eggplant', category: 'Vegetables', localMandiPrice: 1300, stateAvgPrice: 1350 },
    // Fruits
    { id: '34', crop: 'Mango', category: 'Fruits', localMandiPrice: 6000, stateAvgPrice: 6200 },
    { id: '35', crop: 'Banana', category: 'Fruits', localMandiPrice: 1500, stateAvgPrice: 1450 },
    { id: '36', crop: 'Apple', category: 'Fruits', localMandiPrice: 8000, stateAvgPrice: 8100 },
    { id: '37', crop: 'Orange', category: 'Fruits', localMandiPrice: 4000, stateAvgPrice: 4050 },
    { id: '38', crop: 'Grapes', category: 'Fruits', localMandiPrice: 4000, stateAvgPrice: 4000 },
    { id: '39', crop: 'Papaya', category: 'Fruits', localMandiPrice: 1800, stateAvgPrice: 1700 },
    { id: '40', crop: 'Pineapple', category: 'Fruits', localMandiPrice: 2500, stateAvgPrice: 2550 },
    { id: '41', crop: 'Watermelon', category: 'Fruits', localMandiPrice: 900, stateAvgPrice: 950 },
    { id: '42', crop: 'Pomegranate', category: 'Fruits', localMandiPrice: 9500, stateAvgPrice: 9400 },
    { id: '43', crop: 'Guava', category: 'Fruits', localMandiPrice: 2200, stateAvgPrice: 2200 },
    // Spices
    { id: '44', crop: 'Turmeric', category: 'Spices', localMandiPrice: 7500, stateAvgPrice: 7600 },
    { id: '45', crop: 'Ginger', category: 'Spices', localMandiPrice: 8000, stateAvgPrice: 7900 },
    { id: '46', crop: 'Black pepper', category: 'Spices', localMandiPrice: 35000, stateAvgPrice: 35500 },
    { id: '47', crop: 'Cardamom', category: 'Spices', localMandiPrice: 120000, stateAvgPrice: 121000 },
    { id: '48', crop: 'Coriander', category: 'Spices', localMandiPrice: 6500, stateAvgPrice: 6400 },
    { id: '49', crop: 'Cumin', category: 'Spices', localMandiPrice: 15000, stateAvgPrice: 15200 },
    // Plantation Crops
    { id: '50', crop: 'Coffee', category: 'Plantation Crops', localMandiPrice: 18000, stateAvgPrice: 18200 },
    { id: '51', crop: 'Tea', category: 'Plantation Crops', localMandiPrice: 250, stateAvgPrice: 255 }, // Price per kg
    { id: '52', crop: 'Rubber', category: 'Plantation Crops', localMandiPrice: 15000, stateAvgPrice: 14800 },
    { id: '53', crop: 'Coconut', category: 'Plantation Crops', localMandiPrice: 2800, stateAvgPrice: 2800 },
    // Fiber Crops
    { id: '54', crop: 'Cotton', category: 'Fiber Crops', localMandiPrice: 6500, stateAvgPrice: 6450 },
    { id: '55', crop: 'Jute', category: 'Fiber Crops', localMandiPrice: 4500, stateAvgPrice: 4550 },
    { id: '56', crop: 'Hemp', category: 'Fiber Crops', localMandiPrice: 7000, stateAvgPrice: 7100 },
];

export const financialRecords: FinancialRecord[] = [
    { id: '1', date: '2024-07-10', type: 'Expense', category: 'Seeds', description: 'Wheat seeds for 5 acres', amount: 7500 },
    { id: '2', date: '2024-07-15', type: 'Expense', category: 'Fertilizer', description: 'Urea and DAP', amount: 4200 },
    { id: '3', date: '2024-07-20', type: 'Expense', category: 'Labor', description: 'Sowing labor charges', amount: 3000 },
    { id: '4', date: '2024-11-05', type: 'Income', category: 'Sales', description: 'Sale of 50 quintal wheat', amount: 113750 },
    { id: '5', date: '2024-11-10', type: 'Income', category: 'Sales', description: 'Sale of straw', amount: 5000 },
];

export const governmentSchemes: GovernmentScheme[] = [
    {
        id: '1',
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        description: 'A central sector scheme with 100% funding from the Government of India. It provides income support of ₹6,000 per year in three equal installments to small and marginal farmer families.',
        benefits: ['Income Support', 'Financial Stability'],
        eligibility: 'All small and marginal landholder farmer families with cultivable landholding up to 2 hectares.',
        link: 'https://pmkisan.gov.in/'
    },
    {
        id: '2',
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'A crop insurance scheme to provide comprehensive insurance coverage and financial support to farmers in the event of failure of any of the notified crops as a result of natural calamities, pests, and diseases.',
        benefits: ['Crop Insurance', 'Risk Mitigation'],
        eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.',
        link: 'https://pmfby.gov.in/'
    },
    {
        id: '3',
        name: 'Kisan Credit Card (KCC)',
        description: 'The KCC scheme aims at providing adequate and timely credit support from the banking system under a single window with a flexible and simplified procedure to farmers for their cultivation and other needs.',
        benefits: ['Credit Facility', 'Low Interest Rates'],
        eligibility: 'All farmers - individuals/joint borrowers who are owner cultivators, tenant farmers, oral lessees & sharecroppers, etc.',
        link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
    },
    {
        id: '4',
        name: 'Soil Health Card Scheme',
        description: 'A scheme to provide every farmer with a Soil Health Card, which will carry crop-wise recommendations of nutrients and fertilizers required for the individual farms to help farmers improve productivity.',
        benefits: ['Soil Analysis', 'Nutrient Management'],
        eligibility: 'Available to all farmers across the country.',
        link: 'https://soilhealth.dac.gov.in/'
    },
     {
        id: '5',
        name: 'Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)',
        description: 'A scheme aimed at strengthening infrastructure in agriculture and allied sectors to promote agri-entrepreneurship and agribusiness by providing financial support and nurturing a startup ecosystem.',
        benefits: ['Infrastructure Dev.', 'Agripreneurship'],
        eligibility: 'Startups in the agriculture and allied sectors. Varies by state and specific project.',
        link: 'https://rkvy.nic.in/'
    },
     {
        id: '6',
        name: 'National Mission for Sustainable Agriculture (NMSA)',
        description: 'One of the eight Missions under the National Action Plan on Climate Change (NAPCC), it aims to enhance agricultural productivity especially in rainfed areas focusing on integrated farming, water use efficiency, and soil health management.',
        benefits: ['Climate Resilience', 'Water Efficiency', 'Soil Health'],
        eligibility: 'Varies based on the specific component of the mission. Generally applicable to all farmers.',
        link: 'https://nmsa.gov.in/'
    }
];
