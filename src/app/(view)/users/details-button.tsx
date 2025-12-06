import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon, Loader2Icon } from "lucide-react";
import { dateExtractor } from "@/lib/functions";
import { idk } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function DetailsButton({ x }: { x: idk }) {
  // const [{ token }] = useCookies(["token"]);
  // const { data, isPending } = useQuery({
  //   queryKey: ["trans_info", x],
  //   queryFn: (): idk => {
  //     return getTransactionsApi({ user_id: x.id, per_page: 1, token });
  //   },
  // });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-6">
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className=" ">
            <h4 className="pb-6">Basic Information</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <b>Full Name: </b>
                {x.full_name}
              </p>
              <p className="text-sm text-muted-foreground">
                <b>Email: </b>
                {x.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <b>Joining Date: </b>
                {dateExtractor(x.created_at)}
              </p>
              <p className="text-sm text-muted-foreground">
                <b>Status: </b>
                <Badge>{x.status}</Badge>
              </p>
              {/* <p className="text-sm text-muted-foreground">
                                <b>Challenges Completed: </b>{x.}
                              </p> */}
              <p className="text-sm text-muted-foreground">
                <b>Total Points: </b>
                {x.profile.total_points}
              </p>
            </div>
          </div>
          <div className=""></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// {isPending ? (
//   <div className={`flex justify-center items-center h-24 mx-auto`}>
//     <Loader2Icon className={`animate-spin`} />
//   </div>
// ) : (
//   <div className="">
//     <h4 className="pb-6">Account Details</h4>
//     <div className="space-y-2">
//       <p className="text-sm text-muted-foreground">
//         <b>Subscription: </b>
//         {data?.data?.plan_name}
//       </p>
//       <p className="text-sm text-muted-foreground">
//         <b>Payment Method: </b>
//         {data?.data?.card_number ? "Card" : "N/A"}
//       </p>
//       {/* <p className="text-sm text-muted-foreground">
//         <b>Payment Method: </b>
//         {x.email}
//       </p> */}
//     </div>
//   </div>
// )}
