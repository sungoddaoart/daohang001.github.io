import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface NewSubmission {
  id: number;
  title: string;
  category: string;
  submittedAt: string;
}

interface NewSubmissionsTableProps {
  data: NewSubmission[];
}

export function NewSubmissionsTable({ data }: NewSubmissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>标题</TableHead>
          <TableHead>分类</TableHead>
          <TableHead>提交时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.id}</TableCell>
            <TableCell>{submission.title}</TableCell>
            <TableCell>{submission.category}</TableCell>
            <TableCell>{submission.submittedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

