import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://soffwfmiwnfqaeizmacl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZmZ3Zm1pd25mcWFlaXptYWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0ODIwMTIsImV4cCI6MjA0NDA1ODAxMn0.4b6NN4d8dAXBnx7M5boPIcN_EC4ZNUX9-njJ0ezY-1U'
const supabase = createClient(supabaseUrl, supabaseKey)

const listarProdutos = async () => {
  const { data, error } = await supabase.from('produto').select('*')
  if (error) {
    console.error('Erro ao listar produtos:', error)
    return null
  }
  return data
}
const listarEstoques = async () => {
  const { data, error } = await supabase.from('estoque').select('*')
  if (error) {
    console.error('Erro ao listar estoque:', error)
    return null
  }
  return data
}
const listarClientes = async () => {
  const { data, error } = await supabase.from('cliente').select('*')
  if (error) {
    console.error('Erro ao listar cliente:', error)
    return null
  }
  return data
}
const listarRegioes = async () => {
  const { data, error } = await supabase.from('regiao').select('*')
  if (error) {
    console.error('Erro ao listar região:', error)
    return null
  }
  return data
}
const listarEntradas = async () => {
  const { data, error } = await supabase.from('shell_in').select('*')
  if (error) {
    console.error('Erro ao listar entrada:', error)
    return null
  }
  return data
}
const listarSaida = async () => {
  const { data, error } = await supabase.from('shell_out').select('*')
  if (error) {
    console.error('Erro ao listar saída:', error)
    return null
  }
  return data
}
const registrarEntrada = async (produto_id, quantidade, origem) => {
  const { data: entradaData, error: entradaError } = await supabase.from('shell_in').insert([{ produto_id, quantidade, origem }])
  if (entradaError) {
    console.error('Erro ao registrar entrada:', entradaError)
    return { success: false, message: 'Erro ao registrar entrada', error: entradaError }
  }

  const { data: estoqueData, error: estoqueError } = await supabase.from('estoque').select('quantidade').eq('produto_id', produto_id).single()
  if (estoqueError) {
    console.error('Erro ao buscar estoque:', estoqueError)
    return { success: false, message: 'Erro ao buscar estoque', error: estoqueError }
  }

  const novaQuantidade = estoqueData.quantidade + quantidade
  const { error: updateError } = await supabase.from('estoque').update({ quantidade: novaQuantidade }).eq('produto_id', produto_id)
  if (updateError) {
    console.error('Erro ao atualizar estoque:', updateError)
    return { success: false, message: 'Erro ao atualizar estoque', error: updateError }
  }

  return { success: true, message: 'Entrada registrada e estoque atualizado com sucesso', data: entradaData }
}
const registrarSaida = async (produto_id, cliente_id, regiao_id, quantidade) => {
  const { data: estoqueData, error: estoqueError } = await supabase.from('estoque').select('quantidade').eq('produto_id', produto_id).single()
  if (estoqueError) {
    console.error('Erro ao buscar estoque:', estoqueError)
    return { success: false, message: 'Erro ao buscar estoque', error: estoqueError }
  }

  if (estoqueData.quantidade < quantidade) {
    return { success: false, message: 'Estoque insuficiente para registrar a saída' }
  }

  const { data: saidaData, error: saidaError } = await supabase.from('shell_out').insert([{ produto_id, cliente_id, regiao_id, quantidade }])
  if (saidaError) {
    console.error('Erro ao registrar saída:', saidaError)
    return { success: false, message: 'Erro ao registrar saída', error: saidaError }
  }

  const novaQuantidade = estoqueData.quantidade - quantidade

  const { error: updateError } = await supabase.from('estoque').update({ quantidade: novaQuantidade }).eq('produto_id', produto_id)
  if (updateError) {
    console.error('Erro ao atualizar estoque:', updateError)
    return { success: false, message: 'Erro ao atualizar estoque', error: updateError }
  }
  
  return { success: true, message: 'Saída registrada e estoque atualizado com sucesso', data: saidaData }
}


export {
  supabase,
  listarClientes,
  listarProdutos,
  listarEstoques,
  listarRegioes,
  listarEntradas,
  listarSaida,
  registrarEntrada,
  registrarSaida
}
