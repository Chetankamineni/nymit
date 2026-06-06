"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Flame,
  Heart,
  Info,
  X,
} from "lucide-react";
import { useState } from "react";

export type AlertType = "warning" | "info" | "success";

export interface CoachAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const TYPE_STYLES: Record<
  AlertType,
  {
    border: string;
    bg: string;
    titleColor: string;
    msgColor: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  warning: {
    border: "border-l-[#BA7517]",
    bg: "bg-white dark:bg-neutral-950",
    titleColor: "text-[#633806]",
    msgColor: "text-neutral-600 dark:text-neutral-400",
    iconBg: "bg-[#FAEEDA]",
    iconColor: "text-[#854F0B]",
  },
  info: {
    border: "border-l-[#185FA5]",
    bg: "bg-white dark:bg-neutral-950",
    titleColor: "text-[#0C447C]",
    msgColor: "text-neutral-600 dark:text-neutral-400",
    iconBg: "bg-[#E6F1FB]",
    iconColor: "text-[#185FA5]",
  },
  success: {
    border: "border-l-[#3B6D11]",
    bg: "bg-white dark:bg-neutral-950",
    titleColor: "text-[#27500A]",
    msgColor: "text-neutral-600 dark:text-neutral-400",
    iconBg: "bg-[#EAF3DE]",
    iconColor: "text-[#3B6D11]",
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  droplet: Droplets,
  flame: Flame,
  heart: Heart,
};

function AlertCard({
  alert,
  onDismiss,
}: {
  alert: CoachAlert;
  onDismiss: (id: string) => void;
}) {
  const s = TYPE_STYLES[alert.type];
  const Icon = ICON_MAP[alert.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border-l-[3px] border-t border-r border-b border-black/10 dark:border-white/10 ${s.border} ${s.bg}`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg}`}
      >
        <Icon className={`w-4 h-4 ${s.iconColor}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium mb-0.5 ${s.titleColor}`}>
          {alert.title}
        </p>
        <p className={`text-xs leading-relaxed ${s.msgColor}`}>
          {alert.message}
        </p>
        {alert.action && (
          <button
            onClick={alert.action.onClick}
            className={`text-[11px] font-medium mt-1.5 underline underline-offset-2 ${s.titleColor}`}
          >
            {alert.action.label}
          </button>
        )}
      </div>

      <button
        onClick={() => onDismiss(alert.id)}
        className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors shrink-0 mt-0.5"
        aria-label="Dismiss alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

interface CoachAlertsProps {
  alerts: CoachAlert[];
  onDismiss?: (id: string) => void;
}

export function CoachAlerts({ alerts, onDismiss }: CoachAlertsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
    onDismiss?.(id);
  };

  const visible = alerts.filter((a) => !dismissed.has(a.id));

  if (!visible.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Coach insights
      </p>
      <AnimatePresence initial={false}>
        {visible.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Alert engine — derive alerts from logged food data ───────────────────────

export interface FoodLogSummary {
  totalSodiumMg: number;
  totalCalories: number;
  hasUltraProcessed: boolean;
  hasFried: boolean;
  hasDahi: boolean;
  hasLowFatMeal: boolean;
}

export function deriveAlerts(
  summary: FoodLogSummary,
  onActionClick?: (prompt: string) => void,
): CoachAlert[] {
  const alerts: CoachAlert[] = [];

  if (summary.totalSodiumMg > 600) {
    alerts.push({
      id: "high_sodium",
      type: "warning",
      title: "High sodium detected",
      message:
        "You've logged over 600mg sodium today. Try an extra glass of water and keep dinner light — a simple dal or curd works great.",
      action: {
        label: "Get low-sodium dinner ideas →",
        onClick: () =>
          onActionClick?.("Suggest a low-sodium Indian dinner for tonight"),
      },
    });
  }

  if (summary.hasFried) {
    alerts.push({
      id: "fried_foods",
      type: "warning",
      title: "Fried foods logged",
      message:
        "Fried items can add up fast. Consider balancing with something fibre-rich like sabzi or a salad for your next meal.",
      action: {
        label: "Show fibre-rich options →",
        onClick: () =>
          onActionClick?.(
            "What are some fibre-rich Indian foods I can have tonight?",
          ),
      },
    });
  }

  if (summary.hasUltraProcessed) {
    alerts.push({
      id: "ultra_processed",
      type: "warning",
      title: "Ultra-processed snack",
      message:
        "Packaged snacks are high in sodium and refined carbs. A handful of nuts or fruit is a much better pick-me-up.",
      action: {
        label: "See healthier snack swaps →",
        onClick: () =>
          onActionClick?.(
            "What are healthy Indian snack alternatives to chips and namkeen?",
          ),
      },
    });
  }

  if (summary.hasLowFatMeal && !summary.hasFried) {
    alerts.push({
      id: "low_fat",
      type: "info",
      title: "Great low-fat choice",
      message:
        "Idli and sambar is one of the best balanced meals you can have. High fibre, low fat — nicely done.",
    });
  }

  if (summary.hasDahi) {
    alerts.push({
      id: "probiotic",
      type: "success",
      title: "Gut health boost",
      message:
        "Dahi is excellent for gut health. Consistent intake supports digestion and immunity.",
    });
  }

  return alerts;
}
