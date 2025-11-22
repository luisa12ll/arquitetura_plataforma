"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/app/context/AppContext"
import { ArrowLeft, X } from "lucide-react"

type ItemVenda = {
  descricao: string
  quantidade: number
  valorUnitario: number
}

export default function NovaVendaPage() {
  const router = useRouter()
  const { addNotification, setIsLoading } = useAppContext()

  const [cliente, setCliente] = useState("")
  const [itens, setItens] = useState<ItemVenda[]>([])

  const total = useMemo(
    () =>
      itens.reduce(
        (acc, item) => acc + item.quantidade * item.valorUnitario,
        0
      ),
    [itens]
  )

  function adicionarItem() {
    setItens([...itens, { descricao: "", quantidade: 1, valorUnitario: 0 }])
  }

  function atualizarItem(index: number, field: keyof ItemVenda, value: string | number) {
    const novos = [...itens]
    // garantir conversão correta para number
    novos[index][field] = field === "descricao" ? value as string : Number(value)
    setItens(novos)
  }

  function removerItem(index: number) {
    setItens(itens.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // simula envio
      await new Promise((r) => setTimeout(r, 500))

      console.log("Payload enviado:", {
        cliente,
        itens,
        total
      })

      addNotification({ message: "Venda cadastrada com sucesso!", type: "success" })
      router.push("/vendas")

    } finally {
      setIsLoading(false)
    }
  }

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return (
    <DashboardLayout>
      <PageHeader
        title="Nova Venda"
        description="Cadastre uma nova venda no sistema"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Vendas", href: "/vendas" },
          { label: "Nova Venda" }
        ]}
        actions={
          <Button variant="outline" asChild className="border-gray-800 text-gray-300 hover:bg-gray-950">
            <Link href="/vendas">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        }
      />

      <Card className="border-gray-800 bg-black">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

            {/* Cliente */}
            <Input
              placeholder="Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              className="bg-gray-950 border-gray-800 text-white"
            />

            {/* Itens da venda */}
            <div className="space-y-3">
              <h3 className="text-white font-medium">Itens da Venda</h3>

              {itens.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Descrição"
                    value={item.descricao}
                    onChange={(e) => atualizarItem(index, "descricao", e.target.value)}
                    className="bg-gray-950 border-gray-800 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Qtd"
                    min="1"
                    value={item.quantidade}
                    onChange={(e) => atualizarItem(index, "quantidade", e.target.value)}
                    className="w-20 bg-gray-950 border-gray-800 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Valor"
                    min="0"
                    step="0.01"
                    value={item.valorUnitario}
                    onChange={(e) => atualizarItem(index, "valorUnitario", e.target.value)}
                    className="w-32 bg-gray-950 border-gray-800 text-white"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-400 hover:bg-red-500/10"
                    onClick={() => removerItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={adicionarItem}
                className="border-gray-800 text-gray-300 hover:bg-gray-950"
              >
                + Adicionar Item
              </Button>
            </div>

            {/* Resumo */}
            <div className="pt-4 text-right text-white">
              <p>Total: <span className="font-bold text-orange-400">{totalFormatado}</span></p>
            </div>

            {/* Submit */}
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Salvar Venda
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

