"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/context/AppContext"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const { setUserInfo, addNotification, setIsLoading } = useAppContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Teste
//      const res = await fetch("http://localhost:3001/auth/login", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ email, password }),
//      })

//      if (!res.ok) throw new Error("Credenciais inválidas")

//      const data = await res.json()

      // Guarda usuário
//      setUserInfo(data.user)

      // login fake temporário
        setUserInfo({
        id: 1,
        name: "João Silva",
        email: email || "joao@example.com",
        role: "admin"
        })

      addNotification({ message: "Login realizado com sucesso!", type: "success" })

      router.push("/")

    } catch (error: any) {
      addNotification({ message: error.message, type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 px-4">
      <Card className="w-full max-w-md p-6 bg-black border border-gray-800">
        <h1 className="text-xl font-semibold mb-4">Entrar</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            placeholder="Email (ex:qualquercoisa@gmail.com)"
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
            Entrar
          </Button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Não tem conta?{" "}
          <a href="/cadastro" className="text-orange-500 hover:underline">
            Criar conta
          </a>
        </p>
      </Card>
    </div>
  )
}

