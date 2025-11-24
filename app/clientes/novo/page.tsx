// app/clientes/novo/page.tsx
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

export default function NovoCliente() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    status: 'Ativo'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular processamento
    setTimeout(() => {
      console.log('Dados do cliente:', formData)
      setLoading(false)
      // Redirecionar de volta para a lista de clientes
      router.push('/clientes')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Adicionar Novo Cliente"
        description="Preencha os dados para adicionar um novo cliente"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Clientes", href: "/clientes" },
          { label: "Novo Cliente" }
        ]}
        actions={
          <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-950" asChild>
            <Link href="/clientes">
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
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone *
                </label>
                <Input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div>
                <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <Input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-300 mb-2">
                  CNPJ/CPF
                </label>
                <Input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="00.000.000/0000-00"
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
                  <option value="Potencial">Potencial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="endereco" className="block text-sm font-medium text-gray-300 mb-2">
                  Endereço
                </label>
                <Input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-300 mb-2">
                  Cidade
                </label>
                <Input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-orange-500"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-gray-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
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
                {loading ? 'Salvando...' : 'Salvar Cliente'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => router.push('/clientes')}
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