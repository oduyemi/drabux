"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext"; 
import { toast } from "react-hot-toast";

const schema = z.object({
  amount: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 10, {
    message: "Minimum deposit is 10 USDT",
  }),
});

type FormData = z.infer<typeof schema>;

interface ConfirmDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmDepositModal: React.FC<ConfirmDepositModalProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleDeposit = async (data: FormData) => {
    setLoading(true);
    try {
        const res = await fetch("https://novunt.vercel.app/api/v1/transactions/deposit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(data.amount) }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Failed to deposit");

        // Show NowPayments modal or redirect to payment URL
        if (result.paymentUrl) {
        window.open(result.paymentUrl, "_blank"); // You can also use iframe/modal
        } else {
        toast.error("Payment URL not provided");
        }

        reset();
        onClose();
    } catch (err: any) {
        toast.error(err.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
    };

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Confirm Deposit</h2>

        <form onSubmit={handleSubmit(handleDeposit)} className="space-y-4">
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Enter amount (min 10 USDT)"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("amount")}
              disabled={loading}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ConfirmDepositModal;
