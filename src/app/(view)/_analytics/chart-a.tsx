import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartA from "../_home/line-chart";
export default function ChartAC() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl">New User Growth</CardTitle>
        {/* <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select> */}
      </CardHeader>
      <CardContent>
        <div className="w-full h-6 flex items-center justify-center gap-3">
          <div className="h-4 aspect-[6/2] rounded bg-chart-2" />
          <p className="text-xs font-semibold text-muted-foreground mr-6">
            New User
          </p>
          <div className="h-4 aspect-[6/2] rounded bg-chart-1" />
          <p className="text-xs font-semibold text-muted-foreground">
            Active User
          </p>
        </div>
        <ChartA />
      </CardContent>
    </Card>
  );
}
