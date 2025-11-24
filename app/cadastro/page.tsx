"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/context/AppContext"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CadastroPage() {
  const router = useRouter()
  const { addNotification, setIsLoading } = useAppContext()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      //const res = await fetch("http://localhost:3001/auth/register", {
        //method: "POST",
        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ name, email, password }),
      //})

       //if (!res.ok) throw new Error("Erro ao criar conta.")

      //Teste da tela de cadastro
      setUserInfo({
      id: Date.now(),
      name,
      email,
      role: "user"
      })

      router.push("/")

      addNotification({ message: "Conta criada com sucesso!", type: "success" })

      router.push("/login")
    } catch (err: any) {
      addNotification({ message: err.message, type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 px-4">
      <Card className="w-full max-w-md p-6 bg-black border border-gray-800">
        <h1 className="text-xl font-semibold mb-4">Criar Conta</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input 
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <Input 
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Já tem conta?{" "}
          <a href="/login" className="text-orange-500 hover:underline">
            Fazer login
          </a>
        </p>
      </Card>
    </div>
  )
}

