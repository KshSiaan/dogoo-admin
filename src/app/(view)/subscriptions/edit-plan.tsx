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
import { addSubscriptionsApi, updateSubscriptionsApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PercentIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  plan_name: z.string().min(1, "Plan name required"),
  duration: z.string().min(1, "Duration required"),
  price: z.string().min(1, "Price required"),
  discount: z.string().optional(),
  features: z.array(z.string()).optional(),
});

const dumFeats = [
  "Join challenge group & activity",
  "Only 5 habits added",
  "Only 5 Say No added",
  "Earn point 1 per work done",
];
const availableFeatures = [
  "Creating a challenge group",
  "Unlimited habits added",
  "Unlimited Say No added",
  "Advanced graphical analytics",
  "Earn point 2x per work done",
  "Reward redemption by point",
];
export default function EditPlan({ data }: { data: idk }) {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);

  const { mutate } = useMutation({
    mutationKey: ["update_plan"],
    mutationFn: (body: idk) => {
      return updateSubscriptionsApi({ id: data.id, body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated plan!");
      qcl.invalidateQueries({ queryKey: ["subsc"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: "",
      duration: String(data?.duration).toLocaleLowerCase() || "monthly",
      price: "",
      discount: "",
      features: [],
    },
  });

  const onSubmit = (dataset: z.infer<typeof formSchema>) => {
    const payload = {
      plan_name: dataset.plan_name,
      duration: dataset.duration,
      discount: dataset.discount ?? 0,
      price: dataset.price,
      features: dataset.features,
    };

    if (data.id === 1) {
      mutate({
        features: dataset.features,
      });
    } else {
      mutate(payload);
    }
  };
  useEffect(() => {
    if (data) {
      form.setValue("plan_name", data.plan_name);
      form.setValue("duration", data.duration);
      form.setValue("price", data.price);
      form.setValue("discount", String(data.discount).toLowerCase() ?? "0");
      form.setValue("features", data.features || []); //
    }
  }, [data, form]);

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
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput type="number" {...field} />
                  <InputGroupAddon align={"inline-end"}>
                    <PercentIcon />
                  </InputGroupAddon>
                </InputGroup>
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
              <Select value={field.value} onValueChange={field.onChange}>
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

        <Separator />
        <h4 className="text-sm">Basic Features</h4>
        <div className="grid grid-cols-2 gap-4">
          {dumFeats.map((feats) => (
            <div className="flex items-start gap-2" key={feats}>
              <Checkbox checked disabled />
              <Label className="font-normal">{feats}</Label>
            </div>
          ))}
        </div>

        <Separator />
        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <FormLabel>Additional Features</FormLabel>
              <div className="grid grid-cols-2 gap-4 pt-4">
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
          <Button type="submit">Update {data.plan_name} plan</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
