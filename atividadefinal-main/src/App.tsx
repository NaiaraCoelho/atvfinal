import './App.css'
import { Button, Form, Input, InputNumber, Table, Tabs, TabsProps } from 'antd'
import { createTodo, deleteTodoById, getAllTodos, updateTodo } from './services/todoservice';
import { useState } from 'react';

function App() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Buscar',
      children: Buscar(),
    },
    {
      key: '2',
      label: 'Inserir',
      children: Inserir(),
    },
    {
      key: '3',
      label: 'Atualizar',
      children: Atualizar(),
    }
  ];

  function Buscar() {
    const [data, setData] = useState<any>(null);
    const handleBuscar = async () => {
      const AllTodos = await getAllTodos();
      setData(AllTodos);
    }
    const handleDelete = async (id: string) => {
      await deleteTodoById(Number(id));
      handleBuscar()
    }

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
      },
      {
        title: 'Preço',
        dataIndex: 'preco',
        key: 'preco',
      },
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
      },
      {
        title: 'Excluir',
        key: 'excluir',
        render: (text: string, record: any) => (
          <Button onClick={() => handleDelete(record.id)}>Deletar</Button>
        ),
      },
    ];
    return (<>
      <h1>Buscar</h1>
      <Button type="primary" onClick={() => handleBuscar()}>Buscar</Button>
      <Table columns={columns} dataSource={data} />
    </>)
  }

  function Inserir() {

    const onFinish = async (values: any) => {
      await createTodo(values)
    }

    return (<>
      <h1>Inserir</h1>
      <Form onFinish={onFinish}>
        <Form.Item label="Nome" name='nome' required>
          <Input />
        </Form.Item>
        <Form.Item label="Preço" name='preco' required>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Descrição" name='descricao' required>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Inserir</Button>
        </Form.Item>
      </Form>
    </>)
  }

  function Atualizar() {
    const onFinish = async (values: any) => {
      await updateTodo(values, values.id)
    };

    return (
      <Form name="produto" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="id"
          rules={[{ required: true, message: 'Por favor, insira o ID do produto!' }]}
        >
          <Input placeholder="ID do Produto" />
        </Form.Item>

        <Form.Item
          name="nome"
          rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
        >
          <Input placeholder="Nome do Produto" />
        </Form.Item>

        <Form.Item
          name="preco"
          rules={[{ required: true, message: 'Por favor, insira o preço do produto!' }]}
        >
          <InputNumber placeholder="Preço do Produto" />
        </Form.Item>

        <Form.Item
          name="descricao"
          rules={[{ required: true, message: 'Por favor, insira a descrição do produto!' }]}
        >
          <Input placeholder="Descrição do Produto" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Atualizar Produto
          </Button>
        </Form.Item>
      </Form>
    );
  }

  return (<>
    <h1>Crud de Produtos</h1>
    <Tabs items={items} />
    </>
  )
}

export default App
