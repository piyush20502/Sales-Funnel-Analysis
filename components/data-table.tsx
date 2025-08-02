"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface DataTableProps {
  data: any[]
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Product Viewed</TableHead>
            <TableHead>Added to Cart</TableHead>
            <TableHead>Order Placed</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.user_id}</TableCell>
              <TableCell>{row.device_type}</TableCell>
              <TableCell>
                <Badge variant={row.product_viewed ? "default" : "secondary"}>
                  {row.product_viewed ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row.added_to_cart ? "default" : "secondary"}>{row.added_to_cart ? "Yes" : "No"}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row.order_placed ? "default" : "secondary"}>{row.order_placed ? "Yes" : "No"}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row.payment_completed ? "default" : "secondary"}>
                  {row.payment_completed ? "Yes" : "No"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
