// app/membros/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Mail, Phone, Edit } from 'lucide-react'
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Membro {
  id: string
  nome: string
  email: string
  cargo: string
  departamento: string
  status: 'Ativo' | 'Inativo'
  telefone?: string
}

// Componente personalizado para o status dos membros
const MemberStatusBadge = ({ status }: { status: 'Ativo' | 'Inativo' }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'Ativo'
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
      }`}
    >
      {status}
    </span>
  )
}

export default function MembrosPage() {
  const [membros, setMembros] = useState<Membro[]>([])
  const [filteredMembros, setFilteredMembros] = useState<Membro[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('todos')

  const mockMembros: Membro[] = [
    { 
      id: "MEM001", 
      nome: "Gabriel", 
      email: "gabriel@engnet.com", 
      cargo: "Full Stack Developer", 
      departamento: "Desenvolvimento",
      status: "Ativo",
      telefone: "(11) 99999-1111"
    },
    { 
      id: "MEM002", 
      nome: "João Igor", 
      email: "joao.igor@engnet.com", 
      cargo: "Backend Engineer", 
      departamento: "Desenvolvimento",
      status: "Ativo",
      telefone: "(11) 99999-2222"
    },
    { 
      id: "MEM003", 
      nome: "Luísa de Souza", 
      email: "luisa.souza@engnet.com", 
      cargo: "UX/UI Designer", 
      departamento: "Design",
      status: "Ativo",
      telefone: "(11) 99999-3333"
    },
    { 
      id: "MEM004", 
      nome: "Moisés", 
      email: "moises@engnet.com", 
      cargo: "Project Manager", 
      departamento: "Gestão",
      status: "Ativo",
      telefone: "(11) 99999-4444"
    },
    { 
      id: "MEM005", 
      nome: "Ana Clara", 
      email: "ana.clara@engnet.com", 
      cargo: "Product Analyst", 
      departamento: "Produto",
      status: "Inativo",
      telefone: "(11) 99999-5555"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setMembros(mockMembros)
      setFilteredMembros(mockMembros)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Função para filtrar os membros baseado na aba ativa
  useEffect(() => {
    if (activeTab === 'ativos') {
      setFilteredMembros(membros.filter(membro => membro.status === 'Ativo'))
    } else if (activeTab === 'inativos') {
      setFilteredMembros(membros.filter(membro => membro.status === 'Inativo'))
    } else {
      setFilteredMembros(membros)
    }
  }, [activeTab, membros])

  const membrosAtivos = membros.filter(m => m.status === 'Ativo').length
  const membrosInativos = membros.filter(m => m.status === 'Inativo').length

  return (
    <DashboardLayout>
      <PageHeader
        title="Membros"
        description="Gerencie todos os membros da equipe"
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Membros" }]}
        actions={
          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
            <Link href="/membros/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Membro
            </Link>
          </Button>
        }
      />

      {/* Cartões de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-800 bg-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total de Membros</p>
                <p className="text-2xl font-bold text-white mt-1">{membros.length}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Membros Ativos</p>
                <p className="text-2xl font-bold text-white mt-1">{membrosAtivos}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Membros Inativos</p>
                <p className="text-2xl font-bold text-white mt-1">{membrosInativos}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Departamentos</p>
                <p className="text-2xl font-bold text-white mt-1">{new Set(membros.map(m => m.departamento)).size}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800 bg-black">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-1 items-center gap-2 rounded-md border border-gray-800 bg-gray-950 px-2 py-1">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nome, cargo ou departamento..."
                className="h-8 border-0 bg-transparent text-sm placeholder:text-gray-500 focus-visible:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-950">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Tabs defaultValue="todos" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-950">
                {[
                  { v: "todos", l: "Todos" },
                  { v: "ativos", l: "Ativos" },
                  { v: "inativos", l: "Inativos" },
                ].map((t) => (
                  <TabsTrigger
                    key={t.v}
                    value={t.v}
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    {t.l}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Conteúdo para TODAS as abas - usa filteredMembros */}
              <TabsContent value="todos" className="mt-4">
                <TableContent membros={filteredMembros} />
              </TabsContent>

              <TabsContent value="ativos" className="mt-4">
                <TableContent membros={filteredMembros} />
              </TabsContent>

              <TabsContent value="inativos" className="mt-4">
                <TableContent membros={filteredMembros} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

// Componente separado para a tabela (evita repetição de código)
function TableContent({ membros }: { membros: Membro[] }) {
  return (
    <div className="rounded-lg border border-gray-800">
      <div className="max-h-[480px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-black">
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">Membro</TableHead>
              <TableHead className="text-gray-300">Cargo</TableHead>
              <TableHead className="text-gray-300">Departamento</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membros.map((membro, idx) => (
              <TableRow
                key={membro.id}
                className={`border-gray-800 hover:bg-gray-950 ${idx % 2 === 0 ? "bg-black" : "bg-gray-950/60"}`}
              >
                <TableCell className="font-mono text-white">#{membro.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="text-white font-medium">{membro.nome}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Mail className="h-3 w-3" />
                      {membro.email}
                    </div>
                    {membro.telefone && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        {membro.telefone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-white">{membro.cargo}</TableCell>
                <TableCell className="text-white">{membro.departamento}</TableCell>
                <TableCell>
                  <MemberStatusBadge status={membro.status} />
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-800 text-gray-300 hover:bg-gray-950"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação simples */}
      <div className="flex items-center justify-between border-t border-gray-800 bg-black px-3 py-2 text-sm text-gray-400">
        <span>Mostrando 1–{membros.length} de {membros.length} membros</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-800 text-gray-300 hover:bg-gray-950">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="border-gray-800 text-gray-300 hover:bg-gray-950">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}