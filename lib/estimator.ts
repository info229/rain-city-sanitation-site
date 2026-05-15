export type EstimateItemId =
  | "mattress-box-spring-small"
  | "mattress-box-spring-large"
  | "couch-loveseat"
  | "recliner-sleeper"
  | "small-furniture"
  | "medium-furniture"
  | "large-furniture"
  | "small-misc"
  | "medium-misc"
  | "large-misc"
  | "appliance"
  | "electronics"
  | "yard-waste"
  | "construction-debris";

export type EstimateItemDefinition = {
  id: EstimateItemId;
  label: string;
  min: number;
  max: number;
  helper: string;
};

export type EstimateSelections = {
  items: Partial<Record<EstimateItemId, number>>;
  stairs: "none" | "yes";
  access: "curbside" | "inside";
  disassembly: boolean;
  sameDay: boolean;
  heavyMaterial: boolean;
  zip: string;
  name: string;
  phone: string;
  typedSignature: string;
  approvalChecked: boolean;
};

export type EstimateResult = {
  totalMin: number;
  totalMax: number;
  lineItems: Array<{ label: string; quantity: number; min: number; max: number }>;
  serviceFee: { min: number; max: number } | null;
  tax: { min: number; max: number; rate: number } | null;
  confidenceNote: string;
};

export const SERVICE_FEE = 60;
export const ESTIMATED_TAX_RATE = 0.105;

export const estimateItems: EstimateItemDefinition[] = [
  {
    id: "mattress-box-spring-small",
    label: "Mattress / Box Spring (Full or Smaller)",
    min: 35,
    max: 35,
    helper: "Twin, twin XL, full mattress or box spring",
  },
  {
    id: "mattress-box-spring-large",
    label: "Mattress / Box Spring (Queen or Bigger)",
    min: 45,
    max: 45,
    helper: "Queen, king, California king mattress or box spring",
  },
  { id: "couch-loveseat", label: "Couch / Love Seat", min: 35, max: 55, helper: "Standard sofa or loveseat" },
  { id: "recliner-sleeper", label: "Recliner / Sleeper", min: 50, max: 70, helper: "Recliners and sleeper pieces" },
  { id: "small-furniture", label: "Small Furniture", min: 15, max: 30, helper: "Nightstands, small desks, compact pieces" },
  { id: "medium-furniture", label: "Medium Furniture", min: 35, max: 55, helper: "Coffee tables, TV stands, medium dressers" },
  { id: "large-furniture", label: "Large Furniture", min: 60, max: 90, helper: "Large cabinets, bed frames, dining tables" },
  { id: "small-misc", label: "Small Misc Pile", min: 30, max: 50, helper: "Clothes, cardboard, garbage, small loose pile" },
  { id: "medium-misc", label: "Medium Misc Pile", min: 50, max: 80, helper: "Medium build debris or loose cleanup pile" },
  { id: "large-misc", label: "Large Misc Pile", min: 80, max: 120, helper: "Large build debris or loose cleanup pile" },
  { id: "appliance", label: "Appliance", min: 35, max: 55, helper: "Not including fridges or AC units" },
  { id: "electronics", label: "Electronics", min: 10, max: 45, helper: "TVs, monitors, printers, and other electronics" },
  { id: "yard-waste", label: "Yard Waste (per yard)", min: 150, max: 150, helper: "No range, per cubic yard" },
  { id: "construction-debris", label: "Construction Debris (per ton)", min: 350, max: 350, helper: "No range, per ton equivalent" },
];

const stairsAdjustment = {
  none: { min: 0, max: 0 },
  yes: { min: 10, max: 10 },
};

const accessAdjustmentMultiplier = {
  curbside: { min: 0.9, max: 0.9 },
  inside: { min: 0, max: 0 },
};

export function calculateEstimate(selections: EstimateSelections): EstimateResult {
  const lineItems = estimateItems
    .map((item) => {
      const quantity = selections.items[item.id] || 0;
      return quantity > 0
        ? {
            label: item.label,
            quantity,
            min: item.min * quantity,
            max: item.max * quantity,
          }
        : null;
    })
    .filter(Boolean) as Array<{ label: string; quantity: number; min: number; max: number }>;

  const itemsMin = lineItems.reduce((sum, item) => sum + item.min, 0);
  const itemsMax = lineItems.reduce((sum, item) => sum + item.max, 0);

  let adjustmentsMin = 0;
  let adjustmentsMax = 0;

  adjustmentsMin += stairsAdjustment[selections.stairs].min;
  adjustmentsMax += stairsAdjustment[selections.stairs].max;

  if (selections.access === "curbside") {
    adjustmentsMin -= itemsMin * (1 - accessAdjustmentMultiplier.curbside.min);
    adjustmentsMax -= itemsMax * (1 - accessAdjustmentMultiplier.curbside.max);
  } else {
    adjustmentsMin += accessAdjustmentMultiplier[selections.access].min;
    adjustmentsMax += accessAdjustmentMultiplier[selections.access].max;
  }

  if (selections.disassembly) {
    adjustmentsMin += 25;
    adjustmentsMax += 95;
  }

  if (selections.sameDay) {
    adjustmentsMin += 15;
    adjustmentsMax += 75;
  }

  if (selections.heavyMaterial) {
    adjustmentsMin += 40;
    adjustmentsMax += 180;
  }

  const hasItems = lineItems.length > 0;
  const serviceFee = hasItems ? { min: SERVICE_FEE, max: SERVICE_FEE } : null;
  const subtotalMin = Math.max(0, itemsMin + adjustmentsMin + (serviceFee?.min || 0));
  const subtotalMax = Math.max(0, itemsMax + adjustmentsMax + (serviceFee?.max || 0));
  const tax = hasItems
    ? {
        min: Math.round(subtotalMin * ESTIMATED_TAX_RATE),
        max: Math.round(subtotalMax * ESTIMATED_TAX_RATE),
        rate: ESTIMATED_TAX_RATE,
      }
    : null;
  const totalMin = Math.max(0, subtotalMin + (tax?.min || 0));
  const totalMax = Math.max(0, subtotalMax + (tax?.max || 0));

  return {
    totalMin,
    totalMax,
    lineItems,
    serviceFee,
    tax,
    confidenceNote: hasItems
      ? "Estimated range includes the standard service fee and estimated tax. Final confirmation may change for specialty pickups, photo review, unusual access, or the exact service address."
      : "Add at least one item to start building your estimate.",
  };
}

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}
