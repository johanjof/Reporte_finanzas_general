"use client"

import { useState, useEffect } from "react"
import {
  Calculator,
  DollarSign,
  Home,
  Car,
  ShoppingCart,
  PiggyBank,
  TrendingUp,
  Wallet,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

interface GastoFijo {
  id: string
  nombre: string
  monto: number
  icono: string
}

interface GastoVariable {
  nombre: string
  monto: number
}

interface GastoVariableEditable {
  id: string
  nombre: string
  monto: number
}

interface FormData {
  titulo: string
  salario: string
  transporteGastado: string
  gastosPersonalesGastado: string // Cambié mecatoGastado por gastosPersonalesGastado
}

interface ReporteData {
  titulo: string
  gastosFijos: GastoFijo[]
  gastosVariables: GastoVariable[]
  totalGastosFijos: number
  totalGastosVariables: number
  totalGastos: number
  salario: number
  disponible: number // Cambié sobrante por disponible
  transporteGastado: number
  restanteTransporte: number
  gastosPersonalesGastado: number
  restanteGastosPersonales: number
}

export default function ControlFinanzas() {
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    salario: "1737000", // Agregué salario editable
    transporteGastado: "",
    gastosPersonalesGastado: "", // Cambié mecatoGastado por gastosPersonalesGastado
  })

  const [reporteData, setReporteData] = useState<ReporteData | null>(null)
  const [error, setError] = useState<string>("")

  const [gastosFijos, setGastosFijos] = useState<GastoFijo[]>([
    { id: "1", nombre: "Transporte", monto: 0, icono: "transporte" },
    { id: "2", nombre: "Arriendo", monto: 0, icono: "arriendo" },
    { id: "3", nombre: "Comida", monto: 0, icono: "comida" },
    { id: "5", nombre: "Ahorro", monto: 200000, icono: "ahorro" },
    { id: "8", nombre: "Gastos Personales", monto: 150000, icono: "gastos-personales" },
  ])

  const [gastosVariables, setGastosVariables] = useState<GastoVariableEditable[]>([
    { id: "2", nombre: "Deudas", monto: 70000 },
  ])

  useEffect(() => {
    const gastosFijosGuardados = localStorage.getItem("gastosFijos")
    if (gastosFijosGuardados) {
      try {
        const gastosParsed = JSON.parse(gastosFijosGuardados)
        setGastosFijos(gastosParsed)
      } catch (error) {
        console.error("Error al cargar gastos fijos:", error)
      }
    }
  }, [])

  useEffect(() => {
    const salarioGuardado = localStorage.getItem("salario")
    if (salarioGuardado) {
      setFormData((prev) => ({ ...prev, salario: salarioGuardado }))
    }
  }, [])

  useEffect(() => {
    const gastosGuardados = localStorage.getItem("gastosVariables")
    if (gastosGuardados) {
      try {
        const gastosParsed = JSON.parse(gastosGuardados)
        setGastosVariables(gastosParsed)
      } catch (error) {
        console.error("Error al cargar gastos variables:", error)
      }
    }
  }, [])

  const guardarGastosFijos = (nuevosGastos: GastoFijo[]) => {
    setGastosFijos(nuevosGastos)
    localStorage.setItem("gastosFijos", JSON.stringify(nuevosGastos))
  }

  const agregarGastoFijo = () => {
    const nuevoGasto: GastoFijo = {
      id: Date.now().toString(),
      nombre: "Nuevo Gasto",
      monto: 0,
      icono: "default",
    }
    const nuevosGastos = [...gastosFijos, nuevoGasto]
    guardarGastosFijos(nuevosGastos)
  }

  const editarGastoFijo = (id: string, campo: "nombre" | "monto", valor: string | number) => {
    const nuevosGastos = gastosFijos.map((gasto) => {
      if (gasto.id === id) {
        return { ...gasto, [campo]: valor }
      }
      return gasto
    })
    guardarGastosFijos(nuevosGastos)
  }

  const eliminarGastoFijo = (id: string) => {
    const nuevosGastos = gastosFijos.filter((gasto) => gasto.id !== id)
    guardarGastosFijos(nuevosGastos)
  }

  const guardarGastosVariables = (nuevosGastos: GastoVariableEditable[]) => {
    setGastosVariables(nuevosGastos)
    localStorage.setItem("gastosVariables", JSON.stringify(nuevosGastos))
  }

  const agregarGastoVariable = () => {
    const nuevoGasto: GastoVariableEditable = {
      id: Date.now().toString(),
      nombre: "Nuevo Gasto",
      monto: 0,
    }
    const nuevosGastos = [...gastosVariables, nuevoGasto]
    guardarGastosVariables(nuevosGastos)
  }

  const editarGastoVariable = (id: string, campo: "nombre" | "monto", valor: string | number) => {
    const nuevosGastos = gastosVariables.map((gasto) => {
      if (gasto.id === id) {
        return { ...gasto, [campo]: valor }
      }
      return gasto
    })
    guardarGastosVariables(nuevosGastos)
  }

  const eliminarGastoVariable = (id: string) => {
    const nuevosGastos = gastosVariables.filter((gasto) => gasto.id !== id)
    guardarGastosVariables(nuevosGastos)
  }

  const formatearNumero = (valor: string) => {
    const numeroLimpio = valor.replace(/[^\d]/g, "")
    if (!numeroLimpio) return ""
    return Number(numeroLimpio).toLocaleString("es-CO")
  }

  const obtenerValorNumerico = (valorFormateado: string) => {
    return valorFormateado.replace(/[^\d]/g, "")
  }

  const generarReporte = () => {
    try {
      setError("")

      const titulo = formData.titulo || "REPORTE DE GASTOS MENSUALES"

      const transporteGastadoNum = Number.parseFloat(obtenerValorNumerico(formData.transporteGastado)) || 0
      const gastosPersonalesGastadoNum = Number.parseFloat(obtenerValorNumerico(formData.gastosPersonalesGastado)) || 0
      const salarioNum = Number.parseFloat(obtenerValorNumerico(formData.salario)) || 0

      const gastosVariablesParaReporte: GastoVariable[] = gastosVariables.map((gasto) => ({
        nombre: gasto.nombre,
        monto: gasto.monto,
      }))

      const totalGastosFijos = gastosFijos.reduce((sum, gasto) => sum + gasto.monto, 0)
      const totalGastosVariables = gastosVariablesParaReporte.reduce((sum, gasto) => sum + gasto.monto, 0)
      const totalGastos = totalGastosFijos + totalGastosVariables
      const disponible = salarioNum - totalGastos

      const gastoTransporte = gastosFijos.find((g) => g.nombre.toLowerCase().includes("transporte"))
      const gastoGastosPersonales = gastosFijos.find(
        (g) => g.nombre.toLowerCase().includes("gastos personales") || g.nombre.toLowerCase().includes("personal"),
      )

      const restanteTransporte = (gastoTransporte?.monto || 0) - transporteGastadoNum
      const restanteGastosPersonales = (gastoGastosPersonales?.monto || 0) - gastosPersonalesGastadoNum

      const nuevoReporte: ReporteData = {
        titulo,
        gastosFijos,
        gastosVariables: gastosVariablesParaReporte,
        totalGastosFijos,
        totalGastosVariables,
        totalGastos,
        salario: salarioNum,
        disponible,
        transporteGastado: transporteGastadoNum,
        restanteTransporte,
        gastosPersonalesGastado: gastosPersonalesGastadoNum,
        restanteGastosPersonales,
      }

      setReporteData(nuevoReporte)
      console.log("Reporte generado exitosamente")
    } catch (error) {
      console.error("Error en generarReporte:", error)
      setError("Error: Por favor, verifique que todos los campos contengan números válidos.")
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "transporteGastado" || field === "gastosPersonalesGastado" || field === "salario") {
      const valorNumerico = obtenerValorNumerico(value)
      setFormData((prev) => ({
        ...prev,
        [field]: valorNumerico,
      }))

      if (field === "salario") {
        localStorage.setItem("salario", valorNumerico)
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const getIcono = (tipo: string) => {
    switch (tipo) {
      case "transporte":
        return <Car className="w-5 h-5 text-blue-600" />
      case "arriendo":
        return <Home className="w-5 h-5 text-green-600" />
      case "comida":
        return <ShoppingCart className="w-5 h-5 text-orange-600" />
      case "ahorro":
        return <PiggyBank className="w-5 h-5 text-emerald-600" />
      case "gastos-personales":
        return <Wallet className="w-5 h-5 text-yellow-600" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              FinanzApp
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-600 font-medium mb-2">Control Inteligente de Finanzas Personales</p>
          <p className="text-gray-500">Gestiona tus gastos mensuales con estilo y precisión</p>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Análisis en Tiempo Real</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <CardTitle className="flex items-center gap-3 text-xl font-bold relative z-10">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Wallet className="w-6 h-6" />
                </div>
                Datos Financieros
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="titulo" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Título del Reporte
                </Label>
                <Input
                  id="titulo"
                  placeholder="REPORTE DE GASTOS MENSUALES"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 rounded-xl h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="salario" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Salario Mensual ($)
                </Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="1,737,000"
                  value={formatearNumero(formData.salario)}
                  onChange={(e) => handleInputChange("salario", e.target.value)}
                  className="border-2 border-gray-200 focus:border-green-500 transition-colors duration-200 rounded-xl h-12"
                />
              </div>

              <div className="grid gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="transporteGastado"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-red-600" />
                    Gastado en Transporte ($)
                  </Label>
                  <Input
                    id="transporteGastado"
                    type="text"
                    placeholder="0"
                    value={formatearNumero(formData.transporteGastado)}
                    onChange={(e) => handleInputChange("transporteGastado", e.target.value)}
                    className="border-2 border-gray-200 focus:border-red-500 transition-colors duration-200 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="gastosPersonalesGastado"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4 text-yellow-600" />
                    Gastado en Gastos Personales ($)
                  </Label>
                  <Input
                    id="gastosPersonalesGastado"
                    type="text"
                    placeholder="0"
                    value={formatearNumero(formData.gastosPersonalesGastado)}
                    onChange={(e) => handleInputChange("gastosPersonalesGastado", e.target.value)}
                    className="border-2 border-gray-200 focus:border-yellow-500 transition-colors duration-200 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200/50">
                <div className="flex items-center justify-between mb-6">
                  <Label className="text-lg font-bold text-blue-800 flex items-center gap-2">
                    <Home className="w-6 h-6" />
                    Gastos Fijos
                  </Label>
                  <Button
                    onClick={agregarGastoFijo}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-4">
                  {gastosFijos.map((gasto) => (
                    <div key={gasto.id} className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-blue-700">Nombre del Gasto</Label>
                          <Input
                            type="text"
                            value={gasto.nombre}
                            onChange={(e) => editarGastoFijo(gasto.id, "nombre", e.target.value)}
                            className="border-2 border-blue-200 focus:border-blue-500 rounded-lg"
                            placeholder="Nombre del gasto"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-blue-700">Monto ($)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={formatearNumero(gasto.monto.toString())}
                              onChange={(e) => {
                                const valorNumerico = obtenerValorNumerico(e.target.value)
                                editarGastoFijo(gasto.id, "monto", Number(valorNumerico) || 0)
                              }}
                              className="border-2 border-blue-200 focus:border-blue-500 rounded-lg flex-1"
                              placeholder="0"
                            />
                            <Button
                              onClick={() => eliminarGastoFijo(gasto.id)}
                              size="sm"
                              variant="destructive"
                              className="px-3"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {gastosFijos.length === 0 && (
                    <div className="text-center py-8 text-blue-600">
                      <Home className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">No hay gastos fijos configurados</p>
                      <p className="text-sm opacity-75">Haz clic en "Agregar" para crear uno nuevo</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200/50">
                <div className="flex items-center justify-between mb-6">
                  <Label className="text-lg font-bold text-purple-800 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    Gastos Variables
                  </Label>
                  <Button
                    onClick={agregarGastoVariable}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-4">
                  {gastosVariables.map((gasto) => (
                    <div key={gasto.id} className="bg-white p-4 rounded-xl border-2 border-purple-200 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-purple-700">Nombre del Gasto</Label>
                          <Input
                            type="text"
                            value={gasto.nombre}
                            onChange={(e) => editarGastoVariable(gasto.id, "nombre", e.target.value)}
                            className="border-2 border-purple-200 focus:border-purple-500 rounded-lg"
                            placeholder="Nombre del gasto"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-purple-700">Monto ($)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={formatearNumero(gasto.monto.toString())}
                              onChange={(e) => {
                                const valorNumerico = obtenerValorNumerico(e.target.value)
                                editarGastoVariable(gasto.id, "monto", Number(valorNumerico) || 0)
                              }}
                              className="border-2 border-purple-200 focus:border-purple-500 rounded-lg flex-1"
                              placeholder="0"
                            />
                            <Button
                              onClick={() => eliminarGastoVariable(gasto.id)}
                              size="sm"
                              variant="destructive"
                              className="px-3"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {gastosVariables.length === 0 && (
                    <div className="text-center py-8 text-purple-600">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">No hay gastos variables configurados</p>
                      <p className="text-sm opacity-75">Haz clic en "Agregar" para crear uno nuevo</p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <Button
                onClick={generarReporte}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                size="lg"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Generar Reporte Financiero
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-700 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <CardTitle className="flex items-center gap-3 text-xl font-bold relative z-10">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                Análisis Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {reporteData ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      {reporteData.titulo}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                      GASTOS FIJOS
                    </h3>
                    <div className="space-y-3">
                      {reporteData.gastosFijos.map((gasto: GastoFijo, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">{getIcono(gasto.icono)}</div>
                            <span className="font-semibold text-gray-800">{gasto.nombre}</span>
                          </div>
                          <span className="font-bold text-gray-700 text-lg">
                            ${gasto.monto.toLocaleString("es-CO")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl border-2 border-blue-300">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-800 text-lg">TOTAL GASTOS FIJOS:</span>
                        <span className="font-black text-blue-900 text-xl">
                          ${reporteData.totalGastosFijos.toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <ShoppingCart className="w-6 h-6 text-orange-600" />
                      </div>
                      GASTOS VARIABLES
                    </h3>
                    <div className="space-y-3">
                      {reporteData.gastosVariables.map((gasto: GastoVariable, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <CreditCard className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="font-semibold text-gray-800">{gasto.nombre}</span>
                          </div>
                          <span className="font-bold text-gray-700 text-lg">
                            ${gasto.monto.toLocaleString("es-CO")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl border-2 border-orange-300">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-orange-800 text-lg">TOTAL GASTOS VARIABLES:</span>
                        <span className="font-black text-orange-900 text-xl">
                          ${reporteData.totalGastosVariables.toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calculator className="w-6 h-6 text-purple-600" />
                      </div>
                      RESUMEN DE CONTROL
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200 shadow-sm">
                          <p className="text-sm font-semibold text-yellow-700 mb-1">Transporte gastado:</p>
                          <p className="font-bold text-yellow-800 text-lg">
                            ${reporteData.transporteGastado.toLocaleString("es-CO")}
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 shadow-sm">
                          <p className="text-sm font-semibold text-green-700 mb-1">Restante para transporte:</p>
                          <p className="font-bold text-green-800 text-lg">
                            ${reporteData.restanteTransporte.toLocaleString("es-CO")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm">
                          <p className="text-sm font-semibold text-purple-700 mb-1">Gastos personales gastados:</p>
                          <p className="font-bold text-purple-800 text-lg">
                            ${reporteData.gastosPersonalesGastado.toLocaleString("es-CO")}
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 shadow-sm">
                          <p className="text-sm font-semibold text-green-700 mb-1">Restante para gastos personales:</p>
                          <p className="font-bold text-green-800 text-lg">
                            ${reporteData.restanteGastosPersonales.toLocaleString("es-CO")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                    <h3 className="text-2xl font-black mb-6 text-center relative z-10">💰 RESUMEN FINANCIERO</h3>
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <span className="font-semibold text-lg">SALARIO:</span>
                        <span className="font-black text-2xl text-green-300">
                          ${reporteData.salario.toLocaleString("es-CO")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <span className="font-semibold text-lg">TOTAL GASTOS:</span>
                        <span className="font-black text-2xl text-red-300">
                          ${reporteData.totalGastos.toLocaleString("es-CO")}
                        </span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between items-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="font-black text-xl">💎 DISPONIBLE:</span>
                        <span
                          className={`font-black text-3xl ${reporteData.disponible >= 0 ? "text-emerald-300" : "text-red-300"}`}
                        >
                          ${reporteData.disponible.toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <Calculator className="w-24 h-24 text-gray-300 mx-auto" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">¡Listo para Analizar!</h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
                    Completa el formulario y haz clic en "Generar Reporte" para obtener tu análisis financiero detallado
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
