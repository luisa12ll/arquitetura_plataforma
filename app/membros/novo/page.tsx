// app/membros/novo/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from "next/link"
import { Toaster, toast } from 'sonner'

export default function NovoMembro() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    telefone: '',
    status: 'Ativo'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário submetido')
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.cargo || !formData.departamento) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    
    // Simular processamento
    setTimeout(() => {
      // Mostrar notificação de sucesso
      toast.success('Membro adicionado com sucesso!', {
        description: `${formData.nome} foi adicionado à equipe.`,
        duration: 4000,
      })
      
      setLoading(false)
      
      // Redirecionar de volta para a lista de membros após um breve delay
      setTimeout(() => {
        router.push('/membros')
      }, 1500)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCancel = () => {
    router.push('/membros')
  }

  return (
    <DashboardLayout>
      {/* Toaster adicionado diretamente nesta página */}
      <Toaster 
        position="top-right"
        expand={false}
        richColors
        theme="dark"
        closeButton
      />
      
      <PageHeader
        title="Adicionar Novo Membro"
        description="Preencha os dados para adicionar um novo membro à equipe"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Membros", href: "/membros" },
          { label: "Novo Membro" }
        ]}
        actions={
          <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-950" asChild>
            <Link href="/membros">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        }
      />

      <Card className="border-gray-800 bg-black">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="Digite o email"
                  required
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-300 mb-2">
                  Cargo *
                </label>
                <select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-gray-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Selecione um cargo</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="UX/UI Designer">UX/UI Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Product Analyst">Product Analyst</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-300 mb-2">
                  Departamento *
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-gray-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Selecione o departamento</option>
                  <option value="Desenvolvimento">Desenvolvimento</option>
                  <option value="Design">Design</option>
                  <option value="Gestão">Gestão</option>
                  <option value="Produto">Produto</option>
                  <option value="QA">QA</option>
                  <option value="Infraestrutura">Infraestrutura</option>
                </select>
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <Input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-gray-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-800">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Salvando...' : 'Salvar Membro'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}