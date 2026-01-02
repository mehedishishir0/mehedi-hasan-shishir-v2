"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function FloatingReviewButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const testimonialMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/testomonial`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save Testimonial");
      return res.json();
    },
    onSuccess: (res) => {
      toast.success(res.message || "Review submitted");
      queryClient.invalidateQueries({ queryKey: ["Testimonial"] });
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setRating(0);
        setHoveredRating(0);
      }, 2000);
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());
    testimonialMutation.mutate(formData);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-white border shadow-md flex items-center justify-center hover:shadow-lg transition"
        >
          <Star className="w-6 h-6 text-blue-600" />
        </motion.button>
      </motion.div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white border shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Share Your Experience
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Your feedback helps improve our service.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Thank you!
                </h3>
                <p className="text-gray-500 text-sm">
                  Your review was submitted successfully.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name & Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input name="name" required />
                  </div>
                  <div>
                    <Label>Role *</Label>
                    <Input name="role" required />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label className="mb-2 block">Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoveredRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <Label>Feedback *</Label>
                  <Textarea
                    name="feedback"
                    required
                    rows={4}
                    placeholder="Write your feedback..."
                  />
                </div>

                {/* Image */}
                <div>
                  <Label>Profile Image (optional)</Label>
                  <Input type="file" name="image" accept="image/*" />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={testimonialMutation.isPending || rating === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {testimonialMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
