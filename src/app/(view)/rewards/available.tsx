import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ViewChallange from "./view-reward";
import DeleteChallange from "./delete-reward";

export default function Available() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>REWARD NAME</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead>POINT REQUIRED</TableHead>
          <TableHead>PARTNER</TableHead>
          <TableHead>AVAILABILITY</TableHead>
          <TableHead>REDEMPTIONS</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1001}</TableCell>
            <TableCell>$10 Amazon Gift Card</TableCell>
            <TableCell>Digital</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>Amazon</TableCell>
            <TableCell>
              <Badge variant={"success"}>Active</Badge>
            </TableCell>
            <TableCell>245</TableCell>
            <TableCell>
              <ViewChallange />
              <DeleteChallange />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
