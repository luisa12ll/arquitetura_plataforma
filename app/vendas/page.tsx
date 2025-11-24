"use client"

import { useState } from "react"
import Link from "next/link"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Plus,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Receipt
} from "lucide-react"

// Dados mockados temporários
const vendasMock = [
  {
    id: 1,
    cliente: "João Silva",
    itens: ["Produto A", "Produto B"],
    valor: 250.0,
    data: "2025-01-20",
    status: "Pendente"
  },
  {
    id: 2,
    cliente: "Maria Souza",
    itens: ["Item X"],
    valor: 120.5,
    data: "2025-01-18",
    status: "Paga"
  }
];

// Badge minimalista
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Paga" ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"

  return <Badge className={color}>{status}</Badge>
}

export default function VendasPage() {
  const [search, setSearch] = useState("")

  return (
    <DashboardLayout>
      <PageHeader
        title="Vendas"
        description="Gerencie registros de vendas e acompanhamento comercial"
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Vendas" }]}
        actions={
          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
            <Link href="/vendas/nova">
              <Plus className="mr-2 h-4 w-4" />
              Nova Venda
            </Link>
          </Button>
        }
      />

      {/* Busca */}
      <div className="mb-4">
        <Input
          placeholder="Buscar por cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-950 border-gray-800 text-white"
        />
      </div>

      {/* Tabs de status */}
      <Tabs defaultValue="todas" className="mb-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="pagas">Pagas</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="border-gray-800 bg-black">
        <CardContent className="p-0">
          {vendasMock.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              Ainda não existem vendas cadastradas.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead>Cliente</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {vendasMock.map((venda) => (
                  <TableRow key={venda.id} className="border-gray-800">
                    <TableCell>{venda.cliente}</TableCell>

                    {/* Ícone para ver itens */}
                    <TableCell>
                      <button className="text-blue-400 hover:text-blue-300 underline">
                        Ver itens
                      </button>
                    </TableCell>

                    <TableCell>R$ {venda.valor.toFixed(2)}</TableCell>
                    <TableCell>{venda.data}</TableCell>
                    <TableCell><StatusBadge status={venda.status} /></TableCell>

                    {/* Ações */}
                    <TableCell className="text-right space-x-2">
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4 text-gray-300" />
                      </Button>

                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4 text-gray-300" />
                      </Button>

                      <Button size="icon" variant="ghost">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </Button>

                      <Button size="icon" variant="ghost">
                        <XCircle className="h-4 w-4 text-red-400" />
                      </Button>

                      <Button size="icon" variant="ghost">
                        <Receipt className="h-4 w-4 text-yellow-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

