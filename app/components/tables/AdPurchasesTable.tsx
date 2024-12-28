import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AdPurchase {
  id: number;
  client: string;
  adType: string;
  amount: number;
  purchasedAt: string;
}

interface AdPurchasesTableProps {
  data: AdPurchase[];
}

export function AdPurchasesTable({ data }: AdPurchasesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>广告类型</TableHead>
          <TableHead>金额</TableHead>
          <TableHead>购买时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell>{purchase.id}</TableCell>
            <TableCell>{purchase.client}</TableCell>
            <TableCell>{purchase.adType}</TableCell>
            <TableCell>¥{purchase.amount.toFixed(2)}</TableCell>
            <TableCell>{purchase.purchasedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

