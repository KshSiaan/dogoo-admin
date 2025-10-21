"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubscriptionsApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

const formSchema = z.object({
  plan_name: z.string().min(1, "Plan name required"),
  duration: z.string().min(1, "Duration required"),
  price: z.string().min(1, "Price required"),
  features: z.array(z.string()).optional(),
});

const availableFeatures = [
  "Basic challenges",
  "Unlimited habits tracking",
  "Unlimited Say No",
  "Advanced analytics",
  "Premium rewards (earn point 2x)",
];
export default function AddSub() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);

  const { mutate } = useMutation({
    mutationKey: ["add_plan"],
    mutationFn: (body: idk) => {
      return addSubscriptionsApi({ body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully created plan!");
      qcl.invalidateQueries({ queryKey: ["subsc"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: "",
      duration: "",
      price: "",
      features: [],
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload = {
      plan_name: data.plan_name,
      duration: data.duration,
      price: data.price,
      //   ...data?.features?.reduce((acc, feature, index) => {
      //     acc[`features[${index}]`] = feature;
      //     return acc;
      //   }, {} as Record<string, string>),
      features: data.features,
    };

    mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Plan Name */}
        <FormField
          control={form.control}
          name="plan_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter plan name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter price (e.g., 2.99)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Features */}
        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {availableFeatures.map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      const checked = field.value?.includes(feature);
                      return (
                        <FormItem
                          key={feature}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) => {
                                if (value) {
                                  field.onChange([
                                    ...(field.value || []),
                                    feature,
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((f) => f !== feature)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {feature}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Create new plan</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
